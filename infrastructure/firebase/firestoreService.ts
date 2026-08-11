import { addDoc, collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
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

export const eliminarSolicitudFirestore = async (cliente: string, telefono: string) => {
  try {
    const q = query(
        collection(dbFirestore, NOMBRE_COLECCION),
        where("cliente", "==", cliente),
        where("telefono", "==", telefono)
    );

    const querySnapshot = await getDocs(q);

    for (const documento of querySnapshot.docs) {
        await deleteDoc(documento.ref);
    }
    
    console.log("Eliminado de Firestore correctamente");
  } catch (error) {
    console.error("Error al eliminar de Firestore:", error);
  }
};

export const actualizarSolicitudFirestore = async (cliente: string, telefono: string, nuevosDatos: any) => {
    try {
      const q = query(
          collection(dbFirestore, NOMBRE_COLECCION),
          where("cliente", "==", cliente),
          where("telefono", "==", telefono)
      );
  
      const querySnapshot = await getDocs(q);
      
      for (const documento of querySnapshot.docs) {
          await updateDoc(documento.ref, nuevosDatos);
      }
      
      console.log("Actualizado en Firestore correctamente");
    } catch (error) {
      console.error("Error al actualizar en Firestore:", error);
    }
  };