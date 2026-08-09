import { Ionicons } from "@expo/vector-icons";
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../infrastructure/firebase/firebaseConfig";

interface ErroresLogin {
  usuario?: string;
  password?: string;
}

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [errores, setErrores] = useState<ErroresLogin>({});
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const STORAGE_USUARIO = "@tv_conectando_usuario";

  useEffect(() => {
    if (formularioEnviado) {
      validarCampos();
    }
  }, [usuario, password]);

  const validarCampos = () => {
    const nuevosErrores: ErroresLogin = {};
    if (!usuario.trim()) {
      nuevosErrores.usuario = "El usuario es obligatorio";
    }
    if (!password.trim()) {
      nuevosErrores.password = "La contraseña es obligatoria";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const ingresar = async () => {
    setFormularioEnviado(true);
    if (!validarCampos()) return;

    if (usuario.trim().toLowerCase() === "admin" && password === "1234") {
      setUsuario("");
      setPassword("");
      setErrores({});
      setFormularioEnviado(false);
      
      await AsyncStorage.setItem(
        STORAGE_USUARIO,
        JSON.stringify({ nombre: "Administrador", usuario: "admin" })
      );
      
      router.replace("/home");
      return;
    }

    try {
      const correoInstitucional = `${usuario.trim().toLowerCase()}@cabletv.com`;

      const userCredential = await signInWithEmailAndPassword(auth, correoInstitucional, password);
      const user = userCredential.user;

      await AsyncStorage.setItem(
        STORAGE_USUARIO,
        JSON.stringify({
          nombre: user.displayName || "Técnico",
          usuario: usuario.trim().toLowerCase(),
          email: user.email
        })
      );

      setUsuario("");
      setPassword("");
      setErrores({});
      setFormularioEnviado(false);
      
      router.replace("/home");

    } catch (error: any) {

      let mensajeError = "Usuario o contraseña incorrectos.";
      if (error.code === 'auth/user-not-found') {
        mensajeError = "Este usuario no existe. Regístrate primero.";
      } else if (error.code === 'auth/wrong-password') {
        mensajeError = "Contraseña incorrecta.";
      } else if (error.code === 'auth/network-request-failed') {
        mensajeError = "Error de red. Revisa tu conexión a internet.";
      }

      Alert.alert("Acceso Denegado", mensajeError);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 250 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-6 w-full max-w-md self-center mt-12">
          <View className="items-center mb-10">
            <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4 shadow-sm">
              <Text className="text-5xl">📺</Text>
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
                placeholder="Ingrese su usuario (ej. tecnicosofia)"
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
                  className="flex-1 p-4 text-gray-800 text-base"
                />
                <TouchableOpacity
                  onPress={() => setMostrarPassword(!mostrarPassword)}
                >
                  <Ionicons
                    name={mostrarPassword ? "eye-off-outline" : "eye-outline"}
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
            <TouchableOpacity onPress={() => router.push("/registrarUsuario")}>
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