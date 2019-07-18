import React, { Component } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Axios from "axios";
import Clock from "react-live-clock";
import Fullscreen from "react-full-screen";
import EmptyMultimedia from "../components/Multimedia/EmptyMultimedia";
import Ejecucion from "../components/Multimedia/Ejecucion";
import Cola from "../components/Multimedia/Cola";
import Herramientas from "../components/Multimedia/Herramientas";
import Parametros from "../components/Multimedia/Parametros";

export default class Multimedia extends Component {
    constructor() {
        super();
        this.state = {
            url: "",
            correo: "",
            password: "",
            eventos: [],
            bibliotecas: [],
            envios:[],
            sectores: [],
            evento: "",
            sector: '',
            archivo: '',
            fechainicio: '',
            fechafin: '',
            titleTool: '',
            flash:'',
            flash2:'',
            color:'#ffffff',
            multimedia: '',
            multimedias: [],
            usuario: JSON.parse(localStorage.getItem("usuario")),
            permisoUsuario: JSON.parse(localStorage.getItem("permisosUsuario")),
            opcion: "Multimedia",
            footer: "Footer",
            zonaevento: "Etc/GMT+4",
            isFull: false,
            istool: false,
            hora:new Date(),
            hora2:new Date(),
            isOpenHora:false,
            isOpenHora2:false,
            isLoading: true
        };

        this.handleChange = this.handleChange.bind(this);
        
        this.enviarComando = this.enviarComando.bind(this);
        this.enviarComandoQuitar = this.enviarComandoQuitar.bind(this);
        this.handleToggle2 = this.handleToggle2.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSelect2 = this.handleSelect2.bind(this);
        this.handleThemeToggle = this.handleThemeToggle.bind(this);
        this.handleThemeToggle2 = this.handleThemeToggle2.bind(this);
        this.ponerCola = this.ponerCola.bind(this);
        this.quitarCola = this.quitarCola.bind(this);
        this.onConnect = this.onConnect.bind(this);
        this.MQTTconnect = this.MQTTconnect.bind(this);
        this.iniciarMQTT();
        
    }



     startOnConnect() {
        // Once a connection has been made, make a subscription and send a message.
      
          console.log("Connected ");
          //mqtt.subscribe("sensor1");
          var message = new Paho.MQTT.Message("Hello World");
          message.destinationName = "sensor1";
          window.mqttCliente.send(message);
        }

    startMQTTconnect(host, port) {
        console.log("connecting to "+ host +" "+ port);
        window.mqttCliente = new Paho.MQTT.Client(host,port,"clientjs");
        //document.write("connecting to "+ host);
        var options = {
            timeout: 3,
            onSuccess: this.startOnConnect,
            useSSL:true
        };
        
        window.mqttCliente.connect(options); //connect
    }

    iniciarMQTT(){
        var reconnectTimeout = 2000;
        var host="mqtt.oneshow.com.ar"; //change this
        var port=11344;
        this.startMQTTconnect(host,port);
    }

    getEventos() {
        console.log(this.state.usuario._id);
        Axios.get("/api/eventos/usuario/" + this.state.usuario._id).then(
            res => {
                let r = res.data.data;
                localStorage.setItem("eventosUsuario", JSON.stringify(r));
                this.setState({
                    eventos: r.eventos,
                    sectores: r.sectores,
                    isLoading: false
                });
                console.log(r);
            }
        );
    }

    getEnvios(eventonew) {
        let { evento } = this.state;
        evento = evento.split("_")[0];
        if (eventonew) {
            evento = eventonew;
        }
        axios
            .post("/api/eventos/envios", { evento })
            .then(res => {
                if (res) {
                    let r = res.data;

                    if (r.code === 200) {
                        this.setState({
                            envios: r.envios
                        });
                    } else if (r.code === 500) {
                        console.log(r.msj);
                        this.setState({
                            multimedias: []
                        });
                    }
                }
            })
            .catch(function(error) {});
    }

