import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function AcercaDe() {
  return (
    <ScrollView 
        className="flex-1 bg-gray-100 p-5"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={() => router.back()} className="mb-5 mt-2">
        <Text className="text-blue-700 font-bold text-lg">⬅ Volver</Text>
      </TouchableOpacity>

      <View className="bg-white rounded-3xl p-6 shadow border border-gray-200">
        
        {/* Cabecera / Logo Simulado */}
        <View className="items-center mb-6">
          <View className="w-20 h-20 bg-blue-900 rounded-2xl items-center justify-center mb-3 shadow-sm">
            <Text className="text-4xl">📺</Text>
          </View>
          <Text className="text-2xl font-bold text-blue-900">TV Conectando</Text>
          <Text className="text-gray-500 font-medium">Versión 1.0 (Build de Evaluación)</Text>
        </View>

        {/* Descripción de la App */}
        <Text className="text-gray-700 text-base mb-6 text-justify leading-relaxed">
          TV Conectando es una solución móvil diseñada para optimizar la gestión de solicitudes técnicas. Permite el registro, seguimiento y administración de servicios, garantizando la persistencia dual de datos mediante SQLite local y Cloud Firestore.
        </Text>

        {/* Equipo del Proyecto */}
        <View className="w-full border-t border-gray-200 pt-6 mb-6">
          <Text className="text-lg font-bold text-blue-900 mb-4 text-center">
            Equipo del Proyecto
          </Text>
          
          <View className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-3">
            <Text className="text-blue-900 font-bold">Jhonny Jesus Rondon Gonzalez</Text>
            <Text className="text-gray-600 text-sm">Lead Developer / Ing. de Sistemas</Text>
          </View>

          <View className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <Text className="text-blue-900 font-bold">Erick Pulache Arévalo</Text>
            <Text className="text-gray-600 text-sm">Product Owner & QA Lead</Text>
          </View>
        </View>

        {/* Soporte y Contacto (Demo) */}
        <View className="w-full border-t border-gray-200 pt-6 mb-6">
          <Text className="text-lg font-bold text-blue-900 mb-4 text-center">
            Soporte Técnico
          </Text>
          <Text className="text-gray-700 mb-2 text-center">📧 soporte@tvconectando.demo</Text>
          <Text className="text-gray-700 text-center">📞 +51 800 123 456</Text>
        </View>

        {/* Legal y Copyright */}
        <View className="w-full border-t border-gray-200 pt-6">
          <Text className="text-center text-gray-400 text-xs mb-2">
            © 2026 TechSolutions Group & IDAT. Todos los derechos reservados.
          </Text>
          <Text className="text-center text-gray-400 text-xs">
            Aplicación desarrollada con fines académicos. Lee los Términos y Condiciones de la versión de evaluación.
          </Text>
        </View>

      </View>
    </ScrollView>
  );
}