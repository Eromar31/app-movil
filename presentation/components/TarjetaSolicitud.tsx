import { Text, TouchableOpacity, View } from "react-native";
import { Solicitud } from "../../domain/models/Solicitud";
import ChipEstado from "./ChipEstado";

interface Props {
    solicitud: Solicitud;
    onPress: () => void;
}

export default function TarjetaSolicitud({
    solicitud,
    onPress,
}: Props) {

    const colorPrioridad =
        solicitud.prioridad === "ALTA"
            ? "text-red-600"
            : solicitud.prioridad === "MEDIA"
            ? "text-yellow-600"
            : "text-green-600";
    const iconoServicio =
        solicitud.tipoServicio.includes("Premium")
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
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.85}
            className="bg-white rounded-3xl p-5 mb-4 shadow border border-gray-200"
        >
            <View className="flex-row justify-between items-center">
                <View>
                    <Text className="text-xl font-bold text-blue-900">
                        {iconoServicio} {solicitud.cliente}
                    </Text>
                    <Text className="text-gray-500 text-sm mt-1">
                        📅 {solicitud.fechaRegistro}
                    </Text>
                </View>
                <ChipEstado estado={solicitud.estado} />
            </View>
            <View className="mt-4">
                <Text className="text-gray-700">
                    📞 {solicitud.telefono}
                </Text>
                <Text className="text-gray-700 mt-1">
                    📍 {solicitud.direccion}
                </Text>
                <Text className="text-gray-700 mt-1">
                    📡 {solicitud.tipoServicio}
                </Text>
                <Text className="text-gray-700 mt-1">
                    👨‍🔧 {solicitud.tecnicoAsignado}
                </Text>
                <Text className={`${colorPrioridad} font-bold mt-2`}>
                    🔥 Prioridad: {solicitud.prioridad}
                </Text>
            </View>
            <View className="border-t border-gray-200 mt-4 pt-3 flex-row justify-end">
                <Text className="text-blue-700 font-semibold">
                    Ver detalle →
                </Text>
            </View>
        </TouchableOpacity>
    );

}