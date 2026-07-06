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

    interface ErroresRegistro {
     nombre?: string;
     telefono?: string;
     tipo?: string;
     descripcion?: string;
    }

    export default function Registro() {

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [tipo, setTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [errores, setErrores] = useState<ErroresRegistro>({});
    const [formularioEnviado, setFormularioEnviado] = useState(false);
    
    useEffect(() => {
    if (formularioEnviado) validarFormulario();
  }, [nombre, telefono, tipo, descripcion]);

  const validarFormulario = () => {
    const nuevosErrores: ErroresRegistro = {};
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!telefono.trim() || telefono.length !== 9) nuevosErrores.telefono = "Debe ser un celular válido de 9 dígitos";
    if (!tipo.trim()) nuevosErrores.tipo = "Especifique el tipo de solicitud";
    if (!descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria";
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

    const guardar = () => {
    setFormularioEnviado(true);
    if (!validarFormulario()) return;

    Alert.alert("¡Éxito!", "Solicitud registrada correctamente.", [
      { text: "OK", onPress: () => router.push("/home") }
    ]);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        
        <View className="bg-blue-900 pt-12 pb-6 px-5 rounded-b-3xl shadow-md">
          <Text className="text-white text-2xl font-bold text-center">Nueva Solicitud</Text>
          <Text className="text-blue-200 text-sm text-center mt-1">Ingrese los datos del cliente</Text>
        </View>

        <View className="flex-1 p-6 justify-between">
          <View className="space-y-4">
            
            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-2">Nombre del Cliente</Text>
              <TextInput placeholder="Ej. Juan Pérez" value={nombre} onChangeText={setNombre} className={`bg-white border p-3.5 rounded-xl ${errores.nombre ? "border-red-500" : "border-gray-200"}`} />
              {errores.nombre && <Text className="text-red-500 text-sm mt-1">⚠️ {errores.nombre}</Text>}
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-2">Teléfono</Text>
              <TextInput placeholder="Ej. 987654321" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" maxLength={9} className={`bg-white border p-3.5 rounded-xl ${errores.telefono ? "border-red-500" : "border-gray-200"}`} />
              {errores.telefono && <Text className="text-red-500 text-sm mt-1">⚠️ {errores.telefono}</Text>}
            </View>

            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-2">Tipo de Solicitud</Text>
              <TextInput placeholder="Ej. Instalación" value={tipo} onChangeText={setTipo} className={`bg-white border p-3.5 rounded-xl ${errores.tipo ? "border-red-500" : "border-gray-200"}`} />
              {errores.tipo && <Text className="text-red-500 text-sm mt-1">⚠️ {errores.tipo}</Text>}
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2">Descripción</Text>
              <TextInput placeholder="Detalles del problema..." multiline numberOfLines={3} value={descripcion} onChangeText={setDescripcion} className={`bg-white border p-3.5 rounded-xl h-24 ${errores.descripcion ? "border-red-500" : "border-gray-200"}`} />
              {errores.descripcion && <Text className="text-red-500 text-sm mt-1">⚠️ {errores.descripcion}</Text>}
            </View>

          </View>

          <CustomButton titulo="Guardar Solicitud" onPress={guardar} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}