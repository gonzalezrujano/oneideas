import axios from 'axios';
import swal from "sweetalert2";
import Menu from "../components/Menu";
import Header from "../components/Header";
import  React, { Component } from 'react';
import { connect } from 'react-redux';
import Mensaje from "../atoms/Mensaje";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    getEventos, 
    getCompanies,
    setCompany,
    setEvent,
    getEventsFromCompany 
  } from './../../redux/actions/multimedia';
import { mostrarElementoDeCarga, ocultarElementoDeCarga } from "./../../redux/actions/loader";

class SocialWall extends Component {

    constructor(props) {
        super(props);

        this.mostrarFiltros = true;

        this.state = {
            eventoId: "",
            mostrarIframe: false,
            api_token: localStorage.getItem("api_token"),
            usuario: JSON.parse(localStorage.getItem("usuario")),
            hashtagsTwitter: [],
            hashtagsInstagram: [],
            publicaciones: [],
            mostrarBotonPantallaCompleta: false,
            estilosIframe: {
                width: "inherit",
                border: "none",
                visibility: "hidden"
            },
            isLoading: false,
            intervaloDeActualizacion: null,
            intervaloDeScroll: null,
            avisoSinContenido: false,
            showNoHashtags: false,
            urlParaIframe: window.location.protocol + "//" + window.location.host + "/Lib",
            urlModerarTextoOfensivo: "https://oneshowmoderator.cognitiveservices.azure.com/contentmoderator/moderate/v1.0/ProcessText/Screen",
            urlModerarImagenOfensiva: "https://oneshowmoderator.cognitiveservices.azure.com/contentmoderator/moderate/v1.0/ProcessImage/Evaluate"
        };

        this.handleCompanyChange = this.handleCompanyChange.bind(this);
        this.handleEventChange = this.handleEventChange.bind(this);
        this.consultarHashtagsDelEvento = this.consultarHashtagsDelEvento.bind(this);
        this.activarIframe = this.activarIframe.bind(this);
        this.colocarPantallaCompleta = this.colocarPantallaCompleta.bind(this);
        this.editarFiltroDeTipoDeContenido = this.editarFiltroDeTipoDeContenido.bind(this);
        this.agregarEventoPantallaCompletaAIframe = this.agregarEventoPantallaCompletaAIframe.bind(this);   
        this.existenHashtagsParaEvento = this.existenHashtagsParaEvento.bind(this);
        this.obtenerURLConParametros = this.obtenerURLConParametros.bind(this);
        this.obtenerHashtagsSinSimbolo = this.obtenerHashtagsSinSimbolo.bind(this);
        this.guardarContenidoDeLasPublicaciones = this.guardarContenidoDeLasPublicaciones.bind(this);
        this.obtenerContenidoDeLasPublicaciones = this.obtenerContenidoDeLasPublicaciones.bind(this);
        this.moderarContenidoDeLasPublicaciones = this.moderarContenidoDeLasPublicaciones.bind(this);
        this.moderarTextoOfensivo = this.moderarTextoOfensivo.bind(this);
        this.moderarImagenOfensiva = this.moderarImagenOfensiva.bind(this);
        this.mostrarBotonPantallaCompleta = this.mostrarBotonPantallaCompleta.bind(this);
        this.mostrarIframeSocialWall = this.mostrarIframeSocialWall.bind(this);
        this.retirarPublicacionesOfensivas = this.retirarPublicacionesOfensivas.bind(this);
        this.configurarFiltroParaPublicacionesSeguras = this.configurarFiltroParaPublicacionesSeguras.bind(this);
        this.etiquetarPublicacionComoOfensiva = this.etiquetarPublicacionComoOfensiva.bind(this);
        this.simularClickSobreFiltro = this.simularClickSobreFiltro.bind(this);
        this.vaciarValoresDeCamposSelectores = this.vaciarValoresDeCamposSelectores.bind(this);
        this.crearIntervaloDeActualizaciones = this.crearIntervaloDeActualizaciones.bind(this);
        this.consultarNuevasPublicaciones = this.consultarNuevasPublicaciones.bind(this);
        this.limpiarIntervaloDeActualizacion = this.limpiarIntervaloDeActualizacion.bind(this);
        this.crearIntervaloDeTransicionDeContenido = this.crearIntervaloDeTransicionDeContenido.bind(this);
        this.limpiarIntervaloDeTransicion = this.limpiarIntervaloDeTransicion.bind(this);
    }

