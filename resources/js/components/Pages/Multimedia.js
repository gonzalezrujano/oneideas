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
import { connect } from 'react-redux';
import { getEventos, getJobs, getTool } from './../../redux/actions/multimedia';

class Multimedia extends Component {
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
            api_token: localStorage.getItem("api_token"),
            opcion: "Multimedia",
            footer: "Footer",
            zonaevento: "Etc/GMT+4",
            isFull: false,
            istool: false,
            startTime: new Date(),
            endTime: new Date(),
            isOpenStartTime: false,
            isOpenEndTime: false,
            isLoading: true
        };
        /**
         * Desclarando las funciones que daran uso al state del constructor de esta clase
         */
        this.handleChange = this.handleChange.bind(this);
        this.enviarComando = this.enviarComando.bind(this);
        this.enviarComandoQuitar = this.enviarComandoQuitar.bind(this);
        this.handleStartTime = this.handleStartTime.bind(this);
        this.handleEndTime = this.handleEndTime.bind(this);
        this.openStartTime = this.openStartTime.bind(this);
        this.openEndTime = this.openEndTime.bind(this);
        this.hideTimes = this.hideTimes.bind(this);
        this.ponerCola = this.ponerCola.bind(this);
        this.quitarCola = this.quitarCola.bind(this);
        this.getEnvios = this.getEnvios.bind(this);
        this.actionTool = this.actionTool.bind(this);
        /*this.onConnect = this.onConnect.bind(this);
        this.MQTTconnect = this.MQTTconnect.bind(this);*/
        //LLAMO AL METODO INICIAR MQTT PARA CONECTAR CON EL MQTT
        // this.iniciarMQTT();
        this.mqttHost = 'localhost';
        this.mqttPort = 9001;
        this.mqttClient = new Paho.MQTT.Client(this.mqttHost, this.mqttPort, 'client-1');
    }

    componentDidMount () {
      // Fetching event
      const { usuario, api_token } = this.state;

      this.setState({ isLoading: true });

      this.props.getEvents(usuario._id, api_token)
        .then(() => this.setState({ isLoading: false }));

      // Subscribing to broker
      this.mqttClient.connect({
        timeout: 3,
        onSuccess: () => console.log('Connected!!')
      })
    }

    componentWillUnmount () {
      this.mqttClient.disconnect();
    }

    /**
     * Funcion para enviar comandos o acciones a la cola del evento
     * @param {fecha de inicio del comando o accion} fechainicio 
     * @param {fecha final del comando evento o accion} fechafin 
     */
    enviarComando () {
      const { titleTool, startTime, endTime, color } = this.state;
      let envio = false;
        
      if (this.state.hora) {
        let h = this.state.hora.getHours();
        let m = this.state.hora.getMinutes();
        let s = this.state.hora.getSeconds();
        
        fechainicio=`${h}:${m}:${s}`;
      }
      
      if (this.state.hora2) {
        let h = this.state.hora2.getHours();
        let m = this.state.hora2.getMinutes();
        let s = this.state.hora2.getSeconds();
        
        fechafin = `${h}:${m}:${s}`;
      }

      let evento = this.state.evento.split("_")[0];
      let topic = "/"+this.state.empresa+"/"+evento;

      if(fechainicio == "" || fechainicio == undefined) {
        fechainicio=moment().format("hh:mm:ss");
      }
      
      if (fechafin == "" || fechafin == undefined) {
          fechafin="99:99:99";
      }
      
      if (titleTool =='imagen' || titleTool=='video' || titleTool=='audio') {      
        let message = new Paho.MQTT.Message("MUL,"+this.state.empresa+"/"+evento+"/"+this.state.archivo+"..1,"+fechainicio+","+fechafin);
        message.destinationName = topic;
        this.mqttClient.send(message);
        envio=true;
      }
      if (titleTool == 'flash') {
        let message = new Paho.MQTT.Message("FLH,"+this.state.flash2+","+fechainicio+","+fechafin);
        this.mqttClient.send(topic, message);
        envio=true;
      }
      if (titleTool == 'colores') {
        if (this.state.color != '') {
          let message = `COL,${color},${startTime.getTime()},${endTime.getTime()}`;
          this.mqttClient.send(topic, message);
          envio=true;
        } else {
          swal.fire({
            title: '<i class="fas fa-exclamation-circle"></i>',
            text: 'Seleccione el color',
            confirmButtonColor: '#343a40',
            confirmButtonText: 'Ok',
            target: document.getElementById('sweet')
          });
        }
      }

      if (envio) {
          this.ponerCola('ejecucion', fechainicio, fechafin);
      }
    }



