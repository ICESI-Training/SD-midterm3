# Examen 3 - Sistemas Distribuidos
## Integrantes
- Jesús Paz - A00022240


## 1. Documentación del procedimiento para el despliegue de los contenedores.

Este proyecto está desarrollado en docker compose, por lo tanto el archivo en el cual se define cual va a ser la estructura de los contenedores se llama docker-compose.yml, aqui se definen cada uno de los tres contenedores que se van a utilizar y una network para que los contenedores cuenten con un ip estatica y poder acceder fácilmente a ellos.

El código es el siguiente:

Aquí se puede ver como se define un contenedor de nombre flask, donde se ubica su dockerfile, que puertos habilita para recibir peticiones y su dirección ip estática. Este contenedor es el encargado de ejecutar la API en flask.

```
version: "2"
services:
  flask:
    image: flask
    container_name: flask
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    volumes:
      - .:/code
    networks:
      static-network:
        ipv4_address: 172.20.128.2
```

Aquí se puede ver como se define un contenedor de nombre webapp, donde se ubica su dockerfile, que puertos habilita para recibir peticiones, su dirección ip estática y que depende del contenedor de nombre flask. Este contenedor es el encargado de ejecutar la aplicación web.


```
  webapp:
    image: webapp
    container_name: webapp
    build:
      context: ./github-users-web
      dockerfile: Dockerfile
    ports:
      - "3005:3005"
    networks:
      static-network:
        ipv4_address: 172.20.128.3
    depends_on:
      - flask
```

Aquí se puede ver como se define un contenedor de nombre health app, donde se ubica su dockerfile, que puertos habilita para recibir peticiones, su dirección ip estática y que depende de los contenedores de nombre flask y webapp. Este contenedor es el encargado de ejecutar la aplicación que verifica que los servicios estén funcionando.

```
    
  healthapp:
    image: healthapp
    container_name: healthapp
    build:
      context: ./health-app
      dockerfile: Dockerfile
    ports:
      - "3006:3006"
    networks:
      static-network:
        ipv4_address: 172.20.128.4
    depends_on:
      - flask
      - webapp
```
En esta parte del código se define la subnet a la cual van a pertenecer los contenedores, todo esto para tener una ip estática en cada uno de estos.

```
networks:
  static-network:
    ipam:
      config:
        - subnet: 172.20.0.0/16
          #docker-compose v3+ do not use ip_range
          ip_range: 172.28.5.0/24

```
Terminado este archivo solo es necesario crear los dockerfiles en cada una de sus ubicaciones ya establecidas.

## 2. Archivos fuentes en el repositorio de la aplicación implementada.

En este proyecto se encuentran tres servicios diferentes:

1. La API realizada en flask, al entrar a la carpeta api se puede encontrar todo el código necesario para desplegarla.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Al ejecutar la aplicacion se puede ver la siguiente pantalla:

![APIFlask](/images/apiDeploy.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; En esta pantalla se pueden hacer peticiones y la API responderá.

2) La aplicación web implementada en vue, esta aplicación consume la API y permite agregar nuevos usuarios mientras muestra los que ya existen en la base de datos. Se ve de la siguiente manera:


![WebApp](/images/webDeploy.png)


3) La aplicación que determina si los servicios están arriba o no, en esta aplicación lo que se hace es hacer una petición a la api y a la aplicación web. La respuesta de estas peticiones nos permite saber si los servicios están activos o no. La aplicación se ve de la siguiente manera:


![StatusApp](/images/statusDeploy.png)


&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Como se puede observar, si en status la aplicación dice UP, quiere decir que el servicio está bien, mientras que si dice &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DOWN se interpreta que los servicios no están disponibles.


## 3. Documentación de las tareas para desplegar la aplicación.

Lo único que queda faltando para poder ejecutar los contenedores es el Dockerfile correspondiente a cada uno. 

Este es el Dockerfile utilizado para desplegar contenedores de Flask:
```
FROM python:3

WORKDIR /code
COPY . .
RUN pip install -r requirements.txt

EXPOSE 5000
CMD python api/app.py
```

Este es el Dockerfile utilizado para desplegar contenedores de Vue, este archivo es el mismo para los contenedores webapp y health app ya que estos dos son desarollado en vue.

```
# build environment
FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install @vue/cli@3.7.0 -g
COPY . /app
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3005
CMD ["nginx", "-g", "daemon off;"]
```

Al ya tener todo el archivo terminado, se procede a ejecutar el siguiente comando para hacer el despliegue:
```
  sudo docker-compose up
```
Cuando termine la creación de los contenedores es posible acceder a cada uno de los servicios en las diferentes direcciones, estan son:
 
* ir a la API: http://172.20.128.2:5000/ui/
* ir a la WebApp: http://172.20.128.3/#/
* ir a la HealthApp: http://172.20.128.4


Si se quiere ver los contenedores activos se puede ejecutar:
```
  sudo docker-compose ps 
```
Si los contenedores es necesario detenerlos se ejecuta:
```
  sudo docker-compose stop
```
Si se quiere eliminar todas las imágenes se ejecuta:
```
  sudo docker rmi $(sudo docker images -q)
```

## 4. Documente algunos de los problemas encontrados y las acciones efectuadas para su solución.

* Elegir con qué tecnología se iba a realizar el trabajo
* Encontrar una buena manera de hacer la aplicación de salud, se intentó con prometheus.
