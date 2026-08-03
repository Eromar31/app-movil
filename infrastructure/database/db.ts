import * as SQLite from 'expo-sqlite';
import { Solicitud } from '../../domain/models/Solicitud';

const db = SQLite.openDatabaseSync('tvconectando.db');

export const initDB = () => {
  try {
    // Eliminamos la tabla anterior y la creamos con los nuevos campos para evitar conflictos de esquema
    db.execSync(`
      DROP TABLE IF EXISTS solicitudes;
      
      CREATE TABLE IF NOT EXISTS solicitudes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente TEXT NOT NULL,
        telefono TEXT NOT NULL,
        direccion TEXT,
        tipoServicio TEXT NOT NULL,
        prioridad TEXT NOT NULL,
        descripcion TEXT NOT NULL,
        estado TEXT NOT NULL,
        tecnicoAsignado TEXT,
        fechaRegistro TEXT NOT NULL,
        cantidad INTEGER NOT NULL,
        precio REAL NOT NULL
      );
    `);
    console.log("Tabla 'solicitudes' actualizada con cantidad y precio.");
  } catch (error) {
    console.error("Error al inicializar la base de datos", error);
  }
};

export const guardarSolicitudDB = (solicitud: Omit<Solicitud, 'id'>) => {
  try {
    const result = db.runSync(
      `INSERT INTO solicitudes (cliente, telefono, direccion, tipoServicio, prioridad, descripcion, estado, tecnicoAsignado, fechaRegistro, cantidad, precio) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        solicitud.cliente,
        solicitud.telefono,
        solicitud.direccion,
        solicitud.tipoServicio,
        solicitud.prioridad,
        solicitud.descripcion,
        solicitud.estado,
        solicitud.tecnicoAsignado,
        solicitud.fechaRegistro,
        solicitud.cantidad,
        solicitud.precio
      ]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error al guardar solicitud:", error);
    return null;
  }
};

export const obtenerSolicitudesDB = (): Solicitud[] => {
  try {
    const todasLasSolicitudes = db.getAllSync('SELECT * FROM solicitudes ORDER BY id DESC');
    return todasLasSolicitudes as Solicitud[];
  } catch (error) {
    console.error("Error al obtener solicitudes:", error);
    return [];
  }
};

export const actualizarSolicitudDB = (solicitud: Solicitud) => {
  try {
    db.runSync(
      `UPDATE solicitudes 
       SET cliente = ?, telefono = ?, direccion = ?, tipoServicio = ?, prioridad = ?, descripcion = ?, estado = ?, tecnicoAsignado = ?, cantidad = ?, precio = ?
       WHERE id = ?`,
      [
        solicitud.cliente,
        solicitud.telefono,
        solicitud.direccion,
        solicitud.tipoServicio,
        solicitud.prioridad,
        solicitud.descripcion,
        solicitud.estado,
        solicitud.tecnicoAsignado,
        solicitud.cantidad,
        solicitud.precio,
        solicitud.id
      ]
    );
  } catch (error) {
    console.error("Error al actualizar solicitud:", error);
  }
};

export const eliminarSolicitudDB = (id: number) => {
  try {
    db.runSync('DELETE FROM solicitudes WHERE id = ?', [id]);
  } catch (error) {
    console.error("Error al eliminar solicitud:", error);
  }
};