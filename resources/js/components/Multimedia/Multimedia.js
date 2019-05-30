import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from "sweetalert2";
import moment from 'moment';
import EmptyMultimedia from "./EmptyMultimedia";
import Herramientas from "./Herramientas";
import Parametros from "./Parametros";
import Ejecucion from "./Ejecucion";
import Cola from "./Cola";
import Clock from 'react-live-clock';
import Fullscreen from "react-full-screen";

export default class Multimedia extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            footer: props.footer,
            eventos: JSON.parse(props.eventos),
            sectores: JSON.parse(props.sectores),
            bibliotecas: [],
            evento: '',
            multimedia: '',
            multimedias: [],
            envios:[],
            titleTool: '',
            sector: '',
            fechainicio: '',
            fechafin: '',
            archivo: '',
            istool: false,
            isFull: false,
            isLoading: false,
            flash:'',
            flash2:'',
            color:'',
            envios:[]
        };

        this.goFull = this.goFull.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.actionTool = this.actionTool.bind(this);
        this.getMultimedia = this.getMultimedia.bind(this);
        this.enviarComando = this.enviarComando.bind(this);
        this.ponerCola = this.ponerCola.bind(this);
        this.iniciarMQTT();
    }
    iniciarMQTT(){
        var reconnectTimeout = 2000;
        var host="mqtt.oneshow.com.ar"; //change this
        var port=11344;
        
        function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
    
        console.log("Connected ");
        //mqtt.subscribe("sensor1");
        var message = new Paho.MQTT.Message("Hello World");
        message.destinationName = "sensor1";
        window.mqttCliente.send(message);
      }
      function MQTTconnect() {
        console.log("connecting to "+ host +" "+ port);
        window.mqttCliente = new Paho.MQTT.Client(host,port,"clientjs");
        //document.write("connecting to "+ host);
        var options = {
            timeout: 3,
            onSuccess: onConnect,
            useSSL:true
         };
         
        window.mqttCliente.connect(options); //connect
        }
     
