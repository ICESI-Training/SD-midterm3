# Examen 3 - Sistemas Distribuidos

## Integrantes
- Juan David Bolaños - A00077464
- Andrés Zapata - A00077512

## 0. Sobre el proyecto

Este proyecto consta de un aplicativo Python que levanta un API Rest (que usa el estándar OpenAPI) con servicios que permiten responder a peticiones HTTP GET, POST, y DELETE a un clúster Mongo, así como FrontEnds (Para enviar peticiones y testear la salud de los componentes) manufacturados en el Framework de Javascript Vue. Todo lo anterior separado y distribuido dentro de contenedores de Docker mediante Docker Compose.

La siguiente tabla muestra cada servicio en su respectivo contenedor, junto a la dirección y puerto, para este proyecto los puertos fueron especificados al momento del desliegue, mientras que las direcciones IP fueron brindadas automáticamente por Docker Compose.

Servidor | Descripción | Dirección IP | Puerto mapeado
-------- | ----------- | ------------ | --------------
Flask App  | Back end (API) | 172.18.0.2 | 5050
Vue App | Front end | 172.18.0.3 | 6060 | 
Health App | Monitor | 172.18.0.4  | 7070 |

## 1. Tareas para el despliegue

Para poder desplegar los micro servicios es necesario ejecutar el siguiente comando:

~~~
    sudo docker-compose up -d
    sudo docker-compose ps
~~~

Los anteriores comandos son los encargados de realizar el aprovisionamiento de los servicios y su respectivo despliegue. Al ejecutarlos debe aparecer lo siguiente para garantizar que la aplicación se ejecutó con éxito.

![Alt text](images/compose_ps.png?raw=true "Docker Compose PS")

Para acceder a los servicios se debe ingresar a las siguiente rutas:

* BACK END: http://172.18.0.2:5050/ui/
* FRONT END: http://172.18.0.3/
* MONITOR: http://172.18.0.4/

La siguiente captura muestra el back end en ejecución mediante una interaz provista por swagger, desde aquí se pueden realizar peticiones HTTP al API.

![Alt text](images/flask_app.png?raw=true "Flask App")

Las siguientes dos captura muestran el front end que permite hacer inserciones y peticiones a la base de datos Atlas MongoDB a través de del API, la primera captura es antes de realizar un insert y la segunda es después de realizarlo y consultar todos los registros.

![Alt text](images/vue_app1.png?raw=true "Vue App")

![Alt text](images/vue_app2.png?raw=true "Vue App")

La siguientes dos capturas muestran el monitor de la aplicación que permita conocer el estado de salud de los demás servicios, la primera captura es antes de realizar peticiones a los servicios y la segunda muestra el resultado de las peticiones una vez estas han respondido correctamente.

![Alt text](images/health_app1.png?raw=true "Vue App")

![Alt text](images/health_app2.png?raw=true "Vue App")


## 2. Despliegue mediante Docker Compose

Para esto, se requiere tener previamente instalado Docker y Docker-compose, los cuales permiten el aprovisionamiento de los contenedores donde se leventarán los diferentes módulos que conforman la aplicación, así como su respectivo despliegue. Para esto, es necesario unicamente configurar un archivo llamado *docker-compose.yml* en el cual se definen los servicios que serán desplegados, es decir, los contenedores que se crearán, para cada servicio se debe definir su imagen, su nombre, los puertos por el cual podrá ser accesible y sus dependencias a otros servicios. 

En este archivo se definen los tres servicios que conforman la aplicación, estos son el servidor flask que contiene el back end mediante una API, el servidor front que permite realizar peticiones HTTP al servidor mediante una interfaz web y un segundo servidor web que hará el trabajo de un monitor de salud de los demás servicios. Más adelante se especifíca en detalle cada servicio. El *docker-compose.yml* puede verse a continuación.

![Alt text](images/compose.png?raw=true "Docker Compose")

