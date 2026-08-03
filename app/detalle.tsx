import { router, useLocalSearchParams } from "expo-router";
import { Alert, Text, View } from "react-native";

import ChipEstado from "../presentation/components/ChipEstado";
import CustomButton from "../presentation/components/custombutton";

import { useSolicitudes } from "../presentation/hooks/useSolicitudes";

export default function Detalle() {

    const { id } = useLocalSearchParams();

    const {
        solicitudes,
        eliminarSolicitud,
    } = useSolicitudes();

    const solicitud = solicitudes.find(
        (s) => s.id === Number(id)
    );

    if (!solicitud) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Solicitud no encontrada.</Text>
            </View>
        );
    }

    // TypeScript ya sabe que existe
    const solicitudActual = solicitud;

    function eliminar() {

        Alert.alert(
            "Eliminar",
            `¿Desea eliminar la solicitud de ${solicitudActual.cliente}?`,
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: () => {

                        eliminarSolicitud(solicitudActual.id);

                        router.replace("/home");

                    },
                },
            ]
        );

    }

    return (

        <View className="flex-1 bg-gray-100 p-5">

            <View className="bg-white rounded-3xl p-5 shadow">

                <View className="items-center mb-5">

                    <Text className="text-3xl font-bold text-blue-900">
                        📺 {solicitudActual.cliente}
                    </Text>

                    <ChipEstado estado={solicitudActual.estado} />

                </View>

                <Text className="text-lg mb-2">
                    📞 {solicitudActual.telefono}
                </Text>

                <Text className="text-lg mb-2">
                    📍 {solicitudActual.direccion}
                </Text>

                <Text className="text-lg mb-2">
                    📡 {solicitudActual.tipoServicio}
                </Text>

                <Text className="text-lg mb-2">
                    👨‍🔧 {solicitudActual.tecnicoAsignado}
                </Text>

                <Text className="text-lg mb-2">
                    🔥 Prioridad: {solicitudActual.prioridad}
                </Text>

                <Text className="text-lg mb-2">
                    📝 {solicitudActual.descripcion}
                </Text>

                <Text className="text-lg">
                    📅 {solicitudActual.fechaRegistro}
                </Text>

            </View>

            <View className="mt-8">

                <CustomButton
                    titulo="✏️ Editar"
                    onPress={() =>
                        router.push({
                            pathname: "/editar",
                            params: {
                                id: solicitudActual.id.toString(),
                            },
                        })
                    }
                />

                <View className="mt-4" />

                <CustomButton
                    titulo="🗑 Eliminar"
                    onPress={eliminar}
                />

            </View>

        </View>

    );

}