    /**
     * Ejecutar despues del Render
     * 
     * @return {void}
     */
    componentDidMount () {
        alert = function() {};

        this.vaciarValoresDeCamposSelectores();
        this.props.getCompanies().then(() => this.props.ocultarElementoDeCarga());
    }

    /**
     * Ejecutar al desmontar componente
     * 
     * @return {void}
     */
    componentWillUnmount() {
        this.limpiarIntervaloDeActualizacion();

        this.props.setCompany('');
        this.props.setEvent('');
    }

    /**
     * Resetear valores de campos selectores
     * 
     * @return {void}
     */
    vaciarValoresDeCamposSelectores() {
        document.getElementsByName('company')[0].value = '';
        document.getElementsByName('event')[0].value = '';
    }

    /**
     * Evento al cambiar opcion del selector de compañias
     * 
     * @param {object} e 
     * @return {void}
     */
    handleCompanyChange (e) {
      const { value } = e.target;

      if (!value) {
        this.props.setCompany('');
        this.props.setEvent('');
      } else {
        this.props.setCompany(value);
        this.props.getEventsFromCompany(value);
      }

      this.setState({
        mostrarIframe: false,
        hashtagsTwitter: [],
        hashtagsInstagram: [],
      });
    }
  
    /**
     * Evento al cambiar opcion del selector de eventos
     * 
     * @param {object} e 
     * @return {void}
     */
    handleEventChange (e) {
        const { value } = e.target;
  
        if (!value) {
          this.props.setEvent('');

          return this.setState({
            mostrarIframe: false,
            isLoading: false,
          });
        }

        this.props.setEvent(value);
  
        this.setState({
          eventoId: value,
          mostrarIframe: false,
          isLoading: true,
          hashtagsTwitter: [],
          hashtagsInstagram: [],
        }, () => this.consultarHashtagsDelEvento());
    }

    /**
     * Consultar Hashtags asignados al evento
     * 
     * @return {void}
     */
    consultarHashtagsDelEvento() {
        // this.props.mostrarElementoDeCarga();
        
        axios.get('api/eventos/redes-sociales/consultar?eventoId=' + this.state.eventoId, {
            headers: {
                Authorization: this.state.api_token
            }
        }).then(respuesta => {
          if (respuesta.status === 200) {
            const hashtagsTwitter = (respuesta.data.hashtagsTwitter) ? JSON.parse(respuesta.data.hashtagsTwitter) : [];
            const hashtagsInstagram = (respuesta.data.hashtagsInstagram) ? JSON.parse(respuesta.data.hashtagsInstagram) : [];
            
            if (hashtagsInstagram.length === 0 && hashtagsTwitter.length === 0) {
              return this.setState({
                isLoading: false,
                mostrarIframe: true,
                hashtagsTwitter,
                hashtagsInstagram
              });
            }

            // this.props.ocultarElementoDeCarga();

            this.setState({
              hashtagsTwitter,
              hashtagsInstagram,
              mostrarIframe: true,
            }, () => this.activarIframe());

            return
          }

          swal(
              'Problema con la conexión',
              'error',
              'sweet'
          );
        })
    }

    /**
     * Lanzar Iframe con la libreria de Social Wall
     * 
     * @return {void}
     */
    activarIframe() {
      if (this.existenHashtagsParaEvento()) {
        // this.props.mostrarElementoDeCarga();
        document.getElementById("iFrameSocialWall").setAttribute("src", this.obtenerURLConParametros());
      }
    }

    /**
     * Obtener URL de la libreria con los datos de configuracion
     * 
     * @return {string}
     */
    obtenerURLConParametros() {
        return this.state.urlParaIframe + "?hashtagsTwitter=" + 
        encodeURIComponent(
            JSON.stringify(
                this.obtenerHashtagsSinSimbolo(this.state.hashtagsTwitter)
            )
        ) +
        "&hashtagsInstagram=" + encodeURIComponent(
            JSON.stringify(
                this.obtenerHashtagsSinSimbolo(this.state.hashtagsInstagram)
            )
        ) +
        "&eventoId=" + this.state.eventoId;
    }

    /**
     * Obtener hashtags sin caracter #
     * 
     * @param {array} hashtags
     * @return {void}
     */
    obtenerHashtagsSinSimbolo(hashtags) {
        return hashtags.map((hashtag) => 
            (hashtag[0] === "#") ? hashtag.substring(1) : hashtag
        );
    }

