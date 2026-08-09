import { Ionicons } from "@expo/vector-icons";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Solicitud } from "../../domain/models/Solicitud";
import ChipEstado from "./ChipEstado";

interface Props {
  solicitud: Solicitud;
  onPress: () => void;
  onEliminar: (id: number) => void;
  onCambiarEstado: (id: number, nuevoEstado: string) => void;
}

export default function TarjetaSolicitud({
  solicitud,
  onPress,
  onEliminar,
  onCambiarEstado,
}: Props) {
  
  const colorPrioridad =
    solicitud.prioridad === "ALTA"
      ? "text-red-600"
      : solicitud.prioridad === "MEDIA"
      ? "text-yellow-600"
      : "text-green-600";

  const iconoServicio = solicitud.tipoServicio.includes("Premium")
    ? "👑"
    : solicitud.tipoServicio.includes("Familiar")
    ? "🏠"
    : solicitud.tipoServicio.includes("Básico")
    ? "📺"
    : solicitud.tipoServicio.includes("Sin Señal")
    ? "📡"
    : solicitud.tipoServicio.includes("Reparación")
    ? "🛠️"
    : "📋";

  // Función para confirmar antes de eliminar
  const confirmarEliminacion = () => {
    Alert.alert(
      "Eliminar Solicitud",
      `¿Estás seguro de que deseas eliminar la solicitud de ${solicitud.cliente}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => onEliminar(solicitud.id),
        },
      ]
    );
  };

  // Función para avanzar el estado lógicamente
  const avanzarEstado = () => {
    let nuevoEstado = "";
    if (solicitud.estado === "PENDIENTE") nuevoEstado = "EN_ATENCION";
    else if (solicitud.estado === "EN_ATENCION") nuevoEstado = "FINALIZADO";
    else return; // Si está finalizado, no hace nada
    
    onCambiarEstado(solicitud.id, nuevoEstado);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="bg-white rounded-3xl p-5 mb-4 shadow border border-gray-200"
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-1 mr-2">
          <Text className="text-xl font-bold text-blue-900" numberOfLines={1}>
            {iconoServicio} {solicitud.cliente}
          </Text>
          <Text className="text-gray-500 text-sm mt-1">
            📅 {solicitud.fechaRegistro}
          </Text>
        </View>
        <ChipEstado estado={solicitud.estado} />
      </View>
      
      <View className="mt-4">
        <Text className="text-gray-700">📞 {solicitud.telefono}</Text>
        <Text className="text-gray-700 mt-1">📍 {solicitud.direccion}</Text>
        <Text className="text-gray-700 mt-1">📡 {solicitud.tipoServicio}</Text>
        {solicitud.tecnicoAsignado && (
             <Text className="text-gray-700 mt-1">👨‍🔧 {solicitud.tecnicoAsignado}</Text>
        )}
        <Text className={`${colorPrioridad} font-bold mt-2`}>
          🔥 Prioridad: {solicitud.prioridad}
        </Text>
      </View>

      {/* BARRA DE ACCIONES (CRUD) */}
      <View className="border-t border-gray-100 mt-4 pt-3 flex-row justify-between items-center">
        
        <View className="flex-row space-x-3">
            {/* Botón de Eliminar */}
            <TouchableOpacity 
                onPress={confirmarEliminacion}
                className="bg-red-100 p-2 rounded-full"
            >
                <Ionicons name="trash-outline" size={20} color="#dc2626" />
            </TouchableOpacity>

            {/* Botón para Cambiar Estado (solo si no está finalizado) */}
            {solicitud.estado !== "FINALIZADO" && (
                <TouchableOpacity 
                    onPress={avanzarEstado}
                    className="bg-green-100 p-2 rounded-full flex-row items-center px-3"
                >
                    <Ionicons name="checkmark-circle-outline" size={20} color="#16a34a" />
                    <Text className="text-green-700 ml-1 font-semibold text-xs">
                        {solicitud.estado === "PENDIENTE" ? "Atender" : "Finalizar"}
                    </Text>
                </TouchableOpacity>
            )}
        </View>

        <Text className="text-blue-700 font-semibold text-sm">
          Ver detalle →
        </Text>
      </View>
    </TouchableOpacity>
  );
}