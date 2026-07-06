import { View, Text, TextInput, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import {useEffect, useState} from 'react';
import { router } from "expo-router";
import CustomButton from "../components/custombutton";

interface ErroresLogin {
  usuario?: string;
  password?: string;
}

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [errores, setErrores] = useState<ErroresLogin>({});
    const [formularioEnviado, setFormularioEnviado] = useState(false);

    useEffect(() => {
    if (formularioEnviado) validarCampos();
  }, [usuario, password]);

  const validarCampos = () => {
    const nuevosErrores: ErroresLogin = {};
    if (!usuario.trim()) nuevosErrores.usuario = "El usuario es obligatorio";
    if (!password.trim()) nuevosErrores.password = "La contraseña es obligatoria";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

    const ingresar = () => {
    setFormularioEnviado(true);
    if (!validarCampos()) return; 

    if (usuario === "admin" && password === "1234") {
      setUsuario("");
      setPassword("");
      setErrores({});
      setFormularioEnviado(false);
      router.push("/home");
    } else {
      Alert.alert("Acceso Denegado", "Usuario o contraseña incorrectos.");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps="handled">
        <View className="p-6 w-full max-w-md self-center">
          
          <View className="items-center mb-10">
            <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4 shadow-sm">
              <Text className="text-5xl">📺</Text>
            </View>
            <Text className="text-3xl font-bold text-center text-blue-900">Cable TV</Text>
            <Text className="text-gray-500 text-center mt-2 text-base">Conectando los pueblos</Text>
          </View>

          <View className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Usuario</Text>
              <TextInput
                placeholder="Ingrese su usuario"
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
                className={`bg-gray-50 border p-4 rounded-xl text-gray-800 text-base ${errores.usuario ? "border-red-500 bg-red-50" : "border-gray-200"}`}
              />
              {errores.usuario && <Text className="text-red-500 text-sm mt-1 ml-1">⚠️ {errores.usuario}</Text>}
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2 ml-1">Contraseña</Text>
              <TextInput
                placeholder="••••••••"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                keyboardType="numeric"
                className={`bg-gray-50 border p-4 rounded-xl text-gray-800 text-base ${errores.password ? "border-red-500 bg-red-50" : "border-gray-200"}`}
              />
              {errores.password && <Text className="text-red-500 text-sm mt-1 ml-1">⚠️ {errores.password}</Text>}
            </View>

            <CustomButton titulo="Ingresar al Sistema" onPress={ingresar} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}