/**
 * evento que llama a la ruta api para obtener la informacion del evento
 */
    getEventos() {
        console.log(this.state.usuario._id);
        Axios.get("/api/eventos/usuario/" + this.state.usuario._id,{
            headers: {
                Authorization: this.state.api_token
            }
        }).then(
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

    /**
     * Obtener todos los elementos o acciones asociadas al evento
     * @param {*} eventonew 
     */
    getEnvios(eventonew) {
        let { evento } = this.state;
        
        evento = evento.split("_")[0];
        if (eventonew) {
            evento = eventonew;
        }

        this.props.getEnvios(evento, this.state.api_token)
          .then(code => {
            if (code === 500)
              this.setState({
                multimedias: []
              });
          })
          .catch(err => {

          })
    }


    /**
     * Metodo para quitar un comando de las acciones asociadas a ella
     * @param {titulo} title 
     * @param {parametro} parametro 
     * @param {fecha inicio de la accion} fechainicio 
     * @param {fecha fin de la accion} fechafin 
     */
    enviarComandoQuitar(title,parametro,fechainicio,fechafin){
       
        var reconnectTimeout = 2000;
       var host="mqtt.oneshow.com.ar";
       var port=11344;
       var self=this;
       function onConnect() {
   
       console.log("Connected ");
       var titleTool=title;
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

   /**
    * metodo para cambiar el state de las variables usadas en los inputs
    * @param {evento} e 
    */
    handleChange(e) {
        if (e.target != undefined) {
            if (e.target.name == "evento") {
                const eventId = e.target.value.split('_')[0];
                const companyId = e.target.value.split('_')[1];
                const event = this.props.eventos.find(event => event._id === eventId);
                const t = parseInt(event.Pais.GTM.substring(2, 3));
                const signo = event.Pais.GTM.substring(0, 1) === '+' ? '-':'+';
                const gtm = "Etc/GMT" + signo + t;
                
                this.setState({
                    multimedia: "",
                    multimedias: [],
                    bibliotecas: [],
                    evento: eventId,
                    empresa: companyId,
                    istool: false,
                    titleTool: "",
                    zonaevento: gtm
                });

                this.getEnvios(eventId);
            }

            this.setState({
                [e.target.name]: e.target.value
            });
        } else if (e.hex != undefined) {
            var colorDiv = document.getElementById("recuadro-color");
            colorDiv.style.backgroundColor=e.hex;
            console.log(colorDiv)
            this.setState({
                color: e.hex
            });
        }
    }

    /**
     * Metodo para eliminar de la cola de acciones de eventos
     * @param {*} newestado 
     * @param {*} tipo 
     * @param {*} inicio 
     * @param {*} fin 
     * @param {*} id 
     */
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
        axios.post('/api/eventos/remove-envios', {evento,title,estado,inicio,fin,parametro,id} ,{
            headers: {
                Authorization: this.state.api_token
            }
        })
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

    /**
     * metodo para obtener informacion api de las herramientas
     * @param {nombre de herramienta que queremos informacion} herramienta 
     */
    actionTool(herramienta){
      let {evento} = this.state;
      evento=evento.split("_")[0];

      this.props.getTool(evento, herramienta, this.state.api_token)
        .then(({ code, msj }) => {
          if (code && code === 700) {
            swal.fire({
              title: '<i class="fas fa-exclamation-circle"></i>',
              text: msj,
              confirmButtonColor: '#343a40',
              confirmButtonText: 'Ok',
              target: document.getElementById('sweet')
            });
          } else {
            this.setState({ titleTool: herramienta }, () => console.log(this.state));
          }
        })
   }

    openStartTime () {
      this.setState({ isOpenStartTime: true }, () => {
        document.querySelector(".wrapper").style.display="none";
      });
    }

    handleStartTime (time) {
      this.setState({startTime: new Date(time), isOpenStartTime: false}, () => {
        document.querySelector('.wrapper').style.display = 'block';
      });
    }
    
    handleEndTime (time) {
      this.setState({endTime: new Date(time), isOpenEndTime: false}, () => {
        document.querySelector('.wrapper').style.display = 'block';
      });
    };

    openEndTime () {
      this.setState({ isOpenEndTime: true }, () => {
        document.querySelector(".wrapper").style.display="none";
      });
    }

    hideTimes () {
      this.setState({ isOpenStartTime: false, isOpenEndTime: false }, () => {
        document.querySelector(".wrapper").style.display="block";
      });
    }

    /**
     * metodo para colocar hora de nuevo abierta
     */
    handleThemeToggle() {
        this.setState({ isOpenHora: true });            
        document.querySelector(".wrapper").style.display="none";
    }

    /**
     * metodo para colocar hora de nuevo abierta 2
     */
    handleThemeToggle2() {
        this.setState({ isOpenHora2: true });
        document.querySelector(".wrapper").style.display="none";
    } 

    /**
     * metodo para colocar en cola las acciones
     * @param {*} newestado 
     * @param {*} inicio 
     * @param {*} fin 
     */
    ponerCola (newestado,inicio,fin) {
        let {evento} = this.state;
        evento=evento.split("_")[0];
        var title=this.props.tool.titleTool;
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
        axios.post('/api/eventos/cola/add', {evento,title,estado,inicio,fin,parametro} ,{
            headers: {
                Authorization: this.state.api_token
            }
        })
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
    if (this.state.isLoading)
      return null;
  
    return (
      <Fullscreen
        enabled={this.state.isFull}
        onChange={isFull => this.setState({ isFull })}
      >
        <Menu usuario={this.state.user} />
        <Header usuario={this.state.user} history={this.props.history} />
        <div className="content-wrapper">
          <header className="page-header">
              <div className="container-fluid">
                  <div className="row">
                      <div className="col-sm-12 col-md-12">
                          <div className="d-flex">
                              <div className="my-2">
                                  <h1 className="page-header-heading">
                                      <div>
                                          <i className="fas fa-compact-disc page-header-heading-icon" />
                                          Multimedia
                                          {this.state.evento !== "" && 
                                            <React.Fragment>
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
                                            </React.Fragment>
                                          }
                                      </div>
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
                                      {this.props.eventos.map(p => (
                                          <option key={p._id} value={`${p._id}_${p.Empresa_id}`}>
                                            {p.Nombre}
                                          </option>
                                      ))}
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
                <Ejecucion
                  envios={this.props.envios} 
                  evento={this.state.evento} 
                  sincola={this.quitarCola.bind(this)}
                />
                <Cola
                  envios={this.props.envios} 
                  evento={this.state.evento} 
                  sincola={this.quitarCola.bind(this)}
                />
                <div className="container-fluid container-tools">
                    <div className="row">
                        <Herramientas action={this.actionTool.bind(this)} />
                        <Parametros 
                          hideTimes={this.hideTimes}
                          handleStartTime={this.handleStartTime} 
                          handleEndTime={this.handleEndTime} 
                          isOpenStartTime={this.state.isOpenStartTime} 
                          isOpenEndTime={this.state.isOpenEndTime} 
                          startTime={this.state.startTime} 
                          endTime={this.state.endTime}
                          istool={this.props.tool.isTool} 
                          title={this.props.tool.titleTool} 
                          sectores={this.props.sectores} 
                          bibliotecas={this.props.tool.bibliotecas} 
                          sector={this.state.sector} 
                          fechainicio={this.state.fechainicio} 
                          fechafin={this.state.fechafin} 
                          archivo={this.state.archivo} 
                          change={this.handleChange} 
                          openStartTime={this.openStartTime}
                          openEndTime={this.openEndTime}
                          enviar={this.enviarComando.bind(this)} 
                          cola={this.ponerCola.bind(this)} />
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

const mapStateToProps = state => ({
  eventos: state.multimedia.eventos,
  sectores: state.multimedia.sectores,
  envios: state.multimedia.jobs,
  tool: state.multimedia.tool
});

const mapDispatchToProps = dispatch => ({
  getEvents: (userId, apiToken) => dispatch(getEventos(userId, apiToken)),
  getEnvios: (eventId, apiToken) => dispatch(getJobs(eventId, apiToken)),
  getTool: (eventId, tool, apiToken) => dispatch(getTool(eventId, tool, apiToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Multimedia);