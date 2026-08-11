import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomButton from "../presentation/components/custombutton";
import { useSolicitudes } from "../presentation/hooks/useSolicitudes";

interface ErroresRegistro {
  nombre?: string;
  telefono?: string;
  direccion?: string;
  tipo?: string;
  descripcion?: string;
  cantidad?: string;
  precio?: string;
}

const tiposServicio = [
  "Instalación Plan Básico",
  "Instalación Plan Familiar",
  "Instalación Plan Premium",
  "Cambio de Domicilio",
  "Sin Señal",
  "Reparación",
];

const prioridades = ["BAJA", "MEDIA", "ALTA"];

const tecnicos = [
  "Carlos Gómez",
  "Luis Ramos",
  "José Ruiz",
  "Miguel Torres",
  "Ana Flores",
];

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [tipo, setTipo] = useState("");
  const [prioridad, setPrioridad] = useState("MEDIA");
  const [tecnicoAsignado, setTecnicoAsignado] = useState(tecnicos[0]);
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState("1");
  const [precio, setPrecio] = useState("");
  
  const { solicitudes, agregarSolicitud } = useSolicitudes();
  const [errores, setErrores] = useState<ErroresRegistro>({});
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  useEffect(() => {
    if (formularioEnviado) validarFormulario();
  }, [nombre, telefono, direccion, tipo, descripcion, cantidad, precio]);

  const validarFormulario = () => {
    const nuevosErrores: ErroresRegistro = {};
    
    // Nombre
    if (!nombre.trim()) {
      nuevosErrores.nombre = "Ingrese el nombre del cliente.";
    } else if (nombre.trim().length < 3) {
      nuevosErrores.nombre = "El nombre debe tener mínimo 3 caracteres.";
    }
    
    // Teléfono
    if (!telefono.trim()) {
      nuevosErrores.telefono = "Ingrese el teléfono.";
    } else if (!/^9\d{8}$/.test(telefono)) {
      nuevosErrores.telefono = "Debe ingresar un celular válido de 9 dígitos.";
    } else if (solicitudes.some((s) => s.telefono === telefono)) {
      nuevosErrores.telefono = "Ya existe una solicitud con ese teléfono.";
    }

    // Dirección
    if (!direccion.trim()) {
      nuevosErrores.direccion = "Ingrese la dirección del cliente.";
    }
    
    // Tipo de servicio
    if (!tipo) {
      nuevosErrores.tipo = "Seleccione un tipo de servicio.";
    }
    
    // Cantidad
    if (!cantidad.trim() || isNaN(Number(cantidad)) || Number(cantidad) <= 0) {
      nuevosErrores.cantidad = "Ingrese una cantidad válida mayor a 0.";
    }

    // Precio
    if (!precio.trim() || isNaN(Number(precio)) || Number(precio) < 0) {
      nuevosErrores.precio = "Ingrese un precio válido.";
    }

    // Descripción
    if (!descripcion.trim()) {
      nuevosErrores.descripcion = "Ingrese una descripción.";
    } else if (descripcion.trim().length < 10) {
      nuevosErrores.descripcion = "La descripción debe tener al menos 10 caracteres.";
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardar = async () => {
    setFormularioEnviado(true);
    if (!validarFormulario()) return;
    
    const nuevaSolicitud = {
      cliente: nombre.trim(),
      telefono,
      direccion: direccion.trim(),
      tipoServicio: tipo,
      prioridad,
      descripcion: descripcion.trim(),
      estado: "PENDIENTE",
      tecnicoAsignado,
      fechaRegistro: new Date().toLocaleDateString(),
      cantidad: parseInt(cantidad),
      precio: parseFloat(precio),
    };
    
    agregarSolicitud(nuevaSolicitud as any);
    
    Alert.alert(
      "Solicitud registrada",
      "La solicitud fue registrada correctamente.",
      [
        {
          text: "Aceptar",
          onPress: () => router.replace("/home"),
        },
      ]
    );
    
    setNombre("");
    setTelefono("");
    setDireccion("");
    setTipo("");
    setPrioridad("MEDIA");
    setTecnicoAsignado(tecnicos[0]);
    setDescripcion("");
    setCantidad("1");
    setPrecio("");
    setErrores({});
    setFormularioEnviado(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"} 
      style={{ flex: 1 }}
      className="bg-gray-50"
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 20}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => router.replace("/home")}
          className="mb-5 mt-5 ml-5"
        >
          <Text className="text-blue-700 font-bold text-lg">🏠 Inicio</Text>
        </TouchableOpacity>
        
        <View className="bg-blue-900 pt-6 pb-6 px-5 rounded-b-3xl shadow-md">
          <Text className="text-white text-2xl font-bold text-center">
            Nueva Solicitud
          </Text>
          <Text className="text-blue-200 text-sm text-center mt-1">
            Ingrese los datos del cliente y producto
          </Text>
        </View>
        
        <View className="flex-1 p-6">
          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2">Nombre del Cliente</Text>
            <TextInput
              placeholder="Ej. Juan Pérez"
              value={nombre}
              onChangeText={(texto) => setNombre(texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, ""))}
              autoCapitalize="words"
              maxLength={50}
              className={`bg-white border rounded-xl p-3.5 ${errores.nombre ? "border-red-500" : "border-gray-200"}`}
            />
            {errores.nombre && <Text className="text-red-500 text-sm mt-1">⚠️ {errores.nombre}</Text>}
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2">Teléfono</Text>
            <TextInput
              placeholder="Ej. 987654321"
              value={telefono}
              onChangeText={(texto) => setTelefono(texto.replace(/[^0-9]/g, ""))}
              keyboardType="number-pad"
              maxLength={9}
              className={`bg-white border rounded-xl p-3.5 ${errores.telefono ? "border-red-500" : "border-gray-200"}`}
            />
            {errores.telefono && <Text className="text-red-500 text-sm mt-1">⚠️ {errores.telefono}</Text>}
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2">Dirección</Text>
            <TextInput
              placeholder="Ej. Av. Los Próceres 123"
              value={direccion}
              onChangeText={setDireccion}
              autoCapitalize="words"
              className={`bg-white border rounded-xl p-3.5 ${errores.direccion ? "border-red-500" : "border-gray-200"}`}
            />
            {errores.direccion && <Text className="text-red-500 text-sm mt-1">⚠️ {errores.direccion}</Text>}
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2">Producto / Tipo de Servicio</Text>
            <View className={`bg-white border rounded-xl ${errores.tipo ? "border-red-500" : "border-gray-200"}`}>
              <Picker selectedValue={tipo} onValueChange={setTipo}>
                <Picker.Item label="Seleccione un servicio..." value="" />
                {tiposServicio.map((servicio) => (
                  <Picker.Item key={servicio} label={servicio} value={servicio} />
                ))}
              </Picker>
            </View>
            {errores.tipo && <Text className="text-red-500 text-sm mt-1">⚠️ {errores.tipo}</Text>}
          </View>

          <View className="flex-row justify-between mb-4">
            <View className="w-[48%]">
              <Text className="text-gray-700 font-semibold mb-2">Cantidad</Text>
              <TextInput
                placeholder="1"
                value={cantidad}
                onChangeText={setCantidad}
                keyboardType="numeric"
                className={`bg-white border rounded-xl p-3.5 ${errores.cantidad ? "border-red-500" : "border-gray-200"}`}
              />
              {errores.cantidad && <Text className="text-red-500 text-sm mt-1">⚠️ {errores.cantidad}</Text>}
            </View>
            <View className="w-[48%]">
              <Text className="text-gray-700 font-semibold mb-2">Precio (S/)</Text>
              <TextInput
                placeholder="0.00"
                value={precio}
                onChangeText={setPrecio}
                keyboardType="numeric"
                className={`bg-white border rounded-xl p-3.5 ${errores.precio ? "border-red-500" : "border-gray-200"}`}
              />
              {errores.precio && <Text className="text-red-500 text-sm mt-1">⚠️ {errores.precio}</Text>}
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2">Prioridad</Text>
            <View className="bg-white border border-gray-200 rounded-xl">
              <Picker selectedValue={prioridad} onValueChange={setPrioridad}>
                {prioridades.map((item) => (
                  <Picker.Item key={item} label={item} value={item} />
                ))}
              </Picker>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 font-semibold mb-2">Técnico Asignado</Text>
            <View className="bg-white border border-gray-200 rounded-xl">
              <Picker selectedValue={tecnicoAsignado} onValueChange={setTecnicoAsignado}>
                {tecnicos.map((tecnico) => (
                  <Picker.Item key={tecnico} label={tecnico} value={tecnico} />
                ))}
              </Picker>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-gray-700 font-semibold mb-2">Descripción</Text>
            <TextInput
              placeholder="Explique el problema del cliente..."
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={4}
              maxLength={250}
              textAlignVertical="top"
              className={`bg-white border rounded-xl p-3.5 h-28 ${errores.descripcion ? "border-red-500" : "border-gray-200"}`}
            />
            {errores.descripcion && <Text className="text-red-500 text-sm mt-1">⚠️ {errores.descripcion}</Text>}
            <Text className="text-gray-400 text-right mt-1">{descripcion.length}/250</Text>
          </View>

          <CustomButton titulo="Guardar Solicitud" onPress={guardar} />
         
          <View className="h-20" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}