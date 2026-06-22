import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Alert,
    } from "react-native";

    import CustomButton from "../components/custombutton";

    export default function Registro() {

    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [tipo, setTipo] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const guardar = () => {

        if (
        !nombre ||
        !telefono ||
        !tipo ||
        !descripcion
        ) {
        Alert.alert(
            "Error",
            "Todos los campos son obligatorios"
        );
        return;
        }

        Alert.alert(
        "Correcto",
        "Solicitud registrada"
        );

        setNombre("");
        setTelefono("");
        setTipo("");
        setDescripcion("");
    };

    return (
        <View className="flex-1 p-5 bg-white">

        <Text className="text-2xl font-bold text-center mb-5">
            Registro de Solicitud
        </Text>

        <TextInput
            placeholder="Nombre del Cliente"
            value={nombre}
            onChangeText={setNombre}
            className="border p-3 rounded-lg mb-3"
        />

        <TextInput
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            className="border p-3 rounded-lg mb-3"
        />

        <TextInput
            placeholder="Tipo de Solicitud"
            value={tipo}
            onChangeText={setTipo}
            className="border p-3 rounded-lg mb-3"
        />

        <TextInput
            placeholder="Descripción"
            multiline
            value={descripcion}
            onChangeText={setDescripcion}
            className="border p-3 rounded-lg mb-3"
        />

        <CustomButton
            titulo="Guardar"
            onPress={guardar}
        />
        </View>
    );
}