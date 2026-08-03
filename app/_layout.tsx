import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "../global.css";
import { SolicitudProvider } from "../presentation/context/SolicitudContext";

export default function RootLayout() {
  return (
    <SolicitudProvider>
      {/* Configuración global de la barra de estado (la hora, batería, señal del celular) */}
      <StatusBar style="light" backgroundColor="#1e3a8a" />

      {}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#1e3a8a", 
          },
          headerTintColor: "#ffffff", 
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center", 
          animation: "slide_from_right", 
        }}
      >
        {}
        <Stack.Screen
          name="index"
          options={{
            headerShown: false, 
          }}
        />

        {}
        <Stack.Screen
          name="home"
          options={{
            headerShown: false, 
          }}
        />

        {}
        <Stack.Screen
          name="registro"
          options={{
            title: "Nueva Solicitud",
            presentation: "modal", 
          }}
        />

        {}
        <Stack.Screen
          name="detalle"
          options={{
            title: "Detalles del Servicio",
          }}
        />

        {}
        <Stack.Screen
          name="editar"
          options={{
            title: "Editar Solicitud",
          }}
        />

        {}
        <Stack.Screen
          name="catalogo"
          options={{
            title: "Catálogo de Equipos",
          }}
        />

        {}
        <Stack.Screen
          name="perfil"
          options={{
            title: "Perfil del Técnico",
            presentation: "modal", 
          }}
        />
      </Stack>
    </SolicitudProvider>
  );
}