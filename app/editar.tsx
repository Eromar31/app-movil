import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Alert,
    TouchableOpacity,
} from "react-native";

import { Stack, router, useLocalSearchParams } from "expo-router";
import CustomButton from "../components/custombutton";
import { useSolicitudes } from "../hooks/useSolicitudes";
import { Picker } from "@react-native-picker/picker";

const tiposServicio = [
    "Instalación Plan Básico",
    "Instalación Plan Familiar",
    "Instalación Plan Premium",
    "Cambio de Domicilio",
    "Sin Señal",
    "Reparación",
];

const prioridades = [
    "BAJA",
    "MEDIA",
    "ALTA",
];

const tecnicos = [
    "Carlos Gómez",
    "Luis Ramos",
    "José Ruiz",
    "Miguel Torres",
    "Ana Flores",
];

export default function Editar() {

    const { id } = useLocalSearchParams();

    const {
        solicitudes,
        actualizarSolicitud,
    } = useSolicitudes();

    const solicitud = solicitudes.find(
        s => s.id === Number(id)
    );

    if (!solicitud) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Solicitud no encontrada.</Text>
            </View>
        );
    }

    const solicitudActual = solicitud;

    const [cliente, setCliente] = useState(solicitudActual.cliente);
    const [telefono, setTelefono] = useState(solicitudActual.telefono);
    const [direccion, setDireccion] = useState(solicitudActual.direccion);
    const [tipoServicio, setTipoServicio] = useState(solicitudActual.tipoServicio);
    const [prioridad, setPrioridad] = useState(solicitudActual.prioridad);
    const [tecnicoAsignado, setTecnicoAsignado] = useState(
    solicitudActual.tecnicoAsignado);
    const [descripcion, setDescripcion] = useState(solicitudActual.descripcion);


    function guardarCambios() {

        if (!cliente.trim()) {
            Alert.alert("Error", "Ingrese el nombre del cliente.");
            return;
        }

        if (telefono.length !== 9) {
            Alert.alert("Error", "El teléfono debe tener 9 dígitos.");
            return;
        }

        if (!descripcion.trim()) {
            Alert.alert("Error", "Ingrese una descripción.");
            return;
        }

        actualizarSolicitud({

            ...solicitudActual,
            cliente,
            telefono,
            direccion,
            tipoServicio,
            prioridad,
            tecnicoAsignado,
            descripcion,
        });

        Alert.alert(
            "Solicitud actualizada",
            "Los cambios fueron guardados correctamente."
        );

        router.replace("/home");

    }

    return (
    

        <ScrollView className="flex-1 bg-gray-100">

            <View className="p-5">

                <TouchableOpacity
                    onPress={() => router.replace("/home")}
                    className="mb-5"
                >

                    <Text className="text-blue-700 font-bold text-lg">

                        🏠 Inicio

                    </Text>

                </TouchableOpacity>

                <Text className="text-3xl font-bold text-blue-900 mb-6">
                    Editar Solicitud
                </Text>

                <Text className="font-bold">Cliente</Text>
                <TextInput
                    value={cliente}
                    onChangeText={(texto) =>
                        setCliente(
                            texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "")
                        )
                    }
                    className="bg-white rounded-xl p-3 mt-2 mb-4"
                />
                <Text className="font-bold">Teléfono</Text>
                <TextInput
                    value={telefono}
                    onChangeText={(texto) =>
                        setTelefono(texto.replace(/[^0-9]/g, ""))
                    }
                    keyboardType="numeric"
                    maxLength={9}
                    className="bg-white rounded-xl p-3 mt-2 mb-4"
                />

                <Text className="font-bold">Dirección</Text>

                <TextInput
                    value={direccion}
                    onChangeText={setDireccion}
                    className="bg-white rounded-xl p-3 mt-2 mb-4"
                />

                <Text className="font-bold">
                    Tipo de Servicio
                </Text>

                <View className="bg-white rounded-xl border border-gray-300 mb-4 mt-2">

                    <Picker
                        selectedValue={tipoServicio}
                        onValueChange={setTipoServicio}
                    >
                        {tiposServicio.map((item) => (

                            <Picker.Item
                                key={item}
                                label={item}
                                value={item}
                            />

                        ))}
                    </Picker>

                </View>

                <Text className="font-bold">
                    Prioridad
                </Text>

                <View className="bg-white rounded-xl border border-gray-300 mb-4 mt-2">

                    <Picker
                        selectedValue={prioridad}
                        onValueChange={setPrioridad}
                    >
                        {prioridades.map((item) => (

                            <Picker.Item
                                key={item}
                                label={item}
                                value={item}
                            />

                        ))}
                    </Picker>

                </View>

                <Text className="font-bold">
                    Técnico Asignado
                </Text>

                <View className="bg-white rounded-xl border border-gray-300 mb-4 mt-2">

                    <Picker
                        selectedValue={tecnicoAsignado}
                        onValueChange={setTecnicoAsignado}
                    >
                        {tecnicos.map((item) => (

                            <Picker.Item
                                key={item}
                                label={item}
                                value={item}
                            />

                        ))}
                    </Picker>

                </View>

                <Text className="font-bold">Descripción</Text>

                <TextInput
                    multiline
                    value={descripcion}
                    onChangeText={setDescripcion}
                    className="bg-white rounded-xl p-3 mt-2 h-28 mb-8"
                />

                <CustomButton
                    titulo="Guardar Cambios"
                    onPress={guardarCambios}
                />

            </View>

        </ScrollView>

    );

}