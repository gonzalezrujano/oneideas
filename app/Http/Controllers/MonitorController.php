<?php

namespace App\Http\Controllers;
use App\Console\ScheduleList;
use Illuminate\Http\Request;
use MongoDB\BSON\ObjectID;
use DB, DataTables, Image, Storage, File, Artisan;

//controlador encargado de la seccion monitor
class MonitorController extends Controller
{

    protected $scheduleList;

    public function __construct(ScheduleList $scheduleList)
    {
        $this->scheduleList = $scheduleList;
    }

    //metodo para llamar la vista principal de monitor
    public function index(){

        //devuleve la vista
        return view('Configuracion.Monitor.index');
    }

    //metodo para obtener la data
    public function ajaxMonitor(){

        $result = [];

        //data general
        $general = [];

        //obtengo ram
        $ram = shell_exec('free -h | awk \'NR==2 { print "{\"Size\":\"" $2 "\", \"Used\":\""$3"\", \"Free\":\""$7"\"}" }\'');

        //obtengo procesador
        $processor = shell_exec('iostat -c | awk \'NR==4 { print "{\"User\":\"" $1 "\", \"Nice\":\""$2"\", \"System\":\""$3"\"}" }\'');


        if($_SERVER['SERVER_NAME'] == '18.222.127.119'){

            //obtengo particiones de disco
            $numparticiones = (int)shell_exec('df -h | grep /dev/xv | wc -l');

            $disco = [];
            $c1 = 'df -h | grep /dev/xv | awk \'NR==';
            $c2 = '{ print "{\"Filesystem\":\""substr($1,6) "\",\"Size\":\""$2 "\", \"Used\":\""$3"\", \"Avail\":\""$4"\"}"}\'';
            for ($i = 0; $i < $numparticiones; $i++) {
                $disco[] = json_decode(shell_exec($c1 . ($i + 1) . $c2));
            }

        }else{

            //obtengo particiones de disco
            $numparticiones = (int)shell_exec('df -h | grep /dev/sd | wc -l');

            $disco = [];
            $c1 = 'df -h | grep /dev/sd | awk \'NR==';
            $c2 = '{ print "{\"Filesystem\":\""substr($1,6) "\",\"Size\":\""$2 "\", \"Used\":\""$3"\", \"Avail\":\""$4"\"}"}\'';
            for ($i = 0; $i < $numparticiones; $i++) {
                $disco[] = json_decode(shell_exec($c1 . ($i + 1) . $c2));
            }

        }

        //parcial de datos generales
        $partial1 = [
            'memory' => json_decode($ram),
            'processor' => json_decode($processor),
            'hdd' => $disco
        ];

        //datos de red

        $numinterfaz = (int)shell_exec('ip -o addr show scope global | awk \' {split($4, a, "/"); print $2}\' | wc -l');
        $net1 = 'ip -o addr show scope global | awk \'NR==';
        $net2 = '{split($4, a, "/"); print  "{\"Interfaz\":\""$2"\", \"IPV4\":\""a[1]"\"}"}\'';
        $interfaces = [];
        for ($i = 0; $i < $numinterfaz; $i++) {
            $interfaces[] = json_decode(shell_exec($net1 . ($i + 1) . $net2));
        }

        //SERVICIOS
        //sudo nano /etc/sudoers
        //www-data ALL=NOPASSWD: ALL

        $date = date('Y-m-d H:i:s');
        $sdat = '\"}" }\'';

        $services = [];
        //comandos
        $Mongo = 'sudo netstat -nlp | grep mongod | grep tcp | awk \'NR==1{ print "{\"Servicio\":\"Mongo\",\"Protocolo\":\"" $1 "\", \"Puerto\":\""$4"\", \"PID\":\""($7+"")"\", \"Tipo\":\"Socket\", \"Estado\":\"OK\", \"fecha\":\"';
        $Echo = 'sudo netstat -nlp | grep laravel-echo | grep tcp | awk \'NR==1{ print "{\"Servicio\":\"Laravel Echo\",\"Protocolo\":\"" $1 "\", \"Puerto\":\""$4"\", \"PID\":\""($7+"")"\", \"Tipo\":\"Socket\", \"Estado\":\"OK\", \"fecha\":\"';
        $Mqtt = 'sudo netstat -nlp | grep mosquitto | grep tcp | awk \'NR==1{ print "{\"Servicio\":\"MQTT\",\"Protocolo\":\"" $1 "\", \"Puerto\":\""$4"\", \"PID\":\""($7+"")"\", \"Tipo\":\"Socket\", \"Estado\":\"OK\", \"fecha\":\"';



        //Procesamos
        $exMongo = json_decode(shell_exec($Mongo . $date . $sdat));
        $exEcho  = json_decode(shell_exec($Echo . $date . $sdat));
        $exMqtt  = json_decode(shell_exec($Mqtt . $date . $sdat));
        //asignamos
        $services[] = isset($exMongo->Puerto) ? $exMongo : json_decode('{"Servicio":"Mongo","Protocolo":"tcp", "Puerto":"N/A", "PID":"N/A", "Tipo":"Socket", "Estado":"ERROR(No Listen)", "fecha":"' . $date . '"}');
        $services[] = isset($exEcho->Puerto) ? $exEcho : json_decode('{"Servicio":"Laravel Echo","Protocolo":"tcp", "Puerto":"N/A", "PID":"N/A", "Tipo":"Socket", "Estado":"ERROR(No Listen)", "fecha":"' . $date . '"}');
        $services[] = isset($exMqtt->Puerto) ? $exMqtt : json_decode('{"Servicio":"MQTT","Protocolo":"tcp", "Puerto":"N/A", "PID":"N/A", "Tipo":"Socket", "Estado":"ERROR(No Listen)", "fecha":"' . $date . '"}');


        $general[] = $partial1;
        $result['general'] = $general;
        $result['interfaces'] = $interfaces;
        $result['services'] = $services;
        $result['tasks'] = $this->getCronTasks();

        return json_encode(['code' => 200, 'data' => $result]);

    }

