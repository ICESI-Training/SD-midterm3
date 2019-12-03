# Examen 3 - Sistemas Distribuidos
# Integrantes
- Sebastian Calero - A00065884
- Felipe Cortés - A00077528

# Documentación

## Docker Compose

[ referencia : https://docs.docker.com/compose/ ]
Compose es una herramienta para definir y ejecutar aplicaciones Docker de contenedores múltiples. Con Compose, utiliza un archivo YAML para configurar los servicios de su aplicación. Luego, con un solo comando, crea e inicia todos los servicios desde su configuración 

**Usar Compose es básicamente un proceso de tres pasos:**

1) Defina el entorno de su aplicación con un Dockerfile para que pueda reproducirse en cualquier lugar.

2) Defina los servicios que componen su aplicación en docker-compose.yml para que puedan ejecutarse juntos en un entorno aislado.

3) Ejecute docker-compose up y Compose inicia y ejecuta toda su aplicación.


**Un docker-compose.yml se ve así:**

version: '3'
services:
  web:
    build: .
    ports:
    - "5000:5000"
    volumes:
    - .:/code
    - logvolume01:/var/log
    links:
    - redis
  redis:
    image: redis
volumes:
  logvolume01: {}



##Instalación y documentación
------------------------------
- La documentación completa está disponible en [Docker's website](https://docs.docker.com/compose/).

- El repositorio de código para Docker Compose está en [GitHub](https://github.com/docker/compose).

-  Si encuentra algún problema [Problema](https://github.com/docker/compose/issues/new/choose). Gracias!


## Docker 

Un contenedor es una unidad de software estándar que empaqueta el código y todas sus dependencias para que la aplicación se ejecute de manera rápida y confiable de un entorno informático a otro. Una imagen de contenedor Docker es un paquete de software ligero, independiente y ejecutable que incluye todo lo necesario para ejecutar una aplicación: código, tiempo de ejecución, herramientas del sistema, bibliotecas del sistema y configuraciones.



## 1. Documentación del procedimiento para el despliegue de los contenedores.

En términos de orquestación de contenedores se utilizó la tecnología de Docker Compose y para hacer la configuración se utilizó el archivo .yml.

A continuación se muestra con mayor detalle el archivo .yml


Aquí se puede ver como se definen dos imagenes, donde una es el backend que era la aplicación que se había realizado para el anterior parcial y el frontend que es nuevo, de igual manera los puertos de cada aplcicación.

```
version: '3'
services:
  back:
    image: api_backend   
    ports:
     - "8082:5000"

  front:
    image: api_frontend
    ports:
     - "8081:80"
```

[ Luego de haber hecho el archivo de configuración .yml se sigue con la creación de los dockerfiles ]

## 2. Archivos fuentes en el repositorio de la aplicación implementada.


[ aquí vamos a mostrar con pantallazos lo que se ha realizado ]


En este proyecto se encuentran [ 2 ] servicios diferentes:


1) Se va a mostrar el Dockerfile del backend, el cual es el siguiente:

FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install connexion[swagger-ui]

COPY . .
CMD ["./deploy.sh"]


2) Se va a mostrar el Dockerfile del frontend, el cual es el siguiente:


FROM httpd:2.4

COPY . /usr/local/apache2/htdocs/


A continuación, se mostrará el backend y frontend funcionando con alguna petición ya sea crear usuario o mostrar los usuarios que se han creado en la base de datos.


![WebApp](/Captures/WebApp.png?raw=true "WebApp")


## 3. Documentación de las tareas para desplegar la aplicación.

  3.1 Para desplegar la aplicacion, primero construimos nuestras imagenes para posteriormente correrla en un contenedor. Lo anterior se   hace a traves de los comandos:
    
    3.1.1 Construir Front-End: **docker build -t api_backend ./backend**
    
    
    ![Build_Frontend](/captures/Build_Frotend.png?raw=true "Backend")
    
       
    3.1.2 Construir Back-End: **docker build -t api_frontend ./frontend**
    
    
    ![Build_Backend](/captures/Build_Backend.png?raw=true "Frontend")
    
    
  3.2 Luego de contruir las imagenes, procedemos a levantar los servicios con el comando: **docker-compose up**
  
    ![Compose_Up1](/captures/Compose_Up1.png?raw=true "Compose")
   

--------------------------------------------------------------------------------------------------------------------------------------
## 4. Documente algunos de los problemas encontrados y las acciones efectuadas para su solución.

Uno de los problemas recurrentes fue el de tratar de hacer el despliegue de la app en computadores distintos, siempre aparecía un error de https y el mismo error de la vez pasada con el connexion, se soluciona haciendo la instalación de manera correcta de los paquetes.

Otro de los errores clásicos que sucedieron fue el de la sintaxis al momento de hacer el archivo de configuración del .yml.

Otro error fue con docker compose, era este **ERROR: Version in "./docker-compose.yml" is unsupported. You might be seeing this error because you're using the wrong Compose file version. Either specify a supported version (e.g "2.2" or "3.3") and place your service definitions under the `services` key, or omit the `version` key and place your service definitions at the root of the file to use version 1.
For more on the Compose file format versions, see https://docs.docker.com/compose/compose-file/**, y la solución tenía que ver con la versión, se arreglo utilizando el siguiente comando **sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose**

 

Otro de los errores que también aparecía con docker Compose era **ERROR: Couldn't connect to Docker daemon at http+docker://localhost - is it running?** , sinceramente el error nos tomó mucho tiempo y había que utilizar el comando con sudo.






