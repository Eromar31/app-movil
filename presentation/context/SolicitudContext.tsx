import { createContext, ReactNode, useEffect, useReducer } from "react";
import { Solicitud } from "../../domain/models/Solicitud";
import {
    actualizarSolicitudDB,
    eliminarSolicitudDB,
    guardarSolicitudDB,
    initDB,
    obtenerSolicitudesDB,
} from "../../infrastructure/database/db";
import { solicitudReducer } from "./SolicitudReducer";

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

export const SolicitudContext = createContext<SolicitudContextType>(
    {} as SolicitudContextType
);

export function SolicitudProvider({ children }: ProviderProps) {
    const [solicitudes, dispatch] = useReducer(solicitudReducer, []);

    useEffect(() => {
        // 1. Inicializamos la base de datos (crea la tabla si no existe)
        initDB();
        
        // 2. Consultamos SQLite y cargamos los datos en la interfaz
        const cargarDatos = () => {
            const datosGuardados = obtenerSolicitudesDB();
            dispatch({
                type: "CARGAR_SOLICITUDES",
                payload: datosGuardados,
            });
        };
        
        cargarDatos();
    }, []);

    // ===========================
    // ACCIONES CONECTADAS A SQLITE
    // ===========================

    function agregarSolicitud(solicitud: Solicitud) {
        // Guardamos en la BD. Ignoramos el ID de la interfaz y usamos el AUTOINCREMENT de SQLite
        const idGenerado = guardarSolicitudDB(solicitud);
        
        if (idGenerado) {
            const nuevaSolicitud = { ...solicitud, id: idGenerado as number };
            dispatch({
                type: "AGREGAR_SOLICITUD",
                payload: nuevaSolicitud,
            });
        }
    }

    function actualizarSolicitud(solicitud: Solicitud) {
        actualizarSolicitudDB(solicitud); // Persiste en BD
        dispatch({
            type: "ACTUALIZAR_SOLICITUD",
            payload: solicitud,
        }); // Refleja en pantalla
    }

    function eliminarSolicitud(id: number) {
        eliminarSolicitudDB(id); // Borra de BD
        dispatch({
            type: "ELIMINAR_SOLICITUD",
            payload: id,
        }); // Quita de pantalla
    }

    function cambiarEstado(id: number, estado: string) {
        const solicitud = solicitudes.find((s) => s.id === id);
        if (solicitud) {
            const solicitudActualizada = { ...solicitud, estado };
            actualizarSolicitudDB(solicitudActualizada); // Actualiza en BD
            dispatch({
                type: "CAMBIAR_ESTADO",
                payload: { id, estado },
            }); // Refleja en pantalla
        }
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