import {
    createContext,
    ReactNode,
    useEffect,
    useReducer,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Solicitud } from "../models/Solicitud";
import { solicitudReducer } from "./SolicitudReducer";

const STORAGE_KEY = "@tv_conectando_solicitudes";

interface SolicitudContextType {
    solicitudes: Solicitud[];
    agregarSolicitud: (solicitud: Solicitud) => void;
    actualizarSolicitud: (solicitud: Solicitud) => void;
    eliminarSolicitud: (id: number) => void;
    cambiarEstado: (id: number, estado: string) => void;
}

interface ProviderProps {
    children: ReactNode;
}

export const SolicitudContext =
    createContext<SolicitudContextType>(
        {} as SolicitudContextType
    );

export function SolicitudProvider({
    children,
}: ProviderProps) {

    const [solicitudes, dispatch] = useReducer(
        solicitudReducer,
        []
    );

    useEffect(() => {

        async function cargarSolicitudes() {

            try {

                const datosGuardados =
                    await AsyncStorage.getItem(STORAGE_KEY);
                if (datosGuardados) {
                    dispatch({
                        type: "CARGAR_SOLICITUDES",
                        payload: JSON.parse(datosGuardados),
                    });
                    return;
                }
                const solicitudesIniciales: Solicitud[] = [
                    {
                        id: 1,
                        cliente: "Juan Pérez",
                        telefono: "999888777",
                        direccion: "Los Olivos",
                        tipoServicio: "INSTALACIÓN",
                        prioridad: "ALTA",
                        descripcion: "Cliente nuevo solicita instalación.",
                        estado: "PENDIENTE",
                        tecnicoAsignado: "Carlos Gómez",
                        fechaRegistro: "05/07/2026",
                    },
                    {
                        id: 2,
                        cliente: "María López",
                        telefono: "987654321",
                        direccion: "Comas",
                        tipoServicio: "SIN SEÑAL",
                        prioridad: "MEDIA",
                        descripcion: "El televisor muestra pantalla negra.",
                        estado: "EN_ATENCION",
                        tecnicoAsignado: "Luis Ramos",
                        fechaRegistro: "04/07/2026",
                    },
                    {
                        id: 3,
                        cliente: "Pedro Díaz",
                        telefono: "912345678",
                        direccion: "Puente Piedra",
                        tipoServicio: "REPARACIÓN",
                        prioridad: "ALTA",
                        descripcion: "Cable dañado por el viento.",
                        estado: "FINALIZADO",
                        tecnicoAsignado: "José Ruiz",
                        fechaRegistro: "03/07/2026",
                    },
                ];
                dispatch({
                    type: "CARGAR_SOLICITUDES",
                    payload: solicitudesIniciales,
                });
            } catch (error) {
                console.log("Error al cargar:", error);
            }
        }
        cargarSolicitudes();
    }, []);
    // ===========================
    // GUARDAR AUTOMÁTICAMENTE
    // ===========================
    useEffect(() => {
        async function guardarSolicitudes() {
            try {
                await AsyncStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(solicitudes)
                );
            } catch (error) {
                console.log("Error al guardar:", error);
            }
        }
        if (solicitudes.length > 0) {
            guardarSolicitudes();
        }
    }, [solicitudes]);
    // ===========================
    // ACCIONES
    // ===========================
    function agregarSolicitud(solicitud: Solicitud) {
        dispatch({
            type: "AGREGAR_SOLICITUD",
            payload: solicitud,
        });
    }
    function actualizarSolicitud(solicitud: Solicitud) {
        dispatch({
            type: "ACTUALIZAR_SOLICITUD",
            payload: solicitud,
        });
    }
    function eliminarSolicitud(id: number) {
        dispatch({
            type: "ELIMINAR_SOLICITUD",
            payload: id,
        });
    }
    function cambiarEstado(
        id: number,
        estado: string
    ) {
        dispatch({
            type: "CAMBIAR_ESTADO",
            payload: {
                id,
                estado,
            },
        });
    }
    return (
        <SolicitudContext.Provider
            value={{
                solicitudes,
                agregarSolicitud,
                actualizarSolicitud,
                eliminarSolicitud,
                cambiarEstado,
            }}
        >
            {children}
        </SolicitudContext.Provider>
    );

}