     onConnect(fechainicio,fechafin) {
        // Once a connection has been made, make a subscription and send a message.
            var self=this;
            var envio=false;
            var reconnectTimeout = 2000;
          console.log("Connected");
          
          var titleTool=self.state.titleTool;
          // var message = new Paho.MQTT.Message("TTR,magnet:?xt=urn:btih:630fe8bec6fd0e785fe20a375daae1ba0bb96c59&dn=240192_splash.png&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com");
          //message.destinationName = "/empresa/evento/Multimedia";
         // window.mqttCliente.send(message);
         // var message = new Paho.MQTT.Message("MUL,5cb841bba1dc000bd11b6ec4/5cbadeb1388f7c4c5e5910d2/IMAGEN0022.jpg..1,"+fechainicio+","+fechafin);
          //message.destinationName = "sampletopic";
          //window.mqttCliente.send(message);
          if(self.state.hora){
            var h = self.state.hora.getHours();
            var m = self.state.hora.getMinutes();
            var s = self.state.hora.getSeconds();
            fechainicio=h+":"+m+":"+s;
          }
          if(self.state.hora2){
            var h2 = self.state.hora2.getHours();
            var m2 = self.state.hora2.getMinutes();
            var s2 = self.state.hora2.getSeconds();
            fechafin=h2+":"+m2+":"+s2;
          }
          var evento=self.state.evento.split("_")[0];
          var topic="/"+self.state.empresa+"/"+evento;
          //window.mqttCliente.subscribe(topic);
          console.log(topic)
   
          if(fechainicio==""||fechainicio==undefined){
              fechainicio=moment().format("hh:mm:ss");
          }
          if(fechafin==""||fechafin==undefined){
              fechafin="99:99:99";
          }

          console.log("fecha inicio "+fechainicio);
          console.log("fecha fin "+fechafin)
          if(titleTool=='imagen'||titleTool=='video'||titleTool=='audio'){
                  console.log("aqui entro en imagen")
                  console.log("MUL,"+self.state.empresa+"/"+evento+"/"+self.state.archivo+"..1,"+fechainicio+","+fechafin)
                  var message2 = new Paho.MQTT.Message("MUL,"+self.state.empresa+"/"+evento+"/"+self.state.archivo+"..1,"+fechainicio+","+fechafin);
                  message2.destinationName = topic;
                  console.log(message2);
                  window.mqttCliente.send(message2);
                  console.log("estoy es luego de mqqt send")
                  envio=true;
          }
          if(titleTool=='flash'){
          
                  var message2 = new Paho.MQTT.Message("FLH,"+self.state.flash2+","+fechainicio+","+fechafin);
                  message2.destinationName = topic;
                  window.mqttCliente.send(message2);
                  envio=true;
          }
          if(titleTool=='colores'){
              if(self.state.color!=''){
                  var message2 = new Paho.MQTT.Message("COL,"+self.state.color+"+10,"+fechainicio+","+fechafin);
                  message2.destinationName = topic;
                  window.mqttCliente.send(message2);
                  envio=true;
              }else{
                  swal.fire({
                              title: '<i class="fas fa-exclamation-circle"></i>',
                              text: 'Seleccione el color',
                              confirmButtonColor: '#343a40',
                              confirmButtonText: 'Ok',
                              target: document.getElementById('sweet')
                          });
              }
          }
          if(envio){
              self.ponerCola('ejecucion',fechainicio,fechafin);
          }
        }

     MQTTconnect(host,port,fechainicio,fechafin) {
        console.log("connecting to "+ host +" "+ port);
        window.mqttCliente = new Paho.MQTT.Client(host,port,"clientjs");
        //document.write("connecting to "+ host)//3
        var options = {
            timeout: 3,
            onSuccess: this.onConnect(fechainicio,fechafin),
            useSSL:true
            };

        window.mqttCliente.connect(options); //connect
        }


    enviarComando(fechainicio,fechafin){
       var host="mqtt.oneshow.com.ar"; //change this
       var port=11344;
       var reconnectTimeout = 2000;
       this.MQTTconnect(host,port,fechainicio,fechafin);
    }

/*    enviarComando(fechainicio,fechafin){
       
       var reconnectTimeout = 2000;
       var host="mqtt.oneshow.com.ar"; //change this
       var port=11344;
       var self=this;
       var envio=false;
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
       if(self.state.hora){
         var h = self.state.hora.getHours();
         var m = self.state.hora.getMinutes();
         var s = self.state.hora.getSeconds();
         fechainicio=h+":"+m+":"+s;
       }
       if(self.state.hora2){
         var h2 = self.state.hora2.getHours();
         var m2 = self.state.hora2.getMinutes();
         var s2 = self.state.hora2.getSeconds();
         fechafin=h2+":"+m2+":"+s2;
       }
       var evento=self.state.evento.split("_")[0];
       var topic="/"+self.state.empresa+"/"+evento;

       if(fechainicio==""||fechainicio==undefined){
           fechainicio=moment().format("hh:mm:ss");
       }
       if(fechafin==""||fechafin==undefined){
           fechafin="99:99:99";
       }
       if(titleTool=='imagen'||titleTool=='video'||titleTool=='audio'){
               
               var message2 = new Paho.MQTT.Message("MUL,"+self.state.empresa+"/"+evento+"/"+self.state.archivo+"..1,"+fechainicio+","+fechafin);
               message2.destinationName = topic;
               window.mqttCliente.send(message2);
               envio=true;
       }
       if(titleTool=='flash'){
       
               var message2 = new Paho.MQTT.Message("FLH,"+self.state.flash2+","+fechainicio+","+fechafin);
               message2.destinationName = topic;
               window.mqttCliente.send(message2);
               envio=true;
       }
       if(titleTool=='colores'){
           if(self.state.color!=''){
               var message2 = new Paho.MQTT.Message("COL,"+self.state.color+"+10,"+fechainicio+","+fechafin);
               message2.destinationName = topic;
               window.mqttCliente.send(message2);
               envio=true;
           }else{
               swal.fire({
                           title: '<i class="fas fa-exclamation-circle"></i>',
                           text: 'Seleccione el color',
                           confirmButtonColor: '#343a40',
                           confirmButtonText: 'Ok',
                           target: document.getElementById('sweet')
                       });
           }
       }
       if(envio){
           self.ponerCola('ejecucion',fechainicio,fechafin);
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
   }*/