Como puede verse en la captura anterior, la etiqueta build contiene la ruta en donde se encuentra el respectivo archivo *Dockerfile* con el que se aproviona los contenedores, es por esto, que en cada carpeta se encuentra un *Dockerfile* el cual se usará para construr la imagen del contenedor dado el caso de que la imagen suministrada no se encuentra creada.


## 3. Aprovisionamiento mediante Docker

La estructura del proyecto consta de 3 carpetas, donde cada carpeta tiene los archivos necesarios para su funcionamiento incluyendo, como se mencionó anteriormente, el *Dockerfile*. En estos archivos se define un template brindado por Docker que le permite al contenedor tener los paquetes y librerías básicos o necesarios para su servicio, así como los archivos de código fuente que se desean copiar del host a los contenedores, algunos comandos de instalación de paquetes y el comando de ejecución de la aplicación.

A continuación se muestra el *Dockerfile* del servidor back end.

![Alt text](images/docker_flask.png?raw=true "Docker flask")

A continuación se muestra el *Dockerfile* del servidor front end, el cual es el mismo del servidor de monitoreo con la única diferencia en el puerto expuesto.

![Alt text](images/docker_vue.png?raw=true "Docker vue")

## 4. Pruebas unitarias con integración contínua

El orden de las pruebas se hizo pensando en un continuo flujo de transacciones sobre la base de datos para la gestión de los usuarios, así como los tipos de peticiones, de manera que se pudieran evidenciar todas las posibles respuestas de los servicios de la API

![Alt text](images/taverns.png?raw=true "Tavern syntax")

Se utiliza Tavern, un plugin de pytest para volver más fácil la creación y ejecución de los test. El flujo para los test está determinado por el levantamiento del servidor en handlers.py seguido de la ejecución de un script bash que llama a este plugin y que prueba las diferentes peticiones a la API con sus respuestas correspondientes.

Travis instala las dependencias necesarias y ejecuta los test con normalidad, además de que vuelve más natural la manera de diseñar el código de los test.

Se realizaron 3 archivos para las pruebas (de tipo .tavern.yaml). En cada uno de ellos se evaluaban escenarios de prueba para diferentes tipos de respuestas HTTP Request (Como se consideraron las respuestas 200 (sucess), 201, 400(bad input) y 404(not found)); el objetivo de esto era poder ver un correcto comportamiento en condiciones ideales, otro comportamiento en condiciones de inputs inválidos y en momentos donde la base de datos no posee información sobre lo que se consulta. Tambien las operaciones del CRUD tomaban un papel importante en cuanto a las validaciones, con el objetivo de cuidar la integridad en la estructura de los datos.

![Alt text](images/travis1.png?raw=true "Tavern syntax")

![Alt text](images/travis2.png?raw=true "Tavern syntax")


## 5. Dificultades encontradas en el proceso

* Recordar algunos detalles acerca del ciclo de vida de Vue, como los llamados a los métodos, las condiciones de renderizado, las propiedades de los elementos visuales, el submit de los formularios, entre otros.

* Al no haberse usado axios antes, fue necesario aprender a realizar peticiones HTTP a través de este, al mismo tiempo que entender todo el manejo de respuestas de los servidores.

* Al montar los servicios front hubo dificultades, ya que se intentaba acceder a los contenedores mediante una URL localhost. Luego se cayó en cuenta que a cada contenedor se le asigna una IP y por medio de esta después se accedió a los módulos requeridos.

* Problemas de permisos en las computadoras públicas del laboratorio

* Limitaciones de espacio-tiempo

* El acondicionamiento de las respuestas de Cross Origin Resource Sharing (CORS), debido a que si no se definía el comportamiento que adoptaría CORS ante las peticiones HTTP las rechazaría de la parte del servidor, esto implicó mucho tiempo de trabajo invertido.

## 6. Referencias

* https://mherman.org/blog/dockerizing-a-vue-app/
* https://docs.docker.com/compose/gettingstarted/
* https://vuejs.org/v2/guide/list.html
