import "react-native-reanimated";
import "../global.css";

import { Stack } from "expo-router";
import { SolicitudProvider } from "../context/SolicitudContext";

export default function RootLayout() {
  return (
    <SolicitudProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0D47A1",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: "#F5F7FA",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="registrarUsuario"
          options={{
              title: "Crear Cuenta",
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            title: "TV Conectando",
          }}
        />

        <Stack.Screen
          name="registro"
          options={{
            title: "Nueva Solicitud",
          }}
        />

        <Stack.Screen
          name="detalle"
          options={{
            title: "Detalle",
          }}
        />

        <Stack.Screen
          name="editar"
          options={{
            title: "Editar Solicitud",
          }}
        />
      </Stack>
    </SolicitudProvider>
  );
}