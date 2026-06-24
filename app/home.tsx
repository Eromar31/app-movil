import { useEffect } from "react";
import { View, Text } from "react-native";
import { router } from "expo-router";
import CustomButton from "../components/custombutton";


export default function home() {
    useEffect(() => {
        console.log("pantalla home cargada");

    },[]);
    return (
        <View className="flex-1 bg-gray-100">
            <View className="bg-blue-900 pt-10 pb-8 px-5 rounded-b-3xl">
                <Text className="text-white text-3xl font-bold">
                    📡 Cable TV
                </Text>

                <Text className="text-blue-200 mt-1">
                    Conectando los pueblos
                </Text>
            </View>

            <View className="flex-1 justify-center items-center p-5">

            <Text className="text-3xl font-bold">
                Solicitudes
            </Text>

            <Text className="mt-4 text-lg">
                Bienvenido a TV conectando los pueblos
            </Text>

            <CustomButton
                titulo="Registrar Solicitud"
                onPress={() => router.push("/registro")}
            />
            
            </View>
        </View>
    );
}