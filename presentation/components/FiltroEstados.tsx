import { View, TouchableOpacity, Text } from "react-native";

interface Props {

    estado: string;
    cambiarEstado: (estado: string) => void;
    }
    const estados = [
    "TODOS",
    "PENDIENTE",
    "EN_ATENCION",
    "FINALIZADO",
    ];
    export default function FiltroEstados({
    estado,
    cambiarEstado,
    }: Props) {
    return (
        <View className="flex-row justify-between mb-5">
        {
            estados.map((item) => (
            <TouchableOpacity
                key={item}
                onPress={() => cambiarEstado(item)}
                className={`px-3 py-2 rounded-full ${estado === item ? "bg-blue-800" : "bg-gray-300"
                }`}
            >
                <Text
                className={`${estado === item ? "text-white" : "text-black"
                    } font-bold text-xs`}
                >
                {item}
                </Text>
            </TouchableOpacity>
            ))
        }
        </View>
    );

}