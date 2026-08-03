import { useContext } from "react";
import { SolicitudContext } from "../context/SolicitudContext";

export function useSolicitudes() {
    return useContext(SolicitudContext);
}