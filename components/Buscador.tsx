import { View, TextInput } from "react-native";

interface Props {

    valor: string;
    cambiarTexto: (texto: string) => void;

}

export default function Buscador({

    valor,
    cambiarTexto,
    }: Props) {
    return (
        <View className="mb-4">
        <TextInput
            placeholder="🔍 Buscar cliente..."
            value={valor}
            onChangeText={cambiarTexto}
            className="bg-white border border-gray-300 rounded-xl p-3"
        />
        </View>
    );
}