MQTTconnect();

    }
    enviarComando(fechainicio,fechafin){
       
         var reconnectTimeout = 2000;
        var host="mqtt.oneshow.com.ar"; //change this
        var port=11344;
        var self=this;
        function onConnect() {
      // Once a connection has been made, make a subscription and send a message.
    
        console.log("Connected ");
        var titleTool=self.state.titleTool;
        // var message = new Paho.MQTT.Message("TTR,magnet:?xt=urn:btih:630fe8bec6fd0e785fe20a375daae1ba0bb96c59&dn=240192_splash.png&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com");
        //message.destinationName = "/empresa/evento/Multimedia";
       // window.mqttCliente.send(message);
       // var message = new Paho.MQTT.Message("MUL,5cb841bba1dc000bd11b6ec4/5cbadeb1388f7c4c5e5910d2/IMAGEN0022.jpg..1,"+fechainicio+","+fechafin);
        //message.destinationName = "sampletopic";
        //window.mqttCliente.send(message);
        if(fechainicio==""){
            fechainicio=moment().format("hh:mm:ss");
        }
        if(fechafin==""){
            fechafin="99:99:99";
        }
        if(titleTool=='imagen'||titleTool=='video'||titleTool=='audio'){
        var evento=self.state.evento.split("_")[0];
        var message2 = new Paho.MQTT.Message("MUL,"+self.state.empresa+"/"+evento+"/"+self.state.archivo+"..1,"+fechainicio+","+fechafin);
        message2.destinationName = "sampletopic";
        window.mqttCliente.send(message2);
        }
        if(titleTool=='flash'){
        
        var message2 = new Paho.MQTT.Message("FLH,"+self.state.flash2+","+fechainicio+","+fechafin);
        message2.destinationName = "sampletopic";
        window.mqttCliente.send(message2);
        }
        if(titleTool=='colores'){
        
        var message2 = new Paho.MQTT.Message("COL,"+self.state.color+"+10,"+fechainicio+","+fechafin);
        message2.destinationName = "sampletopic";
        window.mqttCliente.send(message2);
        }
      }
      function MQTTconnect() {
        console.log("connecting to "+ host +" "+ port);
        window.mqttCliente = new Paho.MQTT.Client(host,port,"clientjs");
        //document.write("connecting to "+ host);
        var options = {
            timeout: 3,
            onSuccess: onConnect,
            useSSL:true
         };
         
        window.mqttCliente.connect(options); //connect
        }
     
MQTTconnect();
    }

    goFull() {
        this.setState({ isFull: !this.state.isFull });
    }

    actionTool(herramienta){

        let {evento} = this.state;
        evento=evento.split("_")[0];
        axios.post('/ajax-action-tool', {evento, herramienta} )
            .then(res => {
                if(res){

                    let r = res.data;

                    if(r.code === 200){

                        if(r.tool == 'Video' || r.tool == 'Imagen' || r.tool == 'Audio'){

                            this.setState({
                                istool: true,
                                titleTool: herramienta,
                                bibliotecas: r.biblioteca
                            });

                        }else{

                            this.setState({
                                istool: true,
                                titleTool: herramienta
                            });
                        }


                    }else if(r.code === 500){

                        this.setState({
                            istool: false,
                            titleTool: ''
                        });

                    }else if(r.code === 700){

                        swal.fire({
                            title: '<i class="fas fa-exclamation-circle"></i>',
                            text: r.msj,
                            confirmButtonColor: '#343a40',
                            confirmButtonText: 'Ok',
                            target: document.getElementById('sweet')
                        });

                        this.setState({
                            istool: false,
                            titleTool: ''
                        });
                    }

                }

            }).catch(function (error) {

                console.log(error);

                this.setState({
                    istool: false,
                    titleTool: ''
                });

        });


    }

    getMultimedia(){

        let {evento} = this.state;
        evento=evento.split("_")[0];
        axios.post('/ajax-get-multimedia', {evento} )
            .then(res => {
                if(res){

                    let r = res.data;

                    if(r.code === 200){

                        this.setState({
                            multimedias: r.multimedia,
                        });

                    }else if(r.code === 500){

                        console.log(r.msj);
                        this.setState({
                            multimedias: [],
                        });

                    }

                }

            }).catch(function (error) {});

    }
    getEnvios(){

        let {evento} = this.state;
        evento=evento.split("_")[0];
        axios.post('/ajax-get-envios', {evento} )
            .then(res => {
                if(res){

                    let r = res.data;

                    if(r.code === 200){

                        this.setState({
                            envios: r.envios,
                        });

                    }else if(r.code === 500){

                        console.log(r.msj);
                        this.setState({
                            multimedias: [],
                        });

                    }

                }

            }).catch(function (error) {});

    }
    ponerCola(){
        let {evento} = this.state;
        evento=evento.split("_")[0];
        var title=this.state.titleTool;
        var estado='cola';
        axios.post('/ajax-set-envios', {evento,title,estado} )
            .then(res => {
                if(res){

                    let r = res.data;

                    if(r.code === 200){

                        this.setState({
                            envios: r.envios,
                        });

                    }else if(r.code === 500){

                        console.log(r.msj);
                        this.setState({
                            multimedias: [],
                        });

                    }

                }

            }).catch(function (error) {});
    }

    handleChange(e) {


        if(e.target.name == 'evento'){

            this.setState({
                multimedia: '',
                multimedias: [],
                bibliotecas: [],
                evento: e.target.value.split("_")[0],
                empresa:e.target.value.split("_")[1],
                istool: false,
                titleTool: ''
            });
            this.getEnvios();
        }

        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {

        let {eventos, evento, istool, multimedia, multimedias, titleTool, sectores, bibliotecas, footer, sector, fechainicio, fechafin, archivo} = this.state;

        return (

            <Fullscreen
                enabled={this.state.isFull}
                onChange={isFull => this.setState({isFull})}
            >

            <div className="content-wrapper">

                <header className="page-header">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">

                                <div className="d-flex">

                                    <div className="my-2">
                                        <h1 className="page-header-heading"><i className="fas fa-compact-disc page-header-heading-icon"></i>Multimedia
                                            <i className="fas fa-clock mr-2 ml-4"></i> <Clock format={'HH:mm:ss A'} ticking={true} />
                                        </h1>


                                    </div>

                                    <form className="form-inline ml-5">
                                        <i className="fas fa-calendar-week fa-lg mr-3"></i>
                                        <select className="form-control form-control-sm form-select-event" name="evento" value={evento} onChange={this.handleChange}>
                                            <option value="">Seleccione evento</option>
                                            {
                                                eventos.map( (p, index) => {
                                                    return <option key={index} value={p._id+'_'+p.Empresa_id} >{p.Nombre}</option>
                                                })
                                            }
                                        </select>
                                    </form>



                                    <div className="ml-auto">

                                        <button type="button" className="btn btn-sm btn-dark ml-4" onClick={this.goFull}><i className="fas fa-arrows-alt"></i>&nbsp;Fullscreen</button>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                </header>

                <div id="sweet" className="container-fluid">

                    <div className="col-lg-12">

                        <div className="widget widget-default">

                            <div className="widget-body">

                                {evento == '' ?

                                    <EmptyMultimedia/>

                                    :

                                    <div>

                                        <Ejecucion/>

                                        <Cola envios={this.state.envios} />

                                        <div className="container-fluid container-tools">

                                            <div className="row">

                                                <Herramientas action={this.actionTool} />

                                                <Parametros istool={istool} title={titleTool} sectores={sectores} bibliotecas={bibliotecas} sector={sector} fechainicio={fechainicio} fechafin={fechafin} archivo={archivo} change={this.handleChange} enviar={this.enviarComando.bind(this)} cola={this.ponerCola.bind(this)} />

                                            </div>

                                        </div>

                                    </div>

                                }

                            </div>
                        </div>

                    </div>


                    <footer className="content-wrapper-footer">
                        <span>{footer}</span>
                    </footer>

                </div>

            </div>

            </Fullscreen>

        );
    }
}

if (document.getElementById('multimedia')) {

    const element = document.getElementById('multimedia');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<Multimedia {...props} />, element);
}
