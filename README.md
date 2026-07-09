📺 Cable TV - App de Gestión de Solicitudes Técnicas

Aplicación móvil desarrollada para optimizar la gestión de solicitudes de servicio técnico en campo (instalaciones, mantenimiento, cortes y reconexiones) de la empresa Cable TV. Permite a los técnicos administrar órdenes de trabajo de manera eficiente, segura y con persistencia de datos local.

✨ Características Principales

🔐 Autenticación Segura: Sistema de login y registro de operadores con persistencia local. Validación rigurosa de contraseñas y sanitización de inputs.

📊 Dashboard Reactivo: Panel de control con métricas (KPIs) en tiempo real calculadas mediante memoización (useMemo), además de filtros interactivos por estado.

📝 Gestión de Solicitudes: Creación, lectura y actualización (CRUD) de tickets de servicio técnico.

🛡️ Prevención de Colisiones: Algoritmo que evita el registro de solicitudes duplicadas para un mismo número telefónico.

💾 Persistencia Asíncrona: Uso de AsyncStorage combinado con Context API y useReducer para mantener la información a salvo incluso si la app se cierra.

🛠️ Tecnologías Utilizadas

Framework: React Native + Expo Router (File-based routing)

Lenguaje: TypeScript

Estado Global: Context API + Reducers + Custom Hooks (useSolicitudes)

Almacenamiento: AsyncStorage

Estilos: Tailwind CSS (vía NativeWind) / Componentes funcionales desacoplados

📂 Estructura del Proyecto

📦 app-movil
 ┣ 📂 app                 # Rutas de Expo Router (index, home, registro, detalle)
 ┣ 📂 components          # Componentes visuales reutilizables (Botones, Tarjetas, Chips)
 ┣ 📂 context             # Lógica de estado global (SolicitudContext, SolicitudReducer)
 ┣ 📂 hooks               # Custom hooks (useSolicitudes)
 ┣ 📂 models              # Contratos de tipado TypeScript (Interfaces)
 ┣ 📂 utils               # Diccionarios inmutables y constantes globales
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