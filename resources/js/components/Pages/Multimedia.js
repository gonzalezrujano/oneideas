import React, { Component } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Clock from "react-live-clock";
import Fullscreen from "react-full-screen";
import EmptyMultimedia from "../components/Multimedia/EmptyMultimedia";
import Ejecucion from "../components/Multimedia/Ejecucion";
import Cola from "../components/Multimedia/Cola";
import Herramientas from "../components/Multimedia/Herramientas";
import Parametros from "../components/Multimedia/Parametros";
import { connect } from 'react-redux';
import { getEventos, getJobs, createJob } from './../../redux/actions/multimedia';
import uuidv4 from 'uuid/v4';

class Multimedia extends Component {
    constructor() {
        super();
        this.state = {
          url: "",
          correo: "",
          password: "",
          eventos: [],
          envios:[],
          sectores: [],
          evento: "",
          sector: '',
          archivo: '',
          fechainicio: '',
          fechafin: '',
          flash:'',
          flash2:'',
          color:'#ffffff',
          usuario: JSON.parse(localStorage.getItem("usuario")),
          permisoUsuario: JSON.parse(localStorage.getItem("permisosUsuario")),
          api_token: localStorage.getItem("api_token"),
          opcion: "Multimedia",
          zonaevento: "Etc/GMT+4",
          isFull: false,
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
        this.sendMqttCommand = this.sendMqttCommand.bind(this);
        this.removeMqttJob = this.removeMqttJob.bind(this);
        this.handleStartTime = this.handleStartTime.bind(this);
        this.handleEndTime = this.handleEndTime.bind(this);
        this.openStartTime = this.openStartTime.bind(this);
        this.openEndTime = this.openEndTime.bind(this);
        this.hideTimes = this.hideTimes.bind(this);
        this.quitarCola = this.quitarCola.bind(this);
        this.getEnvios = this.getEnvios.bind(this);

        this.mqttHost = 'mqtt.oneshow.com.ar';
        this.mqttPort = 11344;
        this.mqttClientId = uuidv4();
        this.mqttClient = new Paho.MQTT.Client(this.mqttHost, this.mqttPort, this.mqttClientId);
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
    sendMqttCommand (moment) {
      const { titleTool } = this.props.tool;
      const { startTime, endTime, color, evento, empresa, archivo, flash2 } = this.state;

      const topic = `/${empresa}/${evento}`;
      let message = '';
      let payload = '';

      if (titleTool === 'colores' && !color)
        return console.log('Select a color');
      
      switch (titleTool) {
        case 'colores': 
          message = `COL,${moment},:id:,${color},${startTime.getTime()},${endTime.getTime()}`;
          payload = color;
          break;
        case 'flash':
          message = `FLH,${moment},:id:,${flash2},${startTime.getTime()},${endTime.getTime()}`;
          payload = flash2;
          break;
        default:
          message = `MUL,${moment},:id:,${archivo},${startTime.getTime()},${endTime.getTime()}`;
          payload = archivo;
          break;
      }

      const job = {
        eventId: evento,
        type: titleTool,
        status: 'ejecucion',
        startTime: startTime.getTime(),
        endTime: endTime.getTime(),
        payload
      }

      this.props.createJob(job, this.state.api_token)
        .then(jobId => {
          this.mqttClient.send(topic, message.replace(':id:', jobId));
        })
        .catch(e => {
          alert('Try again');
          
          console.log(e);
        })
    }

    /**
     * Obtener todos los elementos o acciones asociadas al evento
     * @param {*} eventonew 
     */
    getEnvios (eventId) {
      let { evento } = this.state;
      
      if (eventId) {
        evento = eventId;
      }

      this.props.getEnvios(evento, this.state.api_token)
        .then(console.log)
        .catch(console.log)
    }


    /**
     * Metodo para quitar un comando de las acciones asociadas a ella
     * @param {id} ID del job a dejar de ejecutar 
     */
    removeMqttJob (id, type) {
      let jobType = '';

      switch (type) {
        case 'colores':
          jobType = 'COL';  
          break;
        case 'flash':
          jobType = 'FLH';
          break;
      }
      const { empresa, evento } = this.state;
      const topic = `/${empresa}/${evento}`;
      const message = `REM,0,${id},${jobType}`;

      this.mqttClient.send(topic, message);
   }

   /**
    * metodo para cambiar el state de las variables usadas en los inputs
    * @param {evento} e 
    */
    handleChange (e) {
      if (e.target != undefined) {
        if (e.target.name == "evento") {
          const event = this.props.eventos.find(evento => evento._id === e.target.value);
                            
          this.setState({
            evento: event._id,
            empresa: event.Empresa_id,
          }, () => this.getEnvios(event._id));

        } else {
          this.setState({
            [e.target.name]: e.target.value
          });
        }
      } else if (e.hex != undefined) {  
        let colorDiv = document.getElementById("recuadro-color");
        colorDiv.style.backgroundColor=e.hex;
        
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
        this.removeMqttJob(title,parametro,inicio,fin);
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
                    }

                }

            }).catch(function (error) {});
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

  render () {
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
                                      {this.props.eventos.map(event => (
                                          <option key={event._id} value={`${event._id}`}>
                                            {event.Nombre}
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
                  removeMqttJob={this.removeMqttJob}
                />
                <Cola
                  envios={this.props.envios} 
                  evento={this.state.evento} 
                  removeMqttJob={this.removeMqttJob}
                />
                <div className="container-fluid container-tools">
                  <div className="row">
                    <Herramientas 
                      eventId={this.state.evento}
                    />
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
                      sendMqttCommand={this.sendMqttCommand} 
                    />
                  </div>
                </div>
              </div>
            )}
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
  createJob: (eventId, job, apiToken) => dispatch(createJob(eventId, job, apiToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Multimedia);