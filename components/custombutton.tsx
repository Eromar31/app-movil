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
        
        className="bg-blue-600 py-4 px-6 rounded-xl mt-3 active:bg-blue-800 shadow-sm flex-row justify-center items-center"
        activeOpacity={0.8}
        onPress={onPress}
        >
            <Text className="text-white text-center font-bold text-base tracking-wide">
                {titulo}
            </Text>
        </TouchableOpacity>
    )
}

