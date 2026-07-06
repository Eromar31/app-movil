import { Solicitud } from "../models/Solicitud";

export type SolicitudAction =
    | {
        type: "AGREGAR_SOLICITUD";
        payload: Solicitud;
      }
    | {
        type: "ACTUALIZAR_SOLICITUD";
        payload: Solicitud;
      }
    | {
        type: "ELIMINAR_SOLICITUD";
        payload: number;
      }
    | {
        type: "CAMBIAR_ESTADO";
        payload: {
            id: number;
            estado: string;
        };
      }
    | {
        type: "CARGAR_SOLICITUDES";
        payload: Solicitud[];
      };

export function solicitudReducer(
    state: Solicitud[],
    action: SolicitudAction
): Solicitud[] {

    switch (action.type) {

        case "CARGAR_SOLICITUDES":
            return action.payload;

        case "AGREGAR_SOLICITUD":
            return [...state, action.payload];

        case "ACTUALIZAR_SOLICITUD":
            return state.map((solicitud) =>
                solicitud.id === action.payload.id
                    ? action.payload
                    : solicitud
            );

        case "ELIMINAR_SOLICITUD":
            return state.filter(
                (solicitud) => solicitud.id !== action.payload
            );

        case "CAMBIAR_ESTADO":
            return state.map((solicitud) =>
                solicitud.id === action.payload.id
                    ? {
                        ...solicitud,
                        estado: action.payload.estado,
                    }
                    : solicitud
            );

        default:
            return state;
    }
}