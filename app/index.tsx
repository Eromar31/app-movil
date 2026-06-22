import { View, Text, TextInput, Alert } from 'react-native';
import {useState} from 'react';
import { router } from "expo-router";
import CustomButton from "../components/custombutton";

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const ingresar = () => {
        if (!usuario || !password){
            Alert.alert(
                "Error",
                "Todos los campos son obligatorios"
            );
            return;
        }

        if (usuario === "admin" &&
            password==="1234"
        ) {
            router.push("/home");
        } else { 
            Alert.alert(
                "Error",
                "Todos los campos son obligatorios"
            );
        }
    };

    return (
        <View className="flex-1 justify-center p-6 bg-white">

        <Text className="text-3xl font-bold text-center mb-8">
            Cable tv conectando
        </Text>

        <TextInput
            placeholder="Usuario"
            value={usuario}
            onChangeText={setUsuario}
            className="border p-3 rounded-lg mb-3"
        />

        <TextInput
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="border p-3 rounded-lg"
        />

        <CustomButton
            titulo="Ingresar"
            onPress={ingresar}
        />
        </View>
  );
}