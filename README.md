## Secret Chat
Un chat basico contruido en `Angular` con los componentes de `Nebular` con un backend implementado con el
framework de `Nestjs`.

>Este proyecto aun esta construccion

## Instalacion

## Crear el proyecto

### Backend

```shell_script
nest new secret-chat-backend

```

### Frontend

```shell_script
ng new secret-chat-front
```


Instalar las librerias para websockets en el backend

```shell_script
 npm i --save @nestjs/websockets @nestjs/platform-socket.io
```


### Capturas de pantalla

#### Ingreso de datos
Al usuarios se le pedira que ingrese un `nickName`
![ingreso](https://github.com/velascoandres/secret-chat/blob/master/recursos/ingreso-datos.png?raw=true)


Si todo esta bien se le mostrara un mensaje de exito:

![exito](https://github.com/velascoandres/secret-chat/blob/master/recursos/exito-ingreso.png?raw=true)


#### Mensajes


![mensajes](https://github.com/velascoandres/secret-chat/blob/master/recursos/mensajes.png?raw=true)

#### Notificaciones

![notificacion](https://github.com/velascoandres/secret-chat/blob/master/recursos/notifiacion-usuarios.png?raw=true)