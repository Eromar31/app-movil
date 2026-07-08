import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    } from "react-native";

    import CustomButton from "../components/custombutton";
    import { router } from "expo-router";
    import { Picker } from "@react-native-picker/picker";
    import { useSolicitudes } from "../hooks/useSolicitudes";
    
        interface ErroresRegistro {
        nombre?: string;
        telefono?: string;
        tipo?: string;
        descripcion?: string;
    }
  
    const tiposServicio = [
        "Instalación Plan Básico",
        "Instalación Plan Familiar",
        "Instalación Plan Premium",
        "Cambio de Domicilio",
        "Sin Señal",
        "Reparación",
    ];

    const prioridades = [
        "BAJA",
        "MEDIA",
        "ALTA",
    ];

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
    const [tipo, setTipo] = useState("");
    const [prioridad, setPrioridad] = useState("MEDIA");
    const [tecnicoAsignado, setTecnicoAsignado] =
    useState(tecnicos[0]);
    const [descripcion, setDescripcion] = useState("");
    const { solicitudes, agregarSolicitud } = useSolicitudes();
    const [errores, setErrores] = useState<ErroresRegistro>({});
    const [formularioEnviado, setFormularioEnviado] = useState(false);
    
    
    useEffect(() => {
    if (formularioEnviado) validarFormulario();
    }, [nombre, telefono, tipo, descripcion]);
    const validarFormulario = () => {
    const nuevosErrores: ErroresRegistro = {};
      // Nombre
      if (!nombre.trim()) {
          nuevosErrores.nombre = "Ingrese el nombre del cliente.";
      } else if (nombre.trim().length < 3) {
          nuevosErrores.nombre =
              "El nombre debe tener mínimo 3 caracteres.";
      }
      // Teléfono
      if (!telefono.trim()) {
          nuevosErrores.telefono = "Ingrese el teléfono.";
      } else if (!/^9\d{8}$/.test(telefono)) {
          nuevosErrores.telefono =
              "Debe ingresar un celular válido de 9 dígitos.";
      } else if (
          solicitudes.some(
              (s) => s.telefono === telefono
          )
      ) {
          nuevosErrores.telefono =
              "Ya existe una solicitud con ese teléfono.";
      }
      // Tipo de servicio
      if (!tipo) {
          nuevosErrores.tipo =
              "Seleccione un tipo de servicio.";
      }
      // Descripción
      if (!descripcion.trim()) {
          nuevosErrores.descripcion =
              "Ingrese una descripción.";
      } else if (descripcion.trim().length < 10) {
          nuevosErrores.descripcion =
              "La descripción debe tener al menos 10 caracteres.";
      }
      setErrores(nuevosErrores);
      return Object.keys(nuevosErrores).length === 0;
    };

    const guardar = () => {
    setFormularioEnviado(true);
    if (!validarFormulario()) return;
    const nuevaSolicitud = {
        id: Date.now(),
        cliente: nombre.trim(),
        telefono,
        direccion: "Sin dirección",
        tipoServicio: tipo,
        prioridad,
        descripcion: descripcion.trim(),
        estado: "PENDIENTE",
        tecnicoAsignado,
        fechaRegistro: new Date().toLocaleDateString(),
    };
    agregarSolicitud(nuevaSolicitud);
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
    setTipo("");
    setPrioridad("MEDIA");
    setTecnicoAsignado(tecnicos[0]);
    setDescripcion("");
    setErrores({});
    setFormularioEnviado(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >

        {/* Encabezado */}
        <View className="bg-blue-900 pt-12 pb-6 px-5 rounded-b-3xl shadow-md">
          <Text className="text-white text-2xl font-bold text-center">
            Nueva Solicitud
          </Text>

          <Text className="text-blue-200 text-sm text-center mt-1">
            Ingrese los datos del cliente
          </Text>
        </View>

        <View className="flex-1 p-6">

          {/* ================= NOMBRE ================= */}

          <View className="mb-4">

            <Text className="text-gray-700 font-semibold mb-2">
              Nombre del Cliente
            </Text>

            <TextInput
              placeholder="Ej. Juan Pérez"
              value={nombre}
              onChangeText={(texto) =>
                setNombre(
                  texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "")
                )
              }
              autoCapitalize="words"
              maxLength={50}
              className={`bg-white border rounded-xl p-3.5 ${
                errores.nombre
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />

            {errores.nombre && (
              <Text className="text-red-500 text-sm mt-1">
                ⚠️ {errores.nombre}
              </Text>
            )}

          </View>

          {/* ================= TELEFONO ================= */}

          <View className="mb-4">

            <Text className="text-gray-700 font-semibold mb-2">
              Teléfono
            </Text>

            <TextInput
              placeholder="Ej. 987654321"
              value={telefono}
              onChangeText={(texto) =>
                setTelefono(texto.replace(/[^0-9]/g, ""))
              }
              keyboardType="number-pad"
              maxLength={9}
              className={`bg-white border rounded-xl p-3.5 ${
                errores.telefono
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />

            {errores.telefono && (
              <Text className="text-red-500 text-sm mt-1">
                ⚠️ {errores.telefono}
              </Text>
            )}

          </View>

          {/* ================= TIPO ================= */}

          <View className="mb-4">

            <Text className="text-gray-700 font-semibold mb-2">
              Tipo de Servicio
            </Text>

            <View
              className={`bg-white border rounded-xl ${
                errores.tipo
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            >

              <Picker
                selectedValue={tipo}
                onValueChange={setTipo}
              >

                <Picker.Item
                  label="Seleccione un servicio..."
                  value=""
                />

                {tiposServicio.map((servicio) => (

                  <Picker.Item
                    key={servicio}
                    label={servicio}
                    value={servicio}
                  />

                ))}

              </Picker>

            </View>

            {errores.tipo && (
              <Text className="text-red-500 text-sm mt-1">
                ⚠️ {errores.tipo}
              </Text>
            )}

          </View>

          {/* ================= PRIORIDAD ================= */}

          <View className="mb-4">

            <Text className="text-gray-700 font-semibold mb-2">
              Prioridad
            </Text>

            <View className="bg-white border border-gray-200 rounded-xl">

              <Picker
                selectedValue={prioridad}
                onValueChange={setPrioridad}
              >

                {prioridades.map((item) => (

                  <Picker.Item
                    key={item}
                    label={item}
                    value={item}
                  />

                ))}

              </Picker>

            </View>

          </View>

          {/* ================= TECNICO ================= */}

          <View className="mb-4">

            <Text className="text-gray-700 font-semibold mb-2">
              Técnico Asignado
            </Text>

            <View className="bg-white border border-gray-200 rounded-xl">

              <Picker
                selectedValue={tecnicoAsignado}
                onValueChange={setTecnicoAsignado}
              >

                {tecnicos.map((tecnico) => (

                  <Picker.Item
                    key={tecnico}
                    label={tecnico}
                    value={tecnico}
                  />

                ))}

              </Picker>

            </View>

          </View>

          {/* ================= DESCRIPCION ================= */}

          <View className="mb-6">

            <Text className="text-gray-700 font-semibold mb-2">
              Descripción
            </Text>

            <TextInput
              placeholder="Explique el problema del cliente..."
              value={descripcion}
              onChangeText={setDescripcion}
              multiline
              numberOfLines={4}
              maxLength={250}
              textAlignVertical="top"
              className={`bg-white border rounded-xl p-3.5 h-28 ${
                errores.descripcion
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
            />

            {errores.descripcion && (
              <Text className="text-red-500 text-sm mt-1">
                ⚠️ {errores.descripcion}
              </Text>
            )}

            <Text className="text-gray-400 text-right mt-1">
              {descripcion.length}/250
            </Text>

          </View>

          {/* ================= BOTON ================= */}

          <CustomButton
            titulo="Guardar Solicitud"
            onPress={guardar}
          />

        </View>

      </ScrollView>

    </KeyboardAvoidingView>
  );
}