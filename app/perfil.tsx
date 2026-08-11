import { router } from "expo-router";
import { signOut } from "firebase/auth";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../infrastructure/firebase/firebaseConfig";

export default function Perfil() {
  const usuarioActual = auth.currentUser;
  const correoUsuario = usuarioActual?.email || "usuario@desconocido.com";
  const inicial = correoUsuario.charAt(0).toUpperCase();

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      router.replace("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <ScrollView 
        className="flex-1 bg-gray-100 p-5"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={() => router.replace("/home")} className="mb-5 mt-2">
        <Text className="text-blue-700 font-bold text-lg">🏠 Volver al Inicio</Text>
      </TouchableOpacity>

      <View className="bg-white rounded-3xl p-6 shadow border border-gray-200 items-center mt-2">
        
        <View className="w-24 h-24 bg-blue-900 rounded-full items-center justify-center mb-4 shadow-sm">
          <Text className="text-4xl text-white font-bold">{inicial}</Text>
        </View>

        <Text className="text-2xl font-bold text-blue-900 mb-1">Técnico Activo</Text>
        <Text className="text-gray-500 font-medium mb-6">{correoUsuario}</Text>

        <View className="w-full bg-blue-50 p-4 rounded-2xl mb-4 border border-blue-100">
          <Text className="text-blue-800 font-bold mb-1">Base de Datos Activa:</Text>
          <Text className="text-gray-700">SQLite + Cloud Firestore</Text>
        </View>

        <View className="w-full bg-blue-50 p-4 rounded-2xl mb-8 border border-blue-100">
          <Text className="text-blue-800 font-bold mb-1">Estado de Sincronización:</Text>
          <Text className="text-green-600 font-bold">● Online (Sincronizado)</Text>
        </View>

        {/* NUEVO BOTÓN: Enlace a la pantalla Acerca de */}
        <TouchableOpacity
          onPress={() => router.push("/acerca")}
          className="bg-blue-50 border border-blue-200 py-4 px-5 rounded-xl w-full flex-row justify-between items-center mb-6"
        >
          <Text className="text-blue-900 font-bold text-lg">ℹ️ Acerca de la app</Text>
          <Text className="text-blue-900 font-bold text-xl">➔</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={cerrarSesion}
          className="bg-red-600 py-4 px-10 rounded-xl w-full items-center shadow-sm"
        >
          <Text className="text-white font-bold text-lg">Cerrar Sesión</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}