    /**
     * Colocar iFrame de Social Wall en pantalla completa
     * 
     * @return {void}
     */
    colocarPantallaCompleta() {
        let elementoIframe = document.getElementById("iFrameSocialWall");

        if (!elementoIframe)
            return

        if (elementoIframe.requestFullscreen) {
            elementoIframe.requestFullscreen();
        } else if (elementoIframe.mozRequestFullScreen) { /* Firefox */
            elementoIframe.mozRequestFullScreen();
        } else if (elementoIframe.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elementoIframe.webkitRequestFullscreen();
        } else if (elementoIframe.msRequestFullscreen) { /* IE/Edge */
            elementoIframe.msRequestFullscreen();
        }

        this.crearIntervaloDeTransicionDeContenido();
    }

    /**
     * Agregar|Retirar Filtro de tipo de contenido (Twitter o Instagram o ambos)
     * 
     * @return {void}
     */
    editarFiltroDeTipoDeContenido() {

        this.mostrarFiltros = !this.mostrarFiltros;

        document.getElementById('iFrameSocialWall')
            .contentDocument
            .getElementsByClassName("filter-items")[0]
            .style
            .visibility = (this.mostrarFiltros) ? "visible" : "hidden";
    }

    /**
     * Agregar evento de Full Screen a Iframe
     * 
     * @return {void}
     */
    agregarEventoPantallaCompletaAIframe () {
      this.setState({
        isLoading: false,
      });
      
      let eventosFullScreens = [
        'fullscreenchange',
        'mozfullscreenchange',
        'webkitfullscreenchange',
        'msfullscreenchange'
      ];

      eventosFullScreens.forEach(evento => (
        document.getElementById('iFrameSocialWall').addEventListener(evento, () => {
          this.editarFiltroDeTipoDeContenido();
        })
      ));

      // this.ocultarBotonDeCargarMas();
      this.crearIntervaloDeActualizaciones();
      this.guardarContenidoDeLasPublicaciones();
    }

    /**
     * Comprobar si existen hashtags para el evento
     * 
     * @return {boolean}
     */
    existenHashtagsParaEvento() {
        return (this.state.hashtagsTwitter.length > 0 || this.state.hashtagsInstagram.length > 0) ? true : false;
    }

    /**
     * Almacenar contenido de las publicaciones recibidas
     * 
     * @return {void}
     */
    guardarContenidoDeLasPublicaciones() {
        let publicacionesExtraidas = this.obtenerContenidoDeLasPublicaciones();
        let publicaciones = [];

        for (let publicacion of publicacionesExtraidas) {
            publicaciones.push({
                id: publicacion.id,
                tipo: publicacion.classList.item(1),
                imagen: (publicacion.getElementsByClassName('icbox').length > 0) ? publicacion.getElementsByClassName('icbox')[0].href : null,
                texto: (publicacion.getElementsByClassName("sb-text")[0]) ? publicacion.getElementsByClassName("sb-text")[0].innerText : ""
            });
        }

        this.setState({publicaciones}, () => this.moderarContenidoDeLasPublicaciones());
    }

    /**
     * Obtener contenido de las publicaciones recibidas
     * 
     * @return {void}
     */
    obtenerContenidoDeLasPublicaciones() {      
      return document.getElementById('iFrameSocialWall')
        .contentDocument
        .getElementsByClassName("sb-item");
    }

    /**
     * Moderar contenido de las publicaciones
     * 
     * @return {void}
     */
    moderarContenidoDeLasPublicaciones() {
        // Microsoft Content Moderator limita 10 peticiones por segundo
        let indice = 0;
        let ultimoIndice = 5;

        let intervaloDePeticiones = setInterval(() => {

            for (indice = ultimoIndice - 5; indice < ultimoIndice; indice++) {

                if (!this.state.publicaciones[indice]) {
                    clearInterval(intervaloDePeticiones);
                    this.props.ocultarElementoDeCarga();

                    this.retirarPublicacionesOfensivas();

                    this.mostrarBotonPantallaCompleta();
                    this.mostrarIframeSocialWall();

                    break;
                }

                /* if (this.state.publicaciones[indice].imagen) {
                    this.moderarImagenOfensiva(this.state.publicaciones[indice]);
                }
                
                this.moderarTextoOfensivo(this.state.publicaciones[indice]); */
            }

            ultimoIndice += 5;
        }, 1000);
    }

