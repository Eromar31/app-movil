import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

interface ProductoCable {
  id: number;
  producto: string;
  categoria: string;
  precio: string;
}


const DATOS_CATALOGO_MOCK: ProductoCable[] = [
  { id: 1, producto: "Conector RG6", categoria: "Conectores", precio: "S/ 1.50" },
  { id: 2, producto: "Cable coaxial RG6", categoria: "Cableado", precio: "S/ 2.50 / metro" },
  { id: 3, producto: "Fibra óptica", categoria: "Cableado", precio: "S/ 3.50 / metro" },
  { id: 4, producto: "Divisor 1x2", categoria: "Divisores", precio: "S/ 8.00" },
  { id: 5, producto: "Divisor 1x4", categoria: "Divisores", precio: "S/ 15.00" },
  { id: 6, producto: "Nodo óptico", categoria: "Equipos de red", precio: "S/ 180.00" },
  { id: 7, producto: "Amplificador CATV", categoria: "Equipos de red", precio: "S/ 250.00" },
  { id: 8, producto: "Grapas para cable coaxial", categoria: "Accesorios", precio: "S/ 0.20" },
  { id: 9, producto: "Conector de fibra óptica", categoria: "Conectores", precio: "S/ 5.00" },
  { id: 10, producto: "Fuente de alimentación CATV", categoria: "Equipos", precio: "S/ 80.00" },
];

export default function Catalogo() {
  const [productos, setProductos] = useState<ProductoCable[]>([]);
  const [cargando, setCargando] = useState(true);

  const cargarCatalogo = async () => {
    try {
      setCargando(true);
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setProductos(DATOS_CATALOGO_MOCK);
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
      <Text className="text-gray-500 mb-6">Lista de precios referenciales - TV Conectando</Text>

      {cargando ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#1e3a8a" />
          <Text className="mt-4 text-gray-600">Sincronizando inventario...</Text>
        </View>
      ) : (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="bg-white p-4 rounded-2xl mb-4 shadow border border-gray-200">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="font-bold text-lg text-gray-800" numberOfLines={1}>
                    {item.producto}
                  </Text>
                  <Text className="text-gray-400 text-xs uppercase mt-1 font-bold">
                    {item.categoria}
                  </Text>
                </View>
                <View className="bg-green-100 px-3 py-1 rounded-xl">
                  <Text className="font-bold text-green-700 text-base">
                    {item.precio}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}