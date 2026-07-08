import { useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { router } from "expo-router";


import CustomButton from "../components/custombutton";
import TarjetaSolicitud from "../components/TarjetaSolicitud";
import Buscador from "../components/Buscador";
import FiltroEstados from "../components/FiltroEstados";

import { useSolicitudes } from "../hooks/useSolicitudes";

export default function Home() {

    const { solicitudes } = useSolicitudes();
    const [textoBuscar, setTextoBuscar] = useState("");
    const [estadoSeleccionado, setEstadoSeleccionado] =
        useState("TODOS");
    const solicitudesFiltradas = useMemo(() => {
        return solicitudes.filter((solicitud) => {
            const coincideNombre =
                solicitud.cliente
                    .toLowerCase()
                    .includes(textoBuscar.toLowerCase());
            const coincideEstado =
                estadoSeleccionado === "TODOS"
                    ? true
                    : solicitud.estado === estadoSeleccionado;
            return coincideNombre && coincideEstado;
        });
    }, [textoBuscar, estadoSeleccionado, solicitudes]);

    const totalSolicitudes = solicitudes.length;

    const pendientes = solicitudes.filter(
        (s) => s.estado === "PENDIENTE"
    ).length;

    const enAtencion = solicitudes.filter(
        (s) => s.estado === "EN_ATENCION"
    ).length;

    const finalizadas = solicitudes.filter(
        (s) => s.estado === "FINALIZADO"
    ).length;
    return (
        <View className="flex-1 bg-gray-100">
            <View className="bg-blue-900 pt-12 pb-6 px-5 rounded-b-3xl">
                <Text className="text-white text-3xl font-bold">
                    📺 TV Conectando
                </Text>
                <Text className="text-blue-200 mt-1">
                    Gestión de Solicitudes Técnicas
                </Text>
            </View>
            <View className="flex-1 p-4">
                <View className="flex-row flex-wrap justify-between mb-5">

                    <View className="bg-white rounded-2xl w-[48%] p-4 mb-3 shadow">

                        <Text className="text-gray-500">
                            Total
                        </Text>

                        <Text className="text-3xl font-bold text-blue-700">
                            {totalSolicitudes}
                        </Text>

                    </View>

                    <View className="bg-yellow-100 rounded-2xl w-[48%] p-4 mb-3 shadow">

                        <Text className="text-yellow-800">
                            Pendientes
                        </Text>

                        <Text className="text-3xl font-bold text-yellow-700">
                            {pendientes}
                        </Text>

                    </View>

                    <View className="bg-blue-100 rounded-2xl w-[48%] p-4 shadow">

                        <Text className="text-blue-800">
                            En Atención
                        </Text>

                        <Text className="text-3xl font-bold text-blue-700">
                            {enAtencion}
                        </Text>

                    </View>

                    <View className="bg-green-100 rounded-2xl w-[48%] p-4 shadow">

                        <Text className="text-green-800">
                            Finalizadas
                        </Text>

                        <Text className="text-3xl font-bold text-green-700">
                            {finalizadas}
                        </Text>

                    </View>

                </View>
                <Buscador
                    valor={textoBuscar}
                    cambiarTexto={setTextoBuscar}
                />
                <FiltroEstados
                    estado={estadoSeleccionado}
                    cambiarEstado={setEstadoSeleccionado}
                />
                <FlatList
                    data={solicitudesFiltradas}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <Text className="text-center mt-10 text-gray-500">
                            No se encontraron solicitudes.
                        </Text>
                    }
                    renderItem={({ item }) => (
                        <TarjetaSolicitud
                            solicitud={item}
                            onPress={() =>
                                router.push({
                                    pathname: "/detalle",
                                    params: {
                                        id: item.id.toString(),
                                    },
                                })
                            }
                        />
                    )}
                />
            </View>
            <View className="absolute bottom-8 right-6">
                <CustomButton
                    titulo="+ Nueva"
                    onPress={() => router.push("/registro")}
                />
            </View>
        </View>
    );
}