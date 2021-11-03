# API RESTful Ecommerce

## Visión general

API REST de comercio electrónico desarrollada con Node.js y Express.js. Entre sus funcionalidades principales se encuentran las siguientes:

1. Authentication
   - Registro y Login mediante Passport Local y JWT (json web tokens).
2. CRUD de productos, carrito de compras y ordenes de compras.
3. Generación de orden de compra temporal (carrito).
4. Generación de pedido (orden de compra definitiva).
5. Visualización de historial de ordenes generadas.
6. Envio de alertas de email a una casilla configurable con detalle de orden de compra generada (nodemailer/gmail).
7. La capa de persistencia de datos implementa un "DAOFactory" que permite cambiar de forma dinamica entre varias persistencias configurables desde variables entorno.
   - Para desarrollo:
     - memory
     - fileSystem
   - Para producción:
     - mongoDB (local o mongo atlas)
     - mySql
8. Canal de chat basado en websockets

---

## Indice
- [Visión general](#vision-general)
- [1. 🚀 Para comenzar](#1-para-comenzar)
  - [1.1 Requisitos previos](#11-requisitos-previos)
  - [1.2 Ejecutar de forma local](#12-ejecutar-de-forma-local)
- [2. 🔐 Authentication](#2-lock-authentication)
- [3. 📄 Documentación](#3-documentacion-de-la-api)
- [4. 👩‍💻 Tecnologías usadas](#4-tecnologias-usadas)

---

## 1. 🚀 Para comenzar

### 1.1 Requisitos previos

Antes de comenzar, asegúrese de tener instalado lo siguiente instalado en su máquina local:

- [NodeJS](https://nodejs.org/en/download/) (v14.17.4 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (en caso de usar persistencia mongoDB local)
- [WampServer (Apache, MySql)](https://www.wampserver.com/en/) (en caso de usar persistencia mySql)

### 1.2 Ejecutar de forma local

- Clonar repositorio

  ```
  https://github.com/ecorgniali-dev/proyecto-final-coder.git
  ```

- Generar un archivo duplicado de `development.env.example` y `production.env.example`, renombrarlos a `development.env` y `production.env` respectivamente, y luego configure en cada uno todas las variables de entorno necesarias para ejecutar la API tanto en modo `development` como `production`.
- Instale todas las dependencias ejecutando `npm i` o `npm install` en su terminal.
- En caso de usar mySql como persistencia asegurese de tener previamente creada la DB a utilizar.
- El servidor Express puede ser levantado mediante tres scripts disponibles:
  - `npm run dev` levanta el servidor en modo desarrollo con las variables de entorno definidas en el archivo `development.env`
  - `npm run prod` levanta el servidor en modo producción con las variables de entorno definidas en el archivo `production.env`
  - `npm start` levanta el servidor por defecto en modo producción (idem `npm run prod`)


## 2. 🔐 Autenticación

Para los endpoints de la API protegidos se requiere autenticación mediante el token de acceso. Para obtener su token de acceso, en primer lugar debe registrar un nuevo usuario en la ruta `/auth/signup` mediante una solicitud de tipo `POST` como la siguiente: 

**Ejemplo de solicitud de registro:**

```
{
  "username": "username@correo.com",
  "password": "mypassword",
  "nombre": "Juan Perez",
  "direccion": "Av. Siempre Viva 742",
  "edad": 25,
  "telefono": "+5400000000000",
  "foto": "http://imagefaker.com"
}
```

una vez registrado el usuario podra iniciar sesión en la ruta `/auth/login` con sus credenciales y recibira como respuesta el token de acceso

**Ejemplo de respuesta accessToken:**

```
{
  "accessToken": "......"
}
```

## 3. 📄 Documentación de la API

API Documentada mediante **swagger-jsdoc** y **swagger-ui-express**. A traves de la ruta `/api-docs` de la aplicación se puede acceder a:
1. Endpoints disponibles (`/auth`, `/productos`, `/carrito`, `/ordenes`) y operaciones de cada endpoint (`get`, `post`, `put`, `delete`).
2. Ver que parámetros de operación (entrada y salida de datos) estan diponibles para cada operación.
3. Método de autenticación (JWT) para probar y testear cada endpoint desde **swagger-ui-express**.

## 4. 👩‍💻 Tecnologías usadas

- Desarrollo BackEnd y servidor:
  - Node.js v14.17.4
  - Express
- Autenticación:
  - Passport JWT
  - Bcrypt (encriptación password)
- Manejo de DB
  - knex (mySql)
  - Mongoose (MongoDB)
- Desarrollo FrontEnd
  - Javascript
  - HTML5
  - CSS3
  - Bootstrap
- Documentación
  - swagger-jsdoc
  - swagger-ui-express
- Extras
  - Loggers (log4js)
  - Websocket (canal de chat con socket.io)
  - Nodemailer (envio de avisos email)
  - Ejs (motor de plantillas para vista de chat)