    enviarComandoQuitar(title,parametro,fechainicio,fechafin){
       
        var reconnectTimeout = 2000;
       var host="mqtt.oneshow.com.ar"; //change this
       var port=11344;
       var self=this;
       function onConnect() {
     // Once a connection has been made, make a subscription and send a message.
   
       console.log("Connected ");
       var titleTool=title;
       // var message = new Paho.MQTT.Message("TTR,magnet:?xt=urn:btih:630fe8bec6fd0e785fe20a375daae1ba0bb96c59&dn=240192_splash.png&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com");
       //message.destinationName = "/empresa/evento/Multimedia";
      // window.mqttCliente.send(message);
      // var message = new Paho.MQTT.Message("MUL,5cb841bba1dc000bd11b6ec4/5cbadeb1388f7c4c5e5910d2/IMAGEN0022.jpg..1,"+fechainicio+","+fechafin);
       //message.destinationName = "sampletopic";
       //window.mqttCliente.send(message);
       var evento=self.state.evento.split("_")[0];
       var topic="/"+self.state.empresa+"/"+evento;
       if(fechainicio==""){
           fechainicio=moment().format("hh:mm:ss");
       }
       if(fechafin==""){
           fechafin="99:99:99";
       }
       if(titleTool=='imagen'||titleTool=='video'||titleTool=='audio'){

       var message2 = new Paho.MQTT.Message("MUL,"+self.state.empresa+"/"+evento+"/"+parametro+"..1,"+fechainicio+","+fechafin);
       message2.destinationName = topic;
       window.mqttCliente.send(message2);
       }
       if(titleTool=='flash'){
       parametro=0;
       var message2 = new Paho.MQTT.Message("FLH,"+parametro+","+fechainicio+","+fechafin);
       message2.destinationName = topic;
       window.mqttCliente.send(message2);
       }
       if(titleTool=='colores'){
       parametro='#000';
       var message2 = new Paho.MQTT.Message("COL,"+parametro+"+10,"+fechainicio+","+fechafin);
       message2.destinationName = topic;
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

    handleChange(e) {
        console.log(e);
        if (e.target != undefined) {
            if (e.target.name == "evento") {
                var eventos = this.state.eventos;
                var gtm = this.state.zonaevento;
                for (var i = eventos.length - 1; i >= 0; i--) {
                    if (eventos[i]._id == e.target.value.split("_")[0]) {
                        console.log(eventos[i].Pais);
                        gtm = eventos[i].Pais.GTM;
                        var t = parseInt(gtm.substring(2, 3));
                        var signo = gtm.substring(0, 1);
                        if (signo == "+") {
                            signo = "-";
                        } else {
                            signo = "+";
                        }
                        gtm = "Etc/GMT" + signo + t;
                    }
                }
                this.setState({
                    multimedia: "",
                    multimedias: [],
                    bibliotecas: [],
                    evento: e.target.value.split("_")[0],
                    empresa: e.target.value.split("_")[1],
                    istool: false,
                    titleTool: "",
                    zonaevento: gtm
                });
                this.getEnvios(e.target.value.split("_")[0]);
            }

            this.setState({
                [e.target.name]: e.target.value
            });
        } else if (e.hex != undefined) {
            this.setState({
                color: e.hex
            });
        }
    }

    quitarCola(newestado,tipo,inicio,fin,id){
        let {evento} = this.state;
        evento=evento.split("_")[0];
        var title=tipo;
        var parametro='';

        var estado='cola';
        if(newestado!=undefined&&newestado!=null&&newestado!=""){
            estado=newestado;
        }
        if(inicio==undefined&&inicio==null&&inicio==""){
            inicio=moment().format("hh:mm:ss");
        }
        if(fin==undefined&&fin==null&&fin==""){
            fin="99:99:99";
        }
        if(title=='imagen'||title=='video'||title=='audio'){
        parametro=this.state.archivo;
        }
        if(title=='flash'){
        parametro=this.state.flash2;
        }
        if(title=='colores'){
        parametro=this.state.color;
        }
        this.enviarComandoQuitar(title,parametro,inicio,fin);
        document.getElementById(id).style.display="none";
        axios.post('/api/eventos/remove-envios', {evento,title,estado,inicio,fin,parametro,id} )
            .then(res => {
                if(res){

                    let r = res.data;

                    if(r.code === 200){

                        this.setState({
                            envios: r.envios,
                        });
                        this.getEnvios();

                    }else if(r.code === 500){

                        console.log(r.msj);
                        this.setState({
                            multimedias: [],
                        });

                    }

                }

            }).catch(function (error) {});
    }

    actionTool(herramienta){
        var self = this;
       let {evento} = this.state;
       evento=evento.split("_")[0];
       axios.post('/api/multimedia/action-tool', {evento, herramienta} )
           .then(res => {
               if(res){

                   let r = res.data;

                   if(r.code === 200){

                       if(r.tool == 'Video' || r.tool == 'Imagen' || r.tool == 'Audio'){

                           self.setState({
                               istool: true,
                               titleTool: herramienta,
                               bibliotecas: r.biblioteca
                           });

                       }else{

                           self.setState({
                               istool: true,
                               titleTool: herramienta
                           });
                       }


                   }else if(r.code === 500){

                       self.setState({
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

                       self.setState({
                           istool: false,
                           titleTool: ''
                       });
                   }

               }

           }).catch(function (error) {

               console.log(error);

               self.setState({
                   istool: false,
                   titleTool: ''
               });

       });


   }

   handleToggle(isOpenHora) {
    this.setState({ isOpenHora });
        if(isOpenHora){
            document.querySelector(".wrapper").style.display="none";
        }else{
            document.querySelector(".wrapper").style.display="block";    
        }
    }

    handleToggle2(isOpenHora2) {
        this.setState({ isOpenHora2 });
        if(isOpenHora2){
            document.querySelector(".wrapper").style.display="none";
        }else{
            document.querySelector(".wrapper").style.display="block";    
        }
    }

    handleSelect(hora){
        var hora2 = new Date(hora);
        hora2.setHours( hora.getHours() + 1 )
            this.setState({ hora,hora2, isOpenHora: false });
            document.querySelector(".wrapper").style.display="block";
    }

    handleSelect2(hora2){
        var hora =new Date(hora2);
        hora.setHours( hora.getHours() - 1 );
            this.setState({ hora, hora2, isOpenHora2: false });
            document.querySelector(".wrapper").style.display="block";
    }

    handleThemeToggle() {
        this.setState({ isOpenHora: true });            
        document.querySelector(".wrapper").style.display="none";
    }

    handleThemeToggle2() {
        this.setState({ isOpenHora2: true });
        document.querySelector(".wrapper").style.display="none";
    } 

    ponerCola(newestado,inicio,fin){
        let {evento} = this.state;
        evento=evento.split("_")[0];
        var title=this.state.titleTool;
        var parametro='';
        var self=this;
        if(self.state.hora){
          var h = self.state.hora.getHours();
          var m = self.state.hora.getMinutes();
          var s = self.state.hora.getSeconds();
          inicio=h+":"+m+":"+s;
        }
        if(self.state.hora2){
          var h2 = self.state.hora2.getHours();
          var m2 = self.state.hora2.getMinutes();
          var s2 = self.state.hora2.getSeconds();
          fin=h2+":"+m2+":"+s2;
        }
        var estado='cola';
        if(newestado!=undefined&&newestado!=null&&newestado!=""){
            estado=newestado;
        }
        if(inicio==""){
            inicio=moment().format("hh:mm:ss");
        }
        if(fin==""){
            fin="99:99:99";
        }
        if(title=='imagen'||title=='video'||title=='audio'){
        parametro=this.state.archivo;
        }
        if(title=='flash'){
        parametro=this.state.flash2;
        }
        if(title=='colores'){
        parametro=this.state.color;
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        var momento = new Date(yyyy+'-'+mm+'-'+dd+' '+fin+window.app.gtm);

        setTimeout(self.statusEnvios, momento.getTime()-(new Date()).getTime());
        axios.post('/ajax-set-envios', {evento,title,estado,inicio,fin,parametro} )
            .then(res => {
                if(res){

                    let r = res.data;

                    if(r.code === 200){

                        this.setState({
                            envios: r.envios,
                        });
                        this.getEnvios();

                    }else if(r.code === 500){

                        console.log(r.msj);
                        this.setState({
                            multimedias: [],
                        });

                    }

                }

            }).catch(function (error) {});
    }



    render() {
        if (!JSON.parse(localStorage.getItem("eventosUsuario"))) {
            this.getEventos();
        } else {
            this.state.eventos = JSON.parse(
                localStorage.getItem("eventosUsuario")
            ).eventos;
            this.state.sectores = JSON.parse(
                localStorage.getItem("eventosUsuario")
            ).sectores;
            this.state.isLoading = false;
        }

        if (this.state.isLoading) {
            return "";
        } else {
            return (
                <Fullscreen
                    enabled={this.state.isFull}
                    onChange={isFull => this.setState({ isFull })}
                >
                    <Menu usuario={this.state.user} />
                    <Header usuario={this.state.user} />
                    <div className="content-wrapper">
                        <header className="page-header">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                        <div className="d-flex">
                                            <div className="my-2">
                                                <h1 className="page-header-heading">
                                                    {this.state.evento == "" ? (
                                                        <div>
                                                            <i className="fas fa-compact-disc page-header-heading-icon" />
                                                            Multimedia
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <i className="fas fa-compact-disc page-header-heading-icon" />
                                                            Multimedia
                                                            <i className="fas fa-clock mr-2 ml-4" />
                                                            <Clock
                                                                format={
                                                                    "HH:mm:ss A"
                                                                }
                                                                ticking={true}
                                                                timezone={
                                                                    this.state
                                                                        .zonaevento
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </h1>
                                            </div>

                                            <form className="form-inline ml-5">
                                                <i className="fas fa-calendar-week fa-lg mr-3" />
                                                <select
                                                    className="form-control form-control-sm form-select-event"
                                                    name="evento"
                                                    value={this.state.evento}
                                                    onChange={this.handleChange}
                                                >
                                                    <option value="">
                                                        Seleccione evento
                                                    </option>
                                                    {this.state.eventos.map(
                                                        (p, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        p._id +
                                                                        "_" +
                                                                        p.Empresa_id
                                                                    }
                                                                >
                                                                    {p.Nombre}
                                                                </option>
                                                            );
                                                        }
                                                    )}
                                                </select>
                                            </form>

                                            <div className="ml-auto">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-dark ml-4"
                                                    onClick={this.goFull}
                                                >
                                                    <i className="fas fa-arrows-alt" />
                                                    &nbsp;Fullscreen
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div id="sweet" className="container-fluid">
                            
                                    {this.state.evento == '' ?(
                                        <EmptyMultimedia/>
                                    ):(
                                        <div>
                                            {console.log(this.state.envios)}
                                            {console.log(this.state.evento)}
                                        <Ejecucion envios={this.state.envios} evento={this.state.evento} sincola={this.quitarCola.bind(this)} />

                                        <Cola envios={this.state.envios} evento={this.state.evento} sincola={this.quitarCola.bind(this)}/>

                                        <div className="container-fluid container-tools">

                                            <div className="row">

                                                <Herramientas action={this.actionTool.bind(this)} />

                                                <Parametros handleToggle={this.handleToggle} handleSelect={this.handleSelect} isOpenHora={this.state.isOpenHora} hora={this.state.hora} handleToggle2={this.handleToggle2} handleSelect2={this.handleSelect2} isOpenHora2={this.state.isOpenHora2} hora2={this.state.hora2} istool={this.state.istool} title={this.state.titleTool} sectores={this.state.sectores} bibliotecas={this.state.bibliotecas} sector={this.state.sector} fechainicio={this.state.fechainicio} fechafin={this.state.fechafin} archivo={this.state.archivo} change={this.handleChange}  handleThemeToggle={this.handleThemeToggle} handleThemeToggle2={this.handleThemeToggle2} enviar={this.enviarComando.bind(this)} cola={this.ponerCola.bind(this)} />

                                            </div>

                                        </div>

                                    </div>
                                    )}
                                

                            {/**esto de abajo es de php, es el texto que cambia con el menu */}
                            <footer className="content-wrapper-footer">
                                <span>{this.state.footer}</span>
                            </footer>
                        </div>
                    </div>
                </Fullscreen>
            );
        }
    }
}
