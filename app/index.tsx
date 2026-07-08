import {
  View,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../components/custombutton";

interface ErroresLogin {
  usuario?: string;
  password?: string;
}

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errores, setErrores] =
    useState<ErroresLogin>({});
  const STORAGE_USUARIO = "@tv_conectando_usuario";
  const [formularioEnviado, setFormularioEnviado] =
    useState(false);
  useEffect(() => {
    if (formularioEnviado) {
      validarCampos();
    }
  }, [usuario, password]);
  const validarCampos = () => {
    const nuevosErrores: ErroresLogin = {};
    if (!usuario.trim()) {
      nuevosErrores.usuario =
        "El usuario es obligatorio";
    }
    if (!password.trim()) {
      nuevosErrores.password =
        "La contraseña es obligatoria";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  const ingresar = async () => {
      setFormularioEnviado(true);
      if (!validarCampos()) return;
      // Usuario administrador
      if (
          usuario === "admin" &&
          password === "1234"
      ) {
          setUsuario("");
          setPassword("");
          setErrores({});
          setFormularioEnviado(false);
          router.replace("/home");
          return;
      }
      try {
          const datos = await AsyncStorage.getItem(
              STORAGE_USUARIO
          );
          if (datos) {
              const usuarioRegistrado =
                  JSON.parse(datos);
              if (
                  usuario === usuarioRegistrado.usuario &&
                  password === usuarioRegistrado.password

              ) {

                  setUsuario("");
                  setPassword("");
                  setErrores({});
                  setFormularioEnviado(false);
                  router.replace("/home");
                  return;
              }
          }
          Alert.alert(
              "Acceso Denegado",
              "Usuario o contraseña incorrectos."
          );
      } catch {
          Alert.alert(
              "Error",
              "No se pudo validar el usuario."
          );
      }
  };
  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="p-6 w-full max-w-md self-center">
          <View className="items-center mb-10">
            <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4 shadow-sm">
              <Text className="text-5xl">
                📺
              </Text>
            </View>
            <Text className="text-3xl font-bold text-center text-blue-900">
              Cable TV
            </Text>
            <Text className="text-gray-500 text-center mt-2 text-base">
              Conectando los pueblos
            </Text>
          </View>
          <View className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            {/* Usuario */}
            <View className="mb-4">
              <Text className="text-gray-700 font-semibold mb-2 ml-1">
                Usuario
              </Text>
              <TextInput
                placeholder="Ingrese su usuario"
                value={usuario}
                onChangeText={setUsuario}
                autoCapitalize="none"
                className={`bg-gray-50 border p-4 rounded-xl text-gray-800 text-base ${
                  errores.usuario
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                }`}
              />
              
              {errores.usuario && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  ⚠️ {errores.usuario}
                </Text>
              )}
            </View>

            {/* Contraseña */}
            <View className="mb-6">
              <Text className="text-gray-700 font-semibold mb-2 ml-1">
                Contraseña
              </Text>
              <View
                className={`flex-row items-center bg-gray-50 border rounded-xl px-3 ${
                  errores.password
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                }`}
              >
                <TextInput
                  placeholder="••••••••"
                  secureTextEntry={!mostrarPassword}
                  value={password}
                  onChangeText={setPassword}
                  keyboardType="numeric"
                  className="flex-1 p-4 text-gray-800 text-base"
                />
                <TouchableOpacity
                  onPress={() =>
                    setMostrarPassword(
                      !mostrarPassword
                    )
                  }
                >
                  <Ionicons
                    name={
                      mostrarPassword
                        ? "eye-off-outline"
                        : "eye-outline"
                    }
                    size={24}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
              {errores.password && (
                <Text className="text-red-500 text-sm mt-1 ml-1">
                  ⚠️ {errores.password}
                </Text>
              )}
            </View>
            <CustomButton
              titulo="Ingresar al Sistema"
              onPress={ingresar}
            />
            </View>
              <View className="items-center mt-6">
                <Text className="text-gray-500">
                    ¿No tienes una cuenta?
                </Text>
                <TouchableOpacity
                    onPress={() =>
                        router.push("/registrarUsuario")
                    }
                >
                    <Text className="text-blue-700 font-bold mt-2">
                        Registrarse
                    </Text>
                </TouchableOpacity>
              </View>
          </View>
        
      </ScrollView>
    </KeyboardAvoidingView>
  );
}