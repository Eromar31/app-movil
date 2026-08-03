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

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import CustomButton from "../presentation/components/custombutton";

interface ErroresRegistro {
    nombre?: string;
    usuario?: string;
    password?: string;
    confirmar?: string;

}

const STORAGE_USUARIO = "@tv_conectando_usuario";
export default function RegistrarUsuario() {

    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
    const [errores, setErrores] =
        useState<ErroresRegistro>({});
    const [formularioEnviado, setFormularioEnviado] =
        useState(false);
    useEffect(() => {
        if (formularioEnviado) {
            validarFormulario();
        }
    }, [nombre, usuario, password, confirmar]);
    function validarFormulario() {
        const nuevosErrores: ErroresRegistro = {};
        if (!nombre.trim()) {
            nuevosErrores.nombre =
                "Ingrese su nombre.";
        }
        else if (nombre.trim().length < 3) {
            nuevosErrores.nombre =
                "Debe tener al menos 3 letras.";
        }
        if (!usuario.trim()) {
            nuevosErrores.usuario =
                "Ingrese un usuario.";
        }
        else if (usuario.length < 4) {
            nuevosErrores.usuario =
                "Mínimo 4 caracteres.";
        }
        if (!password.trim()) {
            nuevosErrores.password =
                "Ingrese una contraseña.";
        }
        else if (password.length < 4) {
            nuevosErrores.password =
                "Mínimo 4 caracteres.";
        }
        if (!confirmar.trim()) {
            nuevosErrores.confirmar =
                "Confirme la contraseña.";
        }
        else if (confirmar !== password) {
            nuevosErrores.confirmar =
                "Las contraseñas no coinciden.";
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    }
    async function registrar() {

        setFormularioEnviado(true);

        if (!validarFormulario()) return;

        const usuarioGuardado = {
            nombre,
            usuario,
            password,
        };

        try {

            await AsyncStorage.setItem(
                STORAGE_USUARIO,
                JSON.stringify(usuarioGuardado)
            );

            Alert.alert(
                "Usuario registrado",
                "La cuenta fue creada correctamente.",
                [
                    {
                        text: "Aceptar",
                        onPress: () => router.replace("/"),
                    },
                ]
            );

        } catch {

            Alert.alert(
                "Error",
                "No se pudo guardar el usuario."
            );

        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="flex-1 bg-gray-100"
        >
            <ScrollView>
                <View className="bg-blue-900 pt-12 pb-6 rounded-b-3xl">
                    <Text className="text-white text-3xl font-bold text-center">
                        Crear Cuenta
                    </Text>
                </View>
                <View className="p-6">
                    <Text className="font-bold mb-2">
                        Nombre Completo
                    </Text>
                    <TextInput
                        placeholder="Juan Pérez"
                        value={nombre}
                        onChangeText={(texto) =>
                            setNombre(
                                texto.replace(
                                    /[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g,
                                    ""
                                )
                            )
                        }
                        className={`bg-white rounded-xl p-4 border ${errores.nombre ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errores.nombre && (
                        <Text className="text-red-500 mt-1">
                            ⚠️ {errores.nombre}
                        </Text>
                    )}
                    <Text className="font-bold mt-5 mb-2">
                        Usuario
                    </Text>
                    <TextInput
                        placeholder="Ingrese un usuario"
                        autoCapitalize="none"
                        value={usuario}
                        onChangeText={setUsuario}
                        className={`bg-white rounded-xl p-4 border ${errores.usuario ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errores.usuario && (
                        <Text className="text-red-500 mt-1">
                            ⚠️ {errores.usuario}
                        </Text>
                    )}
                    <Text className="font-bold mt-5 mb-2">
                        Contraseña
                    </Text>
                    <View className={`flex-row items-center bg-white rounded-xl border px-3 ${errores.password ? "border-red-500" : "border-gray-300"
                        }`}>
                        <TextInput
                            placeholder="********"
                            secureTextEntry={!mostrarPassword}
                            value={password}
                            onChangeText={setPassword}
                            className="flex-1 p-4"
                        />
                        <TouchableOpacity
                            onPress={() =>
                                setMostrarPassword(!mostrarPassword)
                            }
                        >
                            <Ionicons
                                name={
                                    mostrarPassword
                                        ? "eye-off-outline"
                                        : "eye-outline"
                                }
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    {errores.password && (
                        <Text className="text-red-500 mt-1">
                            ⚠️ {errores.password}
                        </Text>
                    )}
                    <Text className="font-bold mt-5 mb-2">
                        Confirmar Contraseña
                    </Text>
                    <View className={`flex-row items-center bg-white rounded-xl border px-3 ${errores.confirmar ? "border-red-500" : "border-gray-300"
                        }`}>
                        <TextInput
                            placeholder="********"
                            secureTextEntry={!mostrarConfirmar}
                            value={confirmar}
                            onChangeText={setConfirmar}
                            className="flex-1 p-4"
                        />
                        <TouchableOpacity
                            onPress={() =>
                                setMostrarConfirmar(!mostrarConfirmar)
                            }
                        >
                            <Ionicons
                                name={
                                    mostrarConfirmar
                                        ? "eye-off-outline"
                                        : "eye-outline"
                                }
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>
                    {errores.confirmar && (
                        <Text className="text-red-500 mt-1">
                            ⚠️ {errores.confirmar}
                        </Text>
                    )}
                    <View className="mt-8">
                        <CustomButton
                            titulo="Crear Cuenta"
                            onPress={registrar}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );

}