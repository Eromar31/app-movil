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

import {
    actualizarSolicitudFirestore,
    eliminarSolicitudFirestore,
    guardarSolicitudFirestore
} from "../../infrastructure/firebase/firestoreService";

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
        initDB();
        
        const cargarDatos = () => {
            const datosGuardados = obtenerSolicitudesDB();
            dispatch({
                type: "CARGAR_SOLICITUDES",
                payload: datosGuardados,
            });
        };
        
        cargarDatos();
    }, []);

    async function agregarSolicitud(solicitud: Solicitud) {
 
        const idGenerado = guardarSolicitudDB(solicitud);
        
        if (idGenerado) {
            const nuevaSolicitud = { ...solicitud, id: idGenerado as number };

            await guardarSolicitudFirestore(solicitud);

            dispatch({
                type: "AGREGAR_SOLICITUD",
                payload: nuevaSolicitud,
            });
        }
    }

    async function actualizarSolicitud(solicitud: Solicitud) {
        
        const solicitudAntigua = solicitudes.find((s) => s.id === solicitud.id);
        
        if (solicitudAntigua) {
        
            actualizarSolicitudDB(solicitud);

            await actualizarSolicitudFirestore(
                solicitudAntigua.cliente, 
                solicitudAntigua.telefono, 
                solicitud
            );

            dispatch({
                type: "ACTUALIZAR_SOLICITUD",
                payload: solicitud,
            }); 
        }
    }

    async function eliminarSolicitud(id: number) {
        const solicitud = solicitudes.find((s) => s.id === id);
        
        if (solicitud) {

            eliminarSolicitudDB(id); 
            
            await eliminarSolicitudFirestore(solicitud.cliente, solicitud.telefono);

            dispatch({
                type: "ELIMINAR_SOLICITUD",
                payload: id,
            }); 
        }
    }

    async function cambiarEstado(id: number, estado: string) {
        const solicitud = solicitudes.find((s) => s.id === id);
        
        if (solicitud) {
            const solicitudActualizada = { ...solicitud, estado };
            
            actualizarSolicitudDB(solicitudActualizada); 
            
            await actualizarSolicitudFirestore(solicitud.cliente, solicitud.telefono, { estado });

            dispatch({
                type: "CAMBIAR_ESTADO",
                payload: { id, estado },
            }); 
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