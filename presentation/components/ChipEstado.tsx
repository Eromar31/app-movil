import { View, Text } from "react-native";

interface Props {
    estado: string;
}

export default function ChipEstado({ estado }: Props) {

    let fondo = "bg-gray-500";

    switch (estado) {

        case "PENDIENTE":
        fondo = "bg-yellow-500";
        break;

        case "EN_ATENCION":
        fondo = "bg-blue-600";
        break;

        case "FINALIZADO":
        fondo = "bg-green-600";
        break;
    }

    return (
        <View
        className={`${fondo} px-3 py-1 rounded-full self-start`}
        >
        <Text className="text-white font-bold text-xs">
            {estado}
        </Text>
        </View>
    );
}