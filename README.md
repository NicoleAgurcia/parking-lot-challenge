# Parking Lot System Challenge

Sistema de registro de entrada y salida para un parqueo capaz de calcular importes y generar reportes por uso de parqueo.

# Arquitectura

- Token Issuer: Rest API como micro-servicio para autenticar usuarios y autorizar el acceso a recursos. Al autenticar un usuario, el token issuer genera un JSON Web Token. 
- Endpoints: 
    - GET `/users` - Obtener lista de usuarios.
    - POST `/users` {username, password} - Crear usuario.
    - POST `/auth` {username, password} - Ingresar al sistema y generar token de autorizacion.
    - POST `/auth/verify` {} Payload vacio, verificacion de bearer token. eg: `Authorizarion: Bearer eyxxx.xxx1122233z`

- Parking Lot: Rest API para manejar los recursos Vehicles, VehicleType, EventLog, calcular importes y obtener reportes. Todas las peticines a los recursos deben ser autenticadas por el token issuer. 
- En cada peticion se debe incluir un bearer token en el header "Authorization", eg: `Authorizarion: Bearer eyxxx.xxx1122233z`
-Endpoints: 
    - GET `/vehicles`  - Obtener lista de vehiculos.
    - POST `/vehicles`  { plate, typeId } - Crear Vehiculo.
    - POST `/vehicle-types` {description} - Crear tipo de Vehiculo. (Residente, Oficial) por defecto.
    - GET  `/vehicle-types` - Obtener tipos de vehiculos. (Residente, Oficial) por defecto.
    - POST `/event-logs/entry/:plate` - Registrar ingreso de un vehiculo al parqueo por placa.
    - POST `/event-logs/departure/:plate` - Registrar salida de un vehiculo al parqueo por placa.
    - POST `/event-logs/reset` - Reiniciar bitacora de eventos. (Comienza mes).
    - GET  `/event-logs/generateReport/:fileName`  Descarga el reporte de residentes en formato `CSV`.

# Tecnologias
- Runtime: NodeJs
- Lenguaje: Typescript
- Framework [NestJS](https://nestjs.com)
- Base de datos: [MongoDB](https://www.mongodb.com/es)
- Object Data Modeling (ODM) [Mongoose](https://mongoosejs.com)

# Requerimientos del sistema: 
Node 12.18.0v
NPM: 6.5.0v
Mongo: 3.0v

# Instalacion: 

- Correr proceso de MongoDB con los puertos por defecto.
- Clonar repositorio:  https://github.com/NicoleAgurcia/parking-lot-challenge
- Ingresar a la carpeta ruta del proyecto.
- Instalar las dependencias dentro del sub-proyecto auth: 
    - cd auth 
    - npm install
- Instalar las dependencias dentro del sub-proyecto parking-lot:
    - cd parking-lot
    - npm install

# Iniciar Sistema
- Iniciar micro-servicio de autenticacion:
    - cd auth 
    - npm start
- Iniciar API del sistema de parqueo:
    - cd parking-lot
    - npm start
- Al iniciar el sistema por primera vez, la base de datos creara por defecto 2 tipos de vehiculos: Residente y Oficial. Tambien se creara un usuario administrador por defecto (username: admin, pass: hugo123).
- El token issuer (micro-servicio de autenticacion) corre por defecto en el puerto `3000`.
- El parking-lot API corre por defecto en el puerto `4000`.
- Para efectos practicos, un archivo `.env` se ha versionado en cada sub-proyecto con las constantes necesarias para hacer funcionar el sistema.

# Verificacion de casos de uso
##### Ingresar al sistema.

Para verificar los casos de uso, debemos ingresar al sistema generando un token con atraves del `token issuer`. 
`POST` - `http://localhost:3000/auth`  - `body`: { username: 'admin', password: 'hugo123' }

TODOS los endpoints de `parking-lot API` estan protegidos por el micro-servicio `token issuer`. Se debe agregar el header `Authorization` en cada peticion de la siguiente manera: `Authorizarion: Bearer eyxxx.xxx1122233z`

#### Vehiculos con placas de prueba.
Para efectos de prueba, se crearan dos vehiculos de prueba al iniciar el sistema por primera vez.
Placa de vehiculo oficial: `OF-2032`
Placa de vehiculo residente: `RE-2125`

#### Caso de uso "Registra entrada" 

Se valida que la misma placa no pueda entrar otra vez antes de haber salido.

`POST` `http://localhost:4000/event-logs/entry/OF-2032`  -  Ingresar Oficial al parqueo.
`POST` `http://localhost:4000/event-logs/entry/RE-2125`  -  Ingresar Residente al parqueo.
`POST` `http://localhost:4000/event-logs/entry/NRE-2211` -  Ingresar No Residente al parqueo.


#### Caso de uso "Registra salida" 

Se valida que un vehiculo no pueda ingresar antes de haber entrado. NO se utiliza un atributo acumulador porque el importe se puede calcular
basado en fecha de entrada y salida. El servidor responde con el importe calculado en base a fecha de entrada y salida. Oficiales y Residentes
no pagan al salir, se les calcula un importe de 0.

`POST` `http://localhost:4000/event-logs/departure/OF-2032`  - Procesar salida de Oficial.
`POST` `http://localhost:4000/event-logs/departure/RE-2125`  - Procesar salida de Residente.
`POST` `http://localhost:4000/event-logs/departure/NRE-2211` - Procesar salida de No Residente.


#### Caso de uso "Da de alta vehículo oficial" 
Debemos obtener el `_id` del tipo de vehiculo de un `oficial` y luego crear un vehiculo con el typeId correspondiente.

`GET` `http://localhost:4000/vehicle-types` - Obtener el campo `_id` para el documento con descripcion `Oficial`
`POST` `http://localhost:4000/vehicles` - `body` {plate: 'OF-321', typeId: `${_id}` }

#### Caso de uso "Da de alta vehículo residente" 
Debemos obtener el `_id` del tipo de vehiculo de un `residente` y luego crear un vehiculo con el typeId correspondiente.

`GET` `http://localhost:4000/vehicle-types` - Obtener el campo `_id` para el documento con descripcion `Residente`
`POST` `http://localhost:4000/vehicles` - `body` { plate: 'RE-213', typeId: `${_id}` }

#### Caso de uso "Comienza mes"
 Solamente debemos hacer una peticion al endpoint correcto. Se utiliza el campo `active` para hacer `soft delete` en la base de datos.
 
 `POST` `http://localhost:4000/event-logs/reset` - No necesita parametros. Solamente bearer token en los headers.
 
 #### Caso de uso "Pago de residentes"
 Se genera un reporte en formato `CSV` para todos los residentes en el sistema. Los residentes sin ninguna entrada durante el mes, por defecto se
 genera un importe de 0.
 
 `GET` `http://localhost:4000/event-logs/generateReport/:fileName` - No necesita parametros. Solamente bearer token en los headers.
 

