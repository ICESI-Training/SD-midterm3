# Examen 3 - Sistemas Distribuidos
## Integrantes
- Jesús Paz - A00022240


## 1. Documentación del procedimiento para el despliegue de los contenedores.

Este proyecto está desarrollado en docker compose, por lo tanto el archivo en el cual se define cual va a ser la estructura de los contenedores se llama docker-compose.yml, aqui de definen cada uno de los tres contenedores que se van a utilizar y una network para que los contenedores cuenten con un ip estatica y poder acceder fácilmente a ellos.

Al ya tener todo el archivo terminado, se procede a ejecutar el siguiente comando para hacer el despliegue:
```
  sudo docker-compose up
```
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
## 2. Archivos fuentes en el repositorio de la aplicación implementada.

En este proyecto se encuentran tres servicios diferentes:

1. La API realizada en flask, al entrar a la carpeta se puede encontrar todo el código necesario para desplegarla. Al ejecutar el siguiente comando desde la raíz del proyecto:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Es posible ver que se ejecuta la aplicación el local host, y se puede acceder a la siguiente pantalla:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; En esta pantalla se pueden hacer peticiones y la API responderá.

2) La aplicación web implementada en vue, esta aplicación consume la API y permite agregar nuevos usuarios mientras muestra los que ya existen en la base de datos.

3) La aplicación que determina si los servicios están arriba o no, en esta aplicación lo que se hace es hacer una petición a la api y a la aplicación web. La respuesta de estas peticiones nos permite saber si los servicios están activos o no. La aplicación se ve de la siguiente manera:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Como se puede observar, si en status la aplicación dice UP, quiere decir que el servicio está bien, mientras que si dice &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DOWN se interpreta que los servicios no están disponibles.


## 3. Documentación de las tareas para desplegar la aplicación.

## 4. Documente algunos de los problemas encontrados y las acciones efectuadas para su solución.

* Elegir con qué tecnología se iba a realizar el trabajo
* Encontrar una buena manera de hacer la aplicación de salud, se intentó con prometheus.
