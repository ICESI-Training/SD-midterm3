# Distributed systems third midterm #

#3er examen parcial sistemas distribuidos#

**Universidad ICESI**  
**Course:** Distributed systems  
**Teacher:** Juan M Álvarez Q.  
**Topic:** Microservices Architecture design  
**email:** juan.alvarez8 at correo.icesi.edu.co

### Description

For this exam you should redesing the application developed in midterm 2 into a REST-based microservices arquitecture with a frontend and a health check dashboard. your aplication must comply the following:

* Must have a github repository which is a fork of the **[sd-mdterm3](https://github.com/ICESI-Training/SD-midterm3)** repository
* It is suggested to use mlab for data storage: mlab is a database as a service provider for mongo databases.
* The system must accept Http requests from cURL (you can use other REST clients like postman, insomnia or postwoman.
* The application must have an endpoint to insert data in the database.
* The application must have an endpoint to retrieve all the registers from a database collection or table.
* The design must have continous integration unit tests for all microservices.
* Microservices must be deployed on containers.
* Microservices must be orchestrated using docker-compose, docker-swarm or Kubernetes

## Actividades (EN español para evitar ambigüedades)
1. Documento README.md en formato markdown:  
  * Formato markdown (5%).
  * Nombre y código del estudiante (5%).
  * Ortografía y redacción (5%).
2. Documentación del procedimiento para el despliegue de los contenedores. (30%)
3. Archivos fuentes en el repositorio de la aplicación implementada (15%).
4. Documentación de las tareas para desplegar la aplicación (20%).
5. El informe debe publicarse en un repositorio de github el cual debe ser un fork dehttps://github.com/ICESI-Training/SD-midterm3 y para la entrega deberá hacer un Pull Request (PR) al upstream (10%). Tenga en cuenta que el repositorio debe contener todos los archivos necesarios para el despliegue.
6. Documente algunos de los problemas encontrados y las acciones efectuadas para su solución (10%).

## Integrantes:
Johan Camilo Diaz A00329772  
Johnatan Garzón A00333960

## Procedimiento para el despliegue de los contenedores.

Existen tres proyectos:
- api
- frontend
- healthcheck

#### El proyecto api tiene el siguiente Dockerfile:

```Dockerfile
FROM python:3
COPY . .
RUN pip install -r requirements.txt
CMD python backend/app.py
```

- Se selecciona la imagen python:3 para usar en el contenedor
- Se copian los archivos y carpetas del proyecto al directorio actual de trabajo
- Se instalan las dependencias con pip, dichas dependencias se encuentran en un archivo llamado requirements.txt
- Por último, se corre la aplicación flask



#### El proyecto frontend tiene el siguiente Dockerfile:


```Dockerfile
FROM node:12.2.0-alpine
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "serve" ]
```
- En el Dockerfile para el frontend , utilizamos una línea de comandos simple de cero configuración http-server para correr nuestra aplicación Vue.js que funciona muy bien en la creación rápida de prototipos y puede usarse perfectamente en escenarios de producción simples. En esta ocasión se optó por utilizar npm run serve, sin embargo en el siguiente servicio (health) se quiso probar una forma de despliegue diferente que puede servir para ambientes de producción más complejos, esta forma es por medio de NGINX como se mostrará en el siguiente Dockerfile.

#### El proyecto healthcheck tiene el siguiente Dockerfile:
```Dockerfile
FROM mhart/alpine-node:10 as BUILDER
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=BUILDER /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
```

- A pesar de que se vea redundante primero copiar los archivos package.json y  package-lock.json, esto nos permite tomar ventaja de las layers de Docker en caché. Esto lo realizamos tanto en el Dockerfile del proyecto frontend como el de healthcheck.

- Al correr el comando npm run build se está creando la versión de producción del proyecto, dicha versión está optimizada para luego ser expuesta en nginx

- Al configurar la imagen de mhart/alpine-node:10 cómo BUILDER se nos permite utilizar el artefacto creado para la producción sobre la imagen de NGINX que se está cargando (nginx:stable-alpine) para que soporte nuestra aplicación. Tenemos entonces la posibilidad de copiar la aplicación, ya lista para salir a producción, en la carpeta de exposición de servicios de nginx (/usr/share/nginx/html). 



## Tareas para desplegar la aplicación

Para realizar el despliegue de la aplicación se necesita realizar la siguiente tarea:

- Ejecutar el siguiente comando en la ubicación del docker-compose.yml
  
```bash
sudo docker-compose up
```

Este comando se encarga de construir, crear, correr y conectar a contenedores para un servicio. Al ejecutarlo obtenemos lo siguiente:

![alt text](images/docker-compose-up.png?raw=true "")



El archivo docker-compose.yml es el siguiente:

```yaml
version: "3"
services:
  api:
    environment:
      - MONGO_FLASK=d_user:distribuidos20192
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "3000:3000"

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    volumes:
    - ./frontend/:/app
    - /app/node_modules
    ports:
      - "4000:8080"

  healthweb:
    build:
      context: ./healthweb
      dockerfile: Dockerfile
    volumes:
    - .:/app
    ports:
      - "5000:80"


```

Se puede apreciar que se construyen tres servicios:
- **api**: En la construcción del contenedor se define que el contexto, que sería la carpeta sobre la cual se va a trabajar el contenedor y donde se contraría el Dockerfile con la configuración para este contenedor, y para el ítem de Dockerfile indicamos que que el valor será Dockerfile haciendo referencia a que se usará el archivo que se encuentra en la carpeta definida como contexto. Este servicio posee una variable de entorno llamada **MONGO_FLASK** la cual contiene las credenciales para acceder a la base de datos en *mlab*. 

- **frontend**: Es necesario agregar a volumes la carpeta node_modules de la aplicación, debido a que esta es **requerida** para la correcta instalación y el funcionamiento del servicio. El apartado de volumes permite que cuando el Docker-Compose se ejecute, si encuentra algún contenedor de ejecuciones anteriores, copia los volúmenes del contenedor antiguo al nuevo contenedor. Este proceso garantiza que no se pierda ningún dato que se haya creado en volúmenes.

- **healthweb**: Este contenedor tiene su puerto 80 mapeado al puerto 5000 de la máquina local, debido a que la aplicación de javascript cuenta con un proxy reverso por parte de la aplicación **nginx**, que es la que recibe las solicitudes y las redirige hacia la aplicación de Vue.js, a diferencia del contenedor del frontend que no utiliza nginx para exponer su servicio.




Ahora, podemos observar cada uno de los servicios corriendo correctamente:

#### api


- [http:localhost:3000/ui](http:localhost:3000/ui)


![alt text](images/3.jpeg?raw=true "")



#### frontend

- [http://localhost:4000/#/home](http://localhost:4000/#/home)


- Se observa el formulario para ingresar un nuevo usuario a la base de datos:
![alt text](images/4.jpeg?raw=true "")

- Se observa una tabla que posee todos los usuarios que han sido guardados en la base de datos:
![alt text](images/5.jpeg?raw=true "")

- Procedemos a agregar un usuario para verificar su correcto funcionamiento, observamos que hay 18 usuarios actualmente en la base de datos:
![alt text](images/post-1.jpeg?raw=true "")
- Se agrega el usuario Garxuzo
![alt text](images/post-2.jpeg?raw=true "")
- Aparece correctamente guardado en la base de datos:
![alt text](images/post-3.jpeg?raw=true "")

#### healthcheck

- [http://localhost:5000/#/home](http://localhost:5000/#/home)

Se observa que ambos servicios están arriba:

![alt text](images/healthcheckallok.png?raw=true "")

Cuando bajamos el servicio api podemos apreciar:

![alt text](images/healthcheckapidown.png?raw=true "")


De igual forma al bajar el servicio frontend:


![alt text](images/healthcheckfrontenddown.png?raw=true "")




## Problemas encontrados y acciones efectuadas para su solución.


- Uno de los problemas encontrados fue que al hacer la petición del post se estaba usando el Content-Type: application/x-www-form-urlencoded
y no se había dimensionado la gravedad de su uso, ya que se estaba mandando un Json en el body, obteniendo como respuesta un error con status code 405. Luego de una investigación, encontramos que en dicho Content-Type hay que poner *key=value*, y si hay varios parametros tienen que separarse por *&*. Por lo que se decidió enviar en el body:
```javascript
 `id=${data.id}&name=${data.name}`
```
- Otro problema resultó en la implementación del healthcheck. Esto debido a que al realizar una petición al frontend retornaba un problema relacionado con el cors. Se solucionó al agregar lo siguiente en el archivo vue.config.js del proyecto frontend:

```javascript
headers:{
     "Access-Control-Allow-Origin":"*",
     "Access-Control-Allow-Headers":"*",
   }

```
- También, había un problema con el cors en el api, por lo que se le agregó el siguiente decorator a cada endpoint para que funcionaran correctamente:
```python
 @cross_origin(origin='*')
```

- Al ejecutar en la consola *docker-compose up* y acceder al servicio de healthcheck, había un problema relacionado con el cors al usar nginx en el frontend, obteniendo como error el estado de salud de dicho servicio. Por esto, optamos por **no** crear la versión de producción usando el siguiente comando en el Dockerfile:
```Dockerfile
RUN npm run build
```
- Teniendo como alternativa el servidor de desarrollo para ejecutar la aplicación, el cual usa el siguiente comando:
```Dockerfile
RUN npm run serve
```