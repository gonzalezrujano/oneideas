import axios from 'axios';
import swal from "sweetalert2";
import Menu from "../components/Menu";
import Header from "../components/Header";
import  React, { Component } from 'react';
import { connect } from 'react-redux';
import Mensaje from "../atoms/Mensaje";
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
            estilosIframe: {
                width: "inherit",
                border: "none"
            },
            estilosDelTituloDeLaPagina: {
                marginRight: "2rem"
            },
            urlParaIframe: window.location.protocol + "//" + window.location.hostname + "/Lib"
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
    }

    /**
     * Ejecutar despues del Render
     * 
     * @return {void}
     */
    componentDidMount () {
        this.props.mostrarElementoDeCarga();
        this.props.getCompanies().then(() => this.props.ocultarElementoDeCarga());
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
            return
        }
  
        this.props.setEvent(value);
        this.setState({ eventoId: value },
        () => this.consultarHashtagsDelEvento());
    }

    /**
     * Consultar Hashtags asignados al evento
     * 
     * @return {void}
     */
    consultarHashtagsDelEvento() {
        this.props.mostrarElementoDeCarga();
        
        axios.get('api/eventos/redes-sociales/consultar?eventoId=' + this.state.eventoId, {
            headers: {
                Authorization: this.state.api_token
            }
        }).then(respuesta => {
            if (respuesta.status === 200) {

                let hashtagsTwitter = (respuesta.data.hashtagsTwitter) ? JSON.parse(respuesta.data.hashtagsTwitter) : [];
                let hashtagsInstagram = (respuesta.data.hashtagsInstagram) ? JSON.parse(respuesta.data.hashtagsInstagram) : [];

                this.props.ocultarElementoDeCarga();

                this.setState({
                    hashtagsTwitter,
                    hashtagsInstagram,
                    mostrarIframe: true
                },
                () => this.activarIframe());

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
            this.props.mostrarElementoDeCarga();
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
        );
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

        if (elementoIframe.requestFullscreen) {
            elementoIframe.requestFullscreen();
        } else if (elementoIframe.mozRequestFullScreen) { /* Firefox */
            elementoIframe.mozRequestFullScreen();
        } else if (elementoIframe.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elementoIframe.webkitRequestFullscreen();
        } else if (elementoIframe.msRequestFullscreen) { /* IE/Edge */
            elementoIframe.msRequestFullscreen();
        }
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
    agregarEventoPantallaCompletaAIframe() {
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
        this.props.ocultarElementoDeCarga();

        // AVISAR SOBRE MODERACION DE CONTENIDO
        this.guardarContenidoDeLasPublicaciones();
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
                imagen: publicacion.getElementsByClassName("sb-img")[0].src,
                texto: publicacion.getElementsByClassName("sb-text")[0].innerText
            });
        }

        console.log(publicaciones);

        this.setState({publicaciones});
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
     * Comprobar si existen hashtags para el evento
     * 
     * @return {boolean}
     */
    existenHashtagsParaEvento() {
        return (this.state.hashtagsTwitter.length > 0 || this.state.hashtagsInstagram.length > 0) ? true : false;
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
                                <div className="col-sm-8 col-md-8">
                                    <div className="d-flex">
                                        <div className="my-2" style={this.state.estilosDelTituloDeLaPagina}>
                                            <h1 className="page-header-heading">
                                                <div>
                                                    <i className="fas fa-photo-video page-header-heading-icon" />
                                                    Social Wall
                                                </div>
                                            </h1>
                                        </div>

                                        <div className="col-sm-9">
                                            <form>
                                                <div className="form-row">
                                                <div className="col">
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
                                                <div className="col">
                                                    <select 
                                                        name="event"
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
                                            </form>
                                        </div>

                                    </div>
                                </div>

                                <div className="ml-auto">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-dark ml-4"
                                        onClick={this.colocarPantallaCompleta}
                                    >
                                        <i className="fas fa-arrows-alt" />
                                        &nbsp;Fullscreen
                                    </button>
                                </div>

                            </div>
                        </div>
                    </header>

                    <div id="sweet" className="container-fluid">
                        <>
                            {!this.state.mostrarIframe &&
                                <Mensaje
                                    icono="fas fa-photo-video"
                                    texto="Seleccione un evento para el Social Wall"
                                />
                            }
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
                                ></iframe>
                            }
                        </>
                    </div>

                    {/**esto de abajo es de php, es el texto que cambia con el menu */}
                    <footer className="content-wrapper-footer"></footer>

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