# ONE Show - Backoffice - Estructura del Aplicativo

El aplicativo esta desarrollado bajo el framework PHP Laravel en su version 5.6, se hace uso de su misma estructura de 
carpetas, adicionalmente de nuevas que fueron usadas para este desarrollo. A continuación se explicara con mas detalle cada seccion del aplicativo.

## Estructura de Directorios

La estructura es la siguiente:

- app/
- bootstrap/
- config/
- database/
- docs/ 
- node_modules/
- public/
- resources/
- routes/
- storage/
- tests/
- vendor/
- .env
- .env.example
- artisan
- composer.json
- package.json
- webpack.mix.js


### app

Aquí encontrarás toda la logica del sistema. describiremos cada una de sus secciones:

- **Console:** Esta carpeta contiene todos los comandos personalizados de Artisan, es decir, los que tu crees o 
personalices. Contiene una carpeta llamada **Commands** que tiene los cron o task del sistema, si se desea agregar uno nuevo
 debe agregarse un archivo aqui y luego registrarlo en kernel.php de este mismo directorio y establecer los parametros
 de ejecucion. Actualmente se encuentran 4, uno que realiza diariamente el backup de la base de datos, otro que procesa
 la liquidaciones diarias de las empresas y dos mas que envian un mail con los reportes de ventas y liquidacion a sus 
 usuarios respectivos. Tambien se observan dos archivos mas uno llamado ScheduleEvent.php y ScheduleList.php los cuales
 fueron creados para sacar la estadisticas de los task o cron que se ejecutan en el sistema y son mostrados en la seccion
 de monitor del aplicativo.
- **Exceptions:** Tiene dentro de si, el manejador de excepciones de nuestro sistema y también podemos 
configurar desde aquí cualquier excepción personalizada, el aplicativo no hace uso como tal de este directorio, asi que no lo tocaremos para nada.
- **Helpers:** Esta carpeta contiene un solo archivo llamado helpers.php, el cual sirve para tener funciones especificas
que pueden ayudar en cualquier parte del sistema, es bienvenido agregar las que se crean pertinenetes dentro de este archivo,
su llamado se hace solo colocando el nombre del metodo creado y pasandole sus respectivos parametros si los tiene.
- **Http:** Es nuestro día a día, tienes dentro los controladores que son las clases php que manejan la 
logica de la app, estos estan bien organizados por lo que no habra perdida. Ademas este directorio contiene uno llamado
middleware que es el encargado de manejar las peticiones antes de que lleguen como tal al destino. Por ultimo
 resta el directorio requests (solicitudes de formularios) que tiene como funcion verificar que todos los 
 datos requeridos y personalizados con reglas de validaciones lleguen al controlador en caso contrario rechaze la peticion
 con un mensaje al usuario.    
- **Models:** en este directorio esta contenido todos los modelos que reflejan las colecciones de la base de
 datos mongodb, a medida que se agrega una nueva y se crea un archivo aqui para poder interactuar con ella. 
- **Mail:** dentro de esta carpeta estan las clases que nos generan los mails, email de notificación de aporbacion
email de recuperar contraseña, email de reporte de liquidacion y venta, entre otros.
- **Pdf:** aqui esta contenido la estructura de los pdf del sistema, que luego son llamdos en los controladores, ademas sus vistas estan almacenadas 
en **views/Pdf** toda la estructura esta organizada por secciones, por lo que no habra perdida con ella, a medida que se declara un nuevo
pdf se crea aqui su base y sus vistas en el directorio mencionado anteriormente y luego es llamado desde el controlador que quiera hacer uso de el. 
- **Providers:** tiene dentro todos los ServiceProvider de nuestro sistema. Trae clases por defecto, pero 
podemos a partir de allí crear clases personalizadas, no interactuamos con este directorio.
- **Rules:** En este directorio estan almacenados las reglas de validacion del sistema usadas en los distintos formularios, por ejemplo la regla que
    valida la longitud, latitud, DNI Argentino y Chileno, el permitir espacios en blanco y los validadores del codigo de menu y producto.


### bootstrap

Aquí verás el archivo app.php del framework y también una importante carpeta para la cache que contiene archivos generados por Laravel para la optimización del rendimiento. Por lo general esta carpeta no se ha tocado.

### config

Contiene todos los archivos de configuración del proyecto, bases de datos, app, componentes externos, cache, emails y demas configuraciones, solo hay que echarle un vistazo e irse familiarizando con cada uno de ellos. Cabe resaltar que dentro del archivo app.php estan las diversas configuraciones de one como la version, titulos de los pie de pagina tanto para los emails como para la pagina.

### database

