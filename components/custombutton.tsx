import { TouchableOpacity, Text } from "react-native";

interface props{
    titulo: string;
    onPress: () => void;

}


export default function customButton({
    titulo,
    onPress,
}:props){
    return (
        <TouchableOpacity
        className="bg-blue-950 p-4 rounded-lg mt-3"
        onPress={onPress}
        >
            <Text className="text-white text-center font-bold">
                {titulo}
            </Text>
        </TouchableOpacity>
    )
}

