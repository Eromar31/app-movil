import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function Perfil() {
  return (
    <View className="flex-1 bg-gray-100 p-5">
      <TouchableOpacity onPress={() => router.replace("/home")} className="mb-5">
        <Text className="text-blue-700 font-bold text-lg">🏠 Volver al Inicio</Text>
      </TouchableOpacity>

      <View className="bg-white rounded-3xl p-6 shadow border border-gray-200 items-center mt-4">
        {/* Avatar Simulado */}
        <View className="w-24 h-24 bg-blue-900 rounded-full items-center justify-center mb-4">
          <Text className="text-4xl text-white font-bold">O</Text>
        </View>

        <Text className="text-2xl font-bold text-blue-900 mb-1">Operador Técnico</Text>
        <Text className="text-gray-500 font-medium mb-6">admin@tvconectando.com</Text>

        <View className="w-full bg-blue-50 p-4 rounded-2xl mb-4">
          <Text className="text-blue-800 font-bold mb-1">Base de Datos Activa:</Text>
          <Text className="text-gray-700">SQLite Local (tvconectando.db)</Text>
        </View>

        <View className="w-full bg-blue-50 p-4 rounded-2xl mb-8">
          <Text className="text-blue-800 font-bold mb-1">Estado de Sincronización:</Text>
          <Text className="text-green-600 font-bold">● Offline (Local)</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="bg-red-600 py-4 px-10 rounded-xl w-full items-center"
        >
          <Text className="text-white font-bold text-lg">Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}