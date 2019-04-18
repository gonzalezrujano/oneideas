# ONE Show - Backoffice

El backoffice o dashboard es la parte administrativa del ecosistema de ONE Show 
encargado de la administracion de los usuarios, eventos, espectadores y la biblioteca de los DJs. 

Este aplicativo esta desarrollado en PHP, especificamente con el framework Laravel y como manejador de
base de datos se uso MongoDB.


## Requerimientos de Hardware

Para correr de manera optima el aplicativo de debe contar con los siguientes requerimientos minimos:

* Procesador con 2 ó mas nucleos, con una frecuencia de 1.5Ghz ó superior
* 2GB de memoria RAM
* Disco duro de 40GB ó mas


## Requerimientos de Software

En el caso del software se debe contar con lo siguiente:

* Sistema Operativo GNU/Linux, especialmente se recomienda usar Debian en su version 9.
* PHP 7.1
* MongoDB 3.6

Del resto de componentes y adiciones que se necesitan se mencionaran en la parte de instalacion del aplicativo.



## Instalación

A continuación se muestran los pasos para la instalación del backoffice, para ello debemos tener nuestro sistema operativo desde cero ó recien formateado.

**Nota:** Todos los comandos indicados se realizan en el modo root del sistema, tomar en cuenta esta nota.

Antes que nada debemos proceder a revisar la paqueteria del sistema operativo y actualizar los repositorios, para ello abrimos
el siguiente archivo:

	nano /etc/apt/sources.list

Ahora procedemos a copiar lo siguiente:

	#Repositorios Oficiales
    deb http://debian.mirror.constant.com/debian/ stretch main contrib non-free
    deb-src http://debian.mirror.constant.com/debian/ stretch main contrib non-free
    
    #Repositorios de Seguridad
    deb http://security.debian.org/ stretch/updates main contrib non-free
    deb-src http://security.debian.org/ stretch/updates main contrib non-free
    
    #Actualizaciones de Stretch
    deb http://debian.mirror.constant.com/debian/ stretch-updates main contrib non-free
    deb-src http://debian.mirror.constant.com/debian/ stretch-updates main contrib non-free


Guardamos, actualizamos y procedemos actualizar nuestro sistema operativo

	apt update && apt upgrade
	
	
**Nota:** Cabe mencionar que si estamos realizando todo esto en un server de la nube, como por ejemplo AWS, Google Cloud, Microsoft Azure o cualquier
otra, seguramente ya viene con sus repositorios ya actualizado por lo que este paso
no seria necesario.


### Paso 1

Instalaremos un conjunto de paquetes que usaremos en los proximos pasos y nos seran de ayuda, Asi que ingresamos lo siguiente en la terminal:

    apt install build-essential checkinstall make automake cmake autoconf git git-core dpkg aptitude htop iotop
    apt install ncdu openssh-server openssh-client apt-transport-https dirmngr net-tools lsb-release ca-certificates
    apt install rar unrar zip unzip unace bzip2 lzop p7zip p7zip-full p7zip-rar


### Paso 2

Instalar el servidor apache2 y sus modulos. Para instalar apache ingresa en la terminal de linux:

	apt install apache2

Habilitamos el módulo mod_rewrite:

	sudo a2enmod rewrite

A continuación, abrimos el archivo siguiente:

	sudo nano /etc/apache2/sites-available/000-default.conf


Buscamos la línea que diga “DocumentRoot /var/www/html” y debajo agregamos lo siguiente:

	<Directory "/var/www/html">
        AllowOverride All
    </Directory>

Finalmente reiniciamos el Servidor Apache y listo

 	sudo service apache2 restart


### Paso 3

  Instalar y configurar PHP, para ello ingresamos lo siguiente:

  	wget -O /etc/apt/trusted.gpg.d/php.gpg https://packages.sury.org/php/apt.gpg
  	echo "deb https://packages.sury.org/php/ $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/php.list
  	apt update
  	apt install php7.1

Instalamos las extensiones php necesarias de la aplicacion.

  	sudo apt-get install php7.1-curl php7.1-dev php7.1-gd php7.1-imap php7.1-mbstring php7.1-mcrypt php7.1-mysql
    sudo apt-get install php7.1-pgsql php7.1-pspell php7.1-recode php7.1-tidy php7.1-xml php7.1-xmlrpc php7.1-xsl
  	sudo apt-get install php7.1-soap php7.1-zip php7.1-json libcurl4-openssl-dev pkg-config libssl-dev php-xdebug php-memcache php-pear php-imagick

Reiniciamos el Servidor Apache

	service apache2 restart


### Paso 4

Instalacion de composer, el manejador de dependencias de PHP, Para ello ingresamos los siguientes comandos:

    apt install curl
    curl -sS https://getcomposer.org/installer | php
    mv composer.phar /usr/local/bin/composer


### Paso 5

Instalacion de node.js, el manejador de dependencias de Javascript, que usaremos para compilar las vistas del proyecto y agregar nuevas librerias al front. Para ello ingresamos los siguientes comandos:

    curl -sL https://deb.nodesource.com/setup_9.x | bash -
    apt install -y nodejs


### Paso 6

Instalar MongoDB. En la terminal de linux colocamos:

	sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
	echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/3.6 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
	apt update
	apt install -y mongodb-org

