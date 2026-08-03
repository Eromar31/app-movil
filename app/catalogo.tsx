import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

// Interfaz para tipar los datos que vienen de la API
interface Producto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
}

export default function Catalogo() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  // Función asíncrona para consumir la API REST externa (Requisito EFP)
  const cargarCatalogo = async () => {
    try {
      setCargando(true);
      // Usamos una API pública de prueba (FakeStoreAPI) simulando equipos electrónicos
      const response = await fetch("https://fakestoreapi.com/products/category/electronics?limit=5");
      
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo cargar el catálogo de equipos.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCatalogo();
  }, []);

  return (
    <View className="flex-1 bg-gray-100 p-5">
      <TouchableOpacity onPress={() => router.replace("/home")} className="mb-5">
        <Text className="text-blue-700 font-bold text-lg">🏠 Volver al Inicio</Text>
      </TouchableOpacity>

      <Text className="text-2xl font-bold text-blue-900 mb-2">📦 Catálogo de Equipos</Text>
      <Text className="text-gray-500 mb-6">Equipos disponibles (Datos desde API REST)</Text>

      {/* Condicional de renderizado: Mostrar el loader si está cargando */}
      {cargando ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1e3a8a" />
          <Text className="mt-4 text-gray-600">Descargando catálogo...</Text>
        </View>
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="bg-white p-4 rounded-2xl mb-4 shadow border border-gray-200">
              <View className="flex-row justify-between">
                <Text className="font-bold text-lg text-gray-800 flex-1 mr-2" numberOfLines={1}>
                  {item.title}
                </Text>
                <Text className="font-bold text-green-600 text-lg">
                  ${item.price}
                </Text>
              </View>
              <Text className="text-gray-400 text-xs uppercase my-1 font-bold">{item.category}</Text>
              <Text className="text-gray-600 mt-2 text-sm leading-5" numberOfLines={3}>
                {item.description}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}