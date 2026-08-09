# 📺 Cable TV - App de Gestión de Solicitudes Técnicas

Aplicación móvil desarrollada para optimizar la gestión de solicitudes de servicio técnico en campo (instalaciones, mantenimiento, cortes y reconexiones) de la empresa Cable TV. Permite a los técnicos administrar órdenes de trabajo de manera eficiente, segura y con persistencia de datos local estructurada.

## ✨ Características Principales

*   **🔐 Autenticación Segura:** Sistema de login y registro de operadores con persistencia local. Validación rigurosa de contraseñas y sanitización de inputs.
*   **📊 Dashboard Reactivo:** Panel de control con métricas (KPIs) en tiempo real calculadas mediante memoización (`useMemo`), además de filtros interactivos por estado.
*   **📝 Gestión de Solicitudes (CRUD):** Creación, lectura y actualización de tickets de servicio técnico (incluyendo cálculo de cantidades y precios).
*   **💾 Persistencia Relacional:** Migración exitosa a **SQLite** para un almacenamiento local robusto, estructurado y rápido, evitando la pérdida de información.
*   **🌐 Consumo de API REST:** Integración asíncrona con servicios externos (`fetch`) para la visualización del catálogo de equipos en tiempo real.
*   **👤 Perfil de Operador:** Vista dedicada para el monitoreo del estado de la sesión, la base de datos local y la información del técnico.
*   **🛡️ Prevención de Colisiones:** Algoritmo que evita el registro de solicitudes duplicadas para un mismo número telefónico.

## 🛠️ Tecnologías Utilizadas

*   **Framework:** React Native + Expo Router (File-based routing)
*   **Lenguaje:** TypeScript
*   **Arquitectura:** Clean Architecture (Domain, Infrastructure, Presentation)
*   **Almacenamiento:** SQLite (`expo-sqlite`)
*   **Estado Global:** Context API + Reducers + Custom Hooks (`useSolicitudes`)
*   **Estilos:** Tailwind CSS (vía NativeWind v4) / Componentes funcionales desacoplados

## 📂 Estructura del Proyecto

El código está organizado siguiendo los principios de **Arquitectura Limpia**, separando las responsabilidades de la aplicación:

```text
📦 app-movil
 ┣ 📂 app               # Vistas principales y enrutamiento (Expo Router)
 ┣ 📂 domain            # Lógica de negocio y modelos de datos (Interfaces TypeScript)
 ┣ 📂 infrastructure    # Capa de datos y persistencia (Gestor SQLite y consultas SQL)
 ┣ 📂 presentation      # Capa visual: Componentes UI, Context API y Custom Hooks
 ┣ 📜 global.css        # Motor de estilos globales de Tailwind CSS
 ┣ 📜 metro.config.js   # Configuración de empaquetador para NativeWind y WebAssembly
 ┗ 📜 README.md


🚀 Instalación y Ejecución Local

Para correr este proyecto en tu entorno local, asegúrate de tener instalado Node.js y la aplicación de Expo Go en tu dispositivo móvil.

Clonar el repositorio:

git clone https://github.com/Eromar31/app-movil
cd app-movil


Instalar las dependencias:

npm install


Iniciar el servidor de Expo:

npx expo start


Probar la aplicación:

Escanea el código QR que aparece en la terminal con la cámara de tu iPhone o con la app de Expo Go en Android.

Credenciales de prueba (Admin):

Usuario: admin

Contraseña: 1234

👥 Equipo de Desarrollo (Grupo 8)

👨‍💻 Erick - Arquitectura, Reducción de Estado Global y Pruebas de Software.

👨‍💻 Jhonny - Seguridad, Persistencia de Datos y Componentes Visuales.


Proyecto Final - Curso: Desarrollo de Aplicaciones Móviles
Universidad Nacional de Ingeniería (UNI) - Facultad de Ingeniería de Sistemas (2026)