Aquí se encuentran los archivos relacionados con el manejo de la base de datos. Dentro de este directorio se encuentran los subdirectorios:

- factories: Aquí escribiremos nuestros model factories, que son lo que nos permiten generar datos falsos para usarlos en el sistema, el aplicativo como tal no hace uso de ello.
- migrations: Todas las migraciones que creamos se ubican en este subdirectorio y son las encargadas de levantar nuestras tablas de la base de datos, tampoco hacemos uso de ella.
- seeds: Al igual que factory nos permite poblar nuestras tablas de informacion.

### docs

Aqui estan contemplado los archivos de documentacion del aplicativo.

### node_modules

Es el directorio usado por nodejs para guardar toda sus dependencias y librerias que sean necesarias para nostros o la instalemos memdiante su linea de comando.


### public

Dentro de este directorio colocaremos todos los recursos estáticos de nuestra aplicación, es decir, archivos css, js, imágenes y fuentes. Tiene dentro de si a nuestro index.php, que es el punto de entrada de todas las solicitudes. 

### resources

Contiene las vistas con extensión .blade y archivos sin compilar como LESS, SASS o JavaScript, los archivos multi-idioma, ademas tambien contiene los archivos de react, vue o angular.

Dentro de este directorio se encuentran los subdirectorios:

- **lang :** Aquí se encuentran todos los archivos de internacionalización, es decir, los archivos para poder pasar nuestro proyecto de un idioma a otro. Normalmente habrá una carpeta por cada idioma, ejemplo:
        en : idioma inglés
        es : idioma español
- **views :** Aquí ubicaremos nuestras vistas en formato php o php.blade, caa seccion o modulo del aplicativo esta separada por carpetas, teniendo una carpeta Pos con todo el contenido de esa seccion al igual que Configuracion, realmente no deberia haber perdida
    con las estructura, a su vez hay ciertos modulos o secciones que dentro tienen un archivo index.php que es el punto inicial y otro directorio llamado modals
    que es donde se guarda sus respectiva vista.

### routes

Contiene todas las definiciones de rutas del sistema. Está especificamente: web.php, api.php, console.php y channels.php.

- **web.php:** contiene las rutas principales del aplicativo, si observa detalladamente se vera que esta igualmente organizado por secciones,
- **api.php:** contiene rutas usadas para api, de momento el sistema no hace uso de esto.
- **console.php:** es donde se definen los comandos de consola basados ​​en Closure. En otras palabras, es donde incluiremos las 
entradas o rutas basados en la consola. Tampoco se hace uso de ellas.
- **channels.php:** se usa principalmente cuando en tu sistema usamos eventos, ahí registramos todos los canales de transmisión de eventos que admite nuestro sistema.
    
### storage

storage contiene las plantillas blade compiladas, sesiones basadas en archivos, cachés de archivos y otros archivos generados 
por Laravel. Guarda cualquier archivo generado y que Laravel puede usar como cache. También logs que lógicamente contiene 
registros del sistema. Dentro puedes encontrar la carpeta storage/app/public que puedes usar para almacenar todo lo generado 
por el usuario, como avatars y archivos que son de acceso público. 

### test

Aquí escribiremos los archivos de pruebas que serán ejecutadas posteriormente por phpunit, el aplicativo no hace uso de ello.    
    
### vendor

contiene todas las dependencias de laravel y las librerias o extra que agreguemos con composer.

### .env y .env.example

El archivo .env no existe cuando instalamos por primera vez, en este archivo se configurará el modo en 
que se ejecuta nuestra aplicación, además podemos configurar la conexión a la base de datos y la conexión 
con el servidor de correo electronico. El archivo .env lo creamos copiando el archivo .env.example y 
renombrando la copia como .env.

Por motivos de seguridad de la base de datos el archivo .env nunca se sube cuando hacemos un push en 
nuestro repositorio. Es por eso que aparece escrito dentro del archivo .gitignore en la raíz de 
nuestro proyecto.

### artisan

Este archivo se usa para ejecutar la consola de comando de laravel.

### composer.json

Este fichero es el utilizado por Composer para realizar la instalación del aplicativo. En una instalación 
inicial únicamente se especificará la instalación de un paquete, el propio framework de Laravel, 
pero podemos especificar la instalación de otras librerías o paquetes externos que añadan funcionalidad 
a nuestro sistema.

### package.json

Es el archivo usado por npm para la instalacion de dependencias y librerias.

### webpack.mix.js

En este archivo configuramos cada uno de los scripts js, css creados para agruparlos en un solo archivo. El proyecto
depende de este archivo, aqui tambien se maneja la compilacion de los archivos react. 