    //metodo para ejecutar la accion de reinicio, inicio, parar determinado servicio
    public function ajaxMonitorAction(Request $request){

        //capturo los parametros enviados
        $input    = $request->all();
        $servicio = $input['servicio'];
        $accion   = $input['accion'];

        //verifico que las variables vengan con data sino no realizo nada
        if( isset($servicio) AND isset($accion) ) {

            //cambio el nombre del servicio por el correcto
            $services = [
                'Mongo' => 'mongod',
                'Laravel Echo' => 'Laravel Echo',
                'MQTT' => 'mosquitto'
            ];

            //hago el cambio de nombre de servicio en base a mi arreglo de arriba
            $service = $services[$servicio];

            //inicio las variables para guardar el comando a ejecutar, el status del mismo y el resultado de la ejecucion del comando
            $command = [];
            $status = true;
            $sendcommand = '';

            if($service == 'Laravel Echo'){

                //genero el comando a ejecutar
                $command[] = 'pm2 '.$accion. ' /var/www/html/OnePWA/socket-laravel-echo.sh ';
                //ejecuto el comando
                $sendcommand = shell_exec($command[0]);

            }else{

                //genero el comando a ejecutar
                $command[] = 'sudo service '.$service.' '.$accion;
                //ejecuto el comando
                $sendcommand = shell_exec($command[0]);

            }

            //verifico la respuesta de ejecucion del comando en caso de seguir vacio devuelvo fallido sino lo contrario
            if ($sendcommand != '') {
                $status = false;
            }

            //armo la respuesta a devolver
            $result['peticion'] = ['service'=>$service, 'accion'=>$accion, 'command'=>$command, 'status'=>$status];

            //devuelvo la respuesta
            return response()->json(['code' => 200, 'data' => $result, 'msj' => '']);

        }else{
            //devuelvo code 600 cuando no se enviaron los parametros necesarios para armar el comando
            return json_encode(['code' => 600, 'msj' => 'Error al procesar acción del servicio. Consulte al administrador.']);
        }

    }

    //metodo para obtener la data de los cron que se estan ejecutando
    public function getCronTasks(){

        $events = app(ScheduleList::class)->all();

        $tasks = [];

        foreach ($events as $event) {

            $tasks[] = [
                'Tipo' => 'Task',
                'Expresion'   => $event->getExpression(),
                'NextRun'     => $event->getNextRunDate()->format('d/m/Y H:i:s').' - '.$event->getNextRunDate()->diffForHumans(),
                'PreviousRun' => $event->getPreviousRunDate()->format('d/m/Y H:i:s'). ' - '.$event->getPreviousRunDate()->diffForHumans(),
                'Comando' => $event->getShortCommand(),
                'Descripcion' => $event->getDescription(),
                'Name' => $event->getName()
            ];
        }

        return $tasks;

    }

}