Luego configuramos el arranque automático:

    systemctl enable mongod
    systemctl start mongod
    
Ya con esto tenemos instalado y corriendo el mongoDB, su archivo de configuracion se encuentra en la
siguiente ruta, en ella podemos configurar el puerto para nuestro servicio, el habilitar contraseña de acceso:

	nano /etc/mongod.conf


### Paso 7

Instalar y configurar la extension de mongoDB para que PHP pueda hacer uso de la base de datos.

	apt install zlib1g-dev

#### Pecl

	wget http://pecl.php.net/get/zip-1.13.4.tgz
	pecl install zip-1.13.4.tgz

#### Extension mongoDB

    pecl install mongodb


Una vez instaladas estas extensiones, en ambos archivos de php.ini se debe agregar al final del archivo lo siguiente:

Para:
- /etc/php/7.1/apache2/php.ini
- /etc/php/7.1/cli/php.ini

Agregar:

    extension=zip.so
    extension=mongodb.so

Guardar y salir.


### Paso 8

Permisos especiales para que php pueda ejecutar la funcion exec. Necesario para la ejecucion de los 
comandos correspondientes de la seccion de monitoreo del sistema y requieren acceso especial a la bash de linux, 
motivo por el cual debe agregarse lo siguiente en */etc/sudoers* :

	sudo nano /etc/sudoers


Agregamo lo siguiente al archivo:


    www-data ALL=NOPASSWD: ALL

Guardamos y salimos del editor.


### Paso 9

Descargar aplicativo y configurar. 

#### Clonar repositorio: debes tener acceso con tu usuario de github

    cd /var/www/html
    git clone https://github.com/visionstudio/ONEShow-BackOffice.git
   

#### Instalamos las dependencias del proyecto

    cd /var/www/html/ONEShow-BackOffice
    composer update

#### Copiamos el archivo de configuracion

    cp .env.example .env

#### Modificamos el archivo de configuracion .env

    nano .env

Con los datos correspondiente a nuestro servidor donde lo estemos instalando.

#### Generamos nuestra key usada por el proyecto

    php artisan key:generate
    
#### Generamos un enlance simbolico entre la carpeta public y storage/app/public

    php artisan storage:link

#### Damos los permisos necesarios al aplicativo

    chmod -R 775 /var/www/html/ONEShow-BackOffice
    chmod -R o+w /var/www/html/ONEShow-BackOffice

#### Para cuando se modifique alguna vista del front que haga uso de react, se debe compilar las vistas, dentro del proyecto ejecutar lo siguiente: 

    npm run dev

El comando anterior se realiza cuando estamos en modo desarrollo, pero cuando estamos sobre produccion usamos el siguiente comando:

    npm run prod


### Paso 10

En el proyecto requerimos realizar tareas programadas, el framework que usamos nos provee los que es **Task Scheduling** una pequeña funcionalidad 
que nos facilita el trabajo a la hora de tener tareas ejecutandose en un momento determinado, con tan solo
 agregar una entrada en el cron del servidor, para ello hacemos lo siguiente:

	crontab -e

Con el comando anterior abrimos el cron del sistema y al final pegamos lo siguiente:

	* * * * * cd /var/www/html/ONEShow-BackOffice && php artisan schedule:run >> /dev/null 2>&1

Procedemos a guardar y listo ya tenemos nuestro aplicativo enlazado con el cron del sistema.


### Paso 11

Habilitar los Queues en el server. Usados para procesar las colas de trabajos enviadas por el sistema, eventos y mails.

Ingresamos a la terminal de linux e instalamos el paquete supervisor:

	apt install -y supervisor

A continuación, creamos el archivo un archivo de configuracion usado por el paquete para supervisar que se ejecuten los queues:

	nano /etc/supervisor/conf.d/oneshow-backoffice-worker.conf


En ese archivo creado pegamos lo siguiente:

	[program:oneshow-backoffice-worker]
    process_name=%(program_name)s_%(process_num)02d
    command=php /var/www/html/ONEShow-BackOffice/artisan queue:work --sleep=1 --tries=3 --daemon
    autostart=true
    autorestart=true
    numprocs=2
    redirect_stderr=true
    stdout_logfile=/var/log/oneshow-backoffice-worker.log

Guardamos y le damos permisos:

	chmod +x /etc/supervisor/conf.d/oneshow-backoffice-worker.conf


Ahora ejecutamos el siguiente comando para que supervisor actualice y lea el nuevo archivo de configuracion creado

	supervisorctl reread

Iniciamos el proceso nuevo:

	supervisorctl update
	
	supervisorctl start oneshow-backoffice-worker:*


Para verificar el funcionamiento de los procesos de supervisor hacemos lo siguiente:

	supervisorctl
	
Importante y como recomendación si realizan cambios a su archivo .env posterior a comenzar el proceso con supervisor, les recomiendo que una vez modifiquen su archivo .env, detengan supervisor y lo comiencen a ejecutar nuevamente con los siguientes comandos

	supervisorctl stop all
	supervisorctl start all
	

### Paso 12

Probamos nuestro Dashboard.


## Documentación

- Documentación de la estructura del aplicativo. [doc](docs/app.md).
- Diagrama Entidad Relación (ERD) del proyecto. [doc](docs/bd.md).
