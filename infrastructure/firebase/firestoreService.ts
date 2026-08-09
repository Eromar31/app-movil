import { addDoc, collection } from "firebase/firestore";
import { Solicitud } from "../../domain/models/Solicitud";
import { auth, dbFirestore } from "./firebaseConfig";


const NOMBRE_COLECCION = "solicitudes";

export const guardarSolicitudFirestore = async (solicitud: Omit<Solicitud, "id">) => {
  try {
    const usuarioActual = auth.currentUser;
    
    const datosConUsuario = {
      ...solicitud,
      usuarioId: usuarioActual ? usuarioActual.uid : "anonimo",
      usuarioEmail: usuarioActual ? usuarioActual.email : "desconocido",
      creadoEn: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(dbFirestore, NOMBRE_COLECCION), datosConUsuario);
    console.log("Solicitud guardada en Firestore con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar en Firestore:", error);
    return null;
  }
};