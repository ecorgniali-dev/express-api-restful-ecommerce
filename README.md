# API RESTful Ecommerce

- [Visi贸n general](#visi贸n-general)
- [1. 馃殌 Para comenzar](#1--para-comenzar)
  - [1.1 Requisitos previos](#11-requisitos-previos)
  - [1.2 Ejecutar de forma local](#12-ejecutar-de-forma-local)
- [2. 馃攼 Autenticaci贸n](#2--autenticaci贸n)
- [3. 馃搫 Documentaci贸n](#3--documentaci贸n-de-la-api)
- [4. 馃懇鈥嶐煉? Tecnolog铆as usadas](#4--tecnolog铆as-usadas)

## Visi贸n general

API REST de comercio electr贸nico desarrollada con Node.js y Express.js. Entre
sus funcionalidades principales se encuentran las siguientes:

1. Authentication
   - Registro y Login mediante Passport Local y JWT (json web tokens).
2. CRUD de productos, carrito de compras y ordenes de compras.
3. Generaci贸n de orden de compra temporal (carrito).
4. Generaci贸n de pedido (orden de compra definitiva).
5. Visualizaci贸n de historial de ordenes generadas.
6. Envio de alertas de email a una casilla configurable con detalle de orden de
   compra generada (nodemailer/gmail).
7. La capa de persistencia de datos implementa un "DAOFactory" que permite
   cambiar de forma dinamica entre varias persistencias configurables desde
   variables entorno.
   - Para desarrollo:
     - memory
     - fileSystem
   - Para producci贸n:
     - mongoDB (local o mongo atlas)
     - mySql
8. Canal de chat basado en websockets

## 1. 馃殌 Para comenzar

### 1.1 Requisitos previos

Antes de comenzar, aseg煤rese de tener instalado lo siguiente en su m谩quina
local:

- [NodeJS](https://nodejs.org/en/download/) (v14.17.4 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (en caso de usar
  persistencia mongoDB local)
- [WampServer (Apache, MySql)](https://www.wampserver.com/en/) (en caso de usar
  persistencia mySql)

### 1.2 Ejecutar de forma local

- Clonar repositorio

  ```
  git clone https://github.com/ecorgniali-dev/express-api-restful-ecommerce.git
  ```

- Generar un archivo duplicado de `development.env.example` y
  `production.env.example`, renombrarlos a `development.env` y `production.env`
  respectivamente, y luego configure en cada uno todas las variables de entorno
  necesarias para ejecutar la API tanto en modo `development` como `production`.
- Instale todas las dependencias ejecutando `npm i` o `npm install` en su
  terminal.
- En caso de usar mySql como persistencia asegurese de tener previamente creada
  la DB a utilizar y el servidor mySql corriendo (WampServer).
- El servidor Express puede ser ejecutado mediante tres scripts disponibles:
  - `npm run dev` levanta el servidor en modo desarrollo con las variables de
    entorno definidas en el archivo `development.env`
  - `npm run prod` levanta el servidor en modo producci贸n con las variables de
    entorno definidas en el archivo `production.env`
  - `npm start` levanta el servidor por defecto en modo producci贸n (idem
    `npm run prod`)

## 2. 馃攼 Autenticaci贸n

Para los endpoints de la API protegidos se requiere autenticaci贸n mediante el
token de acceso. Para obtener su token de acceso, en primer lugar debe registrar
un nuevo usuario en la ruta `/auth/signup` mediante una solicitud de tipo `POST`
como la siguiente:

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

una vez registrado el usuario podra iniciar sesi贸n en la ruta `/auth/login` con
sus credenciales y recibira como respuesta el token de acceso

**Ejemplo de respuesta accessToken:**

```
{
  "accessToken": "......"
}
```

el token obtenido debe ser utilizado en el encabezado de cada petici贸n realizada
al servidor de la siguiente manera:

```
headers: {
  'Authorization': "<valor del token>"
}
```

## 3. 馃搫 Documentaci贸n de la API

API Documentada mediante **swagger-jsdoc** y **swagger-ui-express**. A traves de
la ruta `/api-docs` de la aplicaci贸n se puede acceder a:

1. Endpoints disponibles (`/auth`, `/productos`, `/carrito`, `/ordenes`) y
   operaciones de cada endpoint (`get`, `post`, `put`, `delete`).
2. Ver que par谩metros de operaci贸n (entrada y salida de datos) estan diponibles
   para cada operaci贸n.
3. M茅todo de autenticaci贸n (JWT) para probar y testear cada endpoint desde
   **swagger-ui-express**.

## 4. 馃懇鈥嶐煉? Tecnolog铆as usadas

- Desarrollo BackEnd y servidor:
  - Node.js v14.17.4
  - Express
- Autenticaci贸n:
  - Passport JWT
  - Bcrypt (encriptaci贸n password)
- Manejo de DB
  - knex (mySql)
  - Mongoose (MongoDB)
- Desarrollo FrontEnd
  - Javascript
  - HTML5
  - CSS3
  - Bootstrap
- Documentaci贸n
  - swagger-jsdoc
  - swagger-ui-express
- Extras
  - Loggers (log4js)
  - Websocket (canal de chat con socket.io)
  - Nodemailer (envio de avisos email)
  - Ejs (motor de plantillas para vista de chat)
