# Tercer parcial de Sistemas Distribuidos 2019-2

## Integrantes
- Sandra Mishale Niño Arbeláez- A00022220
- Daniel Quintero Correa - A00021588

## 1. Documentación del procedimiento para el despliegue de los contenedores

![](images/openapi7.PNG)


## 2. Archivos fuente
Los archivos fuente se encuentran en el repositorio. Los de mayor interés será el de index.js de la carpeta backend, el cual tiene implementado los microservicios en NodeJs, y en la carpeta frontend el archivo de mayor interés será la carpeta src.

## 3. Archivos fuente


## 4. Despliegue de los microservicios en la máquina local





## 5. Problemas encontrados y acciones efectuadas
Los problemas encontrados y las acciones efectuadas fueron las siguientes:
1. Al realizar los primeros Dockerfile para el backend y frontend,la primera vez que se intentó hacer build de la imagen de frontend, no lograba encontrar algunos archivos de configuración, y era porque no se había considerado la línea **COPY . .*

2. Al correr las pruebas de manera local con el comando npm test salía el siguiente error: **echo "Error: no test specified" && exit 1 "Error: no test specified" npm ERR!** Test failed. La solución fue poner en el package.json en los scripts: **“test”: “mocha -t 5000”**.
3. Probamos a levantar los microservicios en una máquina diferente a las 2 trabajadas y persistía un error con express y node, por eso en el apartado de despliegue se deja una solución en caso de tener problemas.


## Bibliografía

OpenApi: https://en.wikipedia.org/wiki/OpenAPI_Specification

MongoDBAtlas: https://www.mongodb.com/presentations/mongodb-atlas-la-mejor-forma-de-utilizar-mongodb-en-la-nube-1
