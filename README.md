# TicoAutos GraphQL

Este es el backend GraphQL de TicoAutos. Se usa para consultar vehiculos, detalles de vehiculos, conversaciones y chats.

Este servicio trabaja junto con el backend REST y usa la misma base de datos MongoDB.

## Tecnologias

- Node.js
- Express
- Apollo Server
- GraphQL
- MongoDB
- Mongoose
- JWT

## Requisitos

Antes de ejecutar este proyecto se necesita:

- Tener instalado Node.js.
- Tener MongoDB encendido.
- Tener configuradas las variables de entorno del proyecto.
- Tener el backend REST funcionando si se quiere probar todo el sistema completo.

## Instalacion

Desde la carpeta del proyecto:

```bash
cd TicoAutos_GraphQL
npm install
```

## Como ejecutarlo

Para iniciar el servidor:

```bash
npm start
```

Para desarrollo con nodemon:

```bash
npm run dev
```

El servidor queda disponible en:

```txt
http://localhost:4000/graphql
```

Desde esa URL se puede abrir Apollo Sandbox para probar las consultas.

## Estructura

```txt
TicoAutos_GraphQL/
├── models/
│   ├── conversation.js
│   ├── question.js
│   ├── user.js
│   └── vehicle.js
├── context.js
├── index.js
├── resolvers.js
├── typeDefs.js
└── package.json
```

## Consultas disponibles

El servicio tiene estas queries principales:

- `vehicles`: obtiene el catalogo de vehiculos con filtros.
- `vehicle(id)`: obtiene el detalle de un vehiculo.
- `conversations`: obtiene las conversaciones del usuario autenticado.
- `conversation(id)`: obtiene una conversacion especifica.
- `vehicleConversation(vehicleId)`: obtiene la conversacion relacionada con un vehiculo.

## Autenticacion

Algunas consultas necesitan que el usuario este autenticado.

El token se envia en el header:

```http
Authorization: Bearer <token>
```

Ese token viene del login del backend REST.

## Uso dentro del proyecto

El frontend usa este servicio para cargar:

- Catalogo de vehiculos.
- Detalle de vehiculos.
- Perfil y vehiculos del usuario.
- Lista de chats.
- Conversaciones e historial.

Si este servicio no esta encendido, esas partes del frontend no van a cargar correctamente.

## Diagrama
<img width="832" height="685" alt="Diagrama Programación drawio" src="https://github.com/user-attachments/assets/26bc2f92-95ae-4e3f-a462-314ad4b4d374" />