    /**
     * Verificar si la publicacion contiene texto ofensivo
     * 
     * @param {object} publicacion
     * @return {void}
     */
    moderarTextoOfensivo(publicacion) {
        axios.post(this.state.urlModerarTextoOfensivo, 
        {
            data: publicacion.texto
        }, 
        {
            headers: {
                'Content-Type': 'text/plain',
                'Ocp-Apim-Subscription-Key': 'bbdb1062a9ce455a97022f6a330efd8f'
            }
        }).then((respuesta) => {
            if (respuesta.data.Terms)
                this.etiquetarPublicacionComoOfensiva(publicacion);
        });
    }

    /**
     * Verificar si la publicacion contiene una Imagen ofensiva
     * 
     * @param {object} publicacion
     * @return {void}
     */
    moderarImagenOfensiva(publicacion) {
        axios.post(this.state.urlModerarImagenOfensiva,
        JSON.stringify({
            DataRepresentation: "URL",
            Value: publicacion.imagen
        }), 
        {
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': 'bbdb1062a9ce455a97022f6a330efd8f'
            }
        }).then((respuesta) => {
            if (respuesta.data.IsImageAdultClassified || respuesta.data.IsImageRacyClassified) {
                this.etiquetarPublicacionComoOfensiva(publicacion);
            }
        }).catch(error => console.log(publicacion));
    }

    /**
     * Activar visibilidad del boton de pantalla completa
     * 
     * @return {void}
     */
    mostrarBotonPantallaCompleta() {

        if (this.state.publicaciones.length === 0) 
            return

        this.setState({ mostrarBotonPantallaCompleta: true });
    }

    /**
     * Activar visibilidad del Iframe
     * 
     * @return {void}
     */
    mostrarIframeSocialWall() {
      // const [ noData ] = document.getElementById('iFrameSocialWall').contentDocument.getElementsByClassName('sboard-nodata');
      // noData.style = 'display: none;';

      this.setState({ 
        estilosIframe: {
          width: "inherit",
          border: "none",
          visibility: "visible"
        }
      });
    }

    /**
     * Retirar publicaciones con contenido ofensivo
     * 
     * @return {void}
     */
    retirarPublicacionesOfensivas() {
        this.configurarFiltroParaPublicacionesSeguras();
        this.simularClickSobreFiltro();
    }

    /**
     * Configurar filtro de ver todas, para publicaciones seguras
     * 
     * @return {void}
     */
    configurarFiltroParaPublicacionesSeguras() {
        document.getElementById('iFrameSocialWall')
            .contentDocument
            .getElementsByClassName("filter-label")[0]
            .setAttribute('data-filter', '.sb-twitter, .sb-instagram, .sb-rss');
    }

    /**
     * Etiquetar publicacion como ofensiva
     * 
     * @param {object} publicacion
     * @return {void}
     */
    etiquetarPublicacionComoOfensiva(publicacion) {
        document.getElementById('iFrameSocialWall')
            .contentDocument
            .getElementById(publicacion.id)
            .classList
            .remove(publicacion.tipo);
    }

    /**
     * Simular Click sobre filtro "Ver todas"
     * 
     * @return {void}
     */
    simularClickSobreFiltro() {
        document.getElementById('iFrameSocialWall')
            .contentDocument
            .getElementsByClassName("filter-label")[0]
            .click();
    }

    /**
     * Crear intervalo de actualizacion de publicaciones
     * 
     * @return {void}
     */
    crearIntervaloDeActualizaciones() {
        let intervaloDeActualizacion = setInterval(() => {
            this.consultarNuevasPublicaciones();
        }, 20000);

        this.setState({ intervaloDeActualizacion });
    }

    /**
     * Consultar nuevo lote de publicaciones
     * 
     * @return {void}
     */
    consultarNuevasPublicaciones() {

        // let botonDeCargarMas = document.getElementById('iFrameSocialWall').contentDocument.getElementsByClassName('sb-loadmore')[0];

        // if (botonDeCargarMas)
        //     document.getElementById('iFrameSocialWall')
        //         .contentDocument
        //         .getElementsByClassName('sb-loadmore')[0]
        //         .click();
    }

    /**
     * Limpiar intervalo de actualizacion de publicaciones
     * 
     * @return {void}
     */
    limpiarIntervaloDeActualizacion() {
        if (this.state.intervaloDeActualizacion)
            clearInterval(this.state.intervaloDeActualizacion);

        this.limpiarIntervaloDeTransicion()
    }

    limpiarIntervaloDeTransicion() {
        if (this.state.intervaloDeScroll)
            clearInterval(this.state.intervaloDeScroll);
    }

    /**
     * Ocultar boton de "Ver mas"
     * 
     * @return {void}
     */
    ocultarBotonDeCargarMas() {
      let contenedorDePublicaciones = document.getElementById('iFrameSocialWall').contentDocument.getElementById('sb_wall1');
      let elementoDeEstilo = document.createElement("style");
      let definicionesDeEstilo = document.createTextNode(".sb-loadmore { visibility: hidden; }");

      elementoDeEstilo.appendChild(definicionesDeEstilo);
      contenedorDePublicaciones.appendChild(elementoDeEstilo);
    }

    /**
     * Crear intervalo de descenso del Scroll
     * 
     * @return {void}
     */
    crearIntervaloDeTransicionDeContenido() {
        
        let intervaloDeScroll = setInterval(() => this.descenderScroll(), 10000);

        this.setState({ intervaloDeScroll });
    }

    /**
     * Descender Scroll de Iframe
     * 
     * @return {void}
     */
    descenderScroll() {

        let coordenadaActualY = this.obtenerCoordenadaDelScroll();

        document.getElementById('iFrameSocialWall')
            .contentDocument
            .body
            .scrollTop = coordenadaActualY + 800;
    }

    /**
     * Obtener coordenada Y del Scroll del Iframe
     * 
     * @return {void}
     */
    obtenerCoordenadaDelScroll() {
        return document.getElementById('iFrameSocialWall')
            .contentDocument
            .body
            .scrollTop;
    }

    render() {
      return (
        <div>
          <Menu usuario={this.state.user} />
          <Header usuario={this.state.user} history={this.props.history} />
          <div className="content-wrapper">
            <header className="page-header">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-2">
                    <h5>
                      <FontAwesomeIcon icon="photo-video" color="#fff"/> 
                      {` `} Social Wall
                    </h5>
                  </div>
                  <div className="col-sm-7">
                    <div className="row">
                      <div className="col-md-6">
                        <select
                          name="company"
                          className="form-control form-control-sm"
                          onChange={this.handleCompanyChange}
                          value={this.state.company}
                        >
                          <option value="">Selecione una Empresa</option>
                          {this.props.companies.map(company => (
                            <option key={company.id} value={`${company.id}`}>
                              {company.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <select 
                          name="event"
                          className="form-control form-control-sm" 
                                                        className="form-control form-control-sm" 
                          className="form-control form-control-sm" 
                          onChange={this.handleEventChange}
                          value={this.props.eventId}
                        >
                          <option value="">Seleccione un Evento</option>
                          {this.props.eventos.map(event => (
                            <option key={event.id} value={`${event.id}`}>
                              {event.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    {this.state.mostrarBotonPantallaCompleta &&
                      <div className="ml-auto">
                        <button
                          type="button"
                          className="btn btn-sm btn-dark ml-4"
                          onClick={this.colocarPantallaCompleta}
                        >
                          <i className="fas fa-arrows-alt" />
                          {` `} Fullscreen
                        </button>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </header>
            <div id="sweet" className="container-fluid">
              {this.state.isLoading &&
                <div className="text-center">
                  <FontAwesomeIcon color="#fff" icon="sync" spin />
                </div>
              }
              <React.Fragment>
                {(this.state.mostrarIframe && !this.existenHashtagsParaEvento()) &&
                  <Mensaje
                    icono="fas fa-exclamation-circle"
                    texto="No existen hashtags registrados en el evento"
                  />
                }
                {(this.state.mostrarIframe && this.existenHashtagsParaEvento()) &&
                  <iframe
                    id="iFrameSocialWall"
                    style={this.state.estilosIframe}
                    onLoad={this.agregarEventoPantallaCompletaAIframe}
                  >
                  </iframe>
                }
              </React.Fragment>
            </div>
          </div>
        </div>
      );
    }
}

const mapStateToProps = state => ({
    companyId: state.multimedia.companyId,
    eventId: state.multimedia.eventId,
    companies: state.multimedia.companies,
    eventos: state.multimedia.eventos
});

const mapDispatchToProps = dispatch => ({
    setCompany: (companyId) => dispatch(setCompany(companyId)),
    setEvent: (eventId) => dispatch(setEvent(eventId)),
    getCompanies: () => dispatch(getCompanies()),
    getEvents: (userId, apiToken) => dispatch(getEventos(userId, apiToken)),
    getEventsFromCompany: (companyId) => dispatch(getEventsFromCompany(companyId)),
    mostrarElementoDeCarga: () => dispatch(mostrarElementoDeCarga()),
    ocultarElementoDeCarga: () => dispatch(ocultarElementoDeCarga())
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialWall);