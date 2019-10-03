import axios from 'axios';
import swal from "sweetalert2";
import Menu from "../components/Menu";
import Header from "../components/Header";
import  React, { Component } from 'react';

/*
- Conectar filtro de evento con Redux
- Componente de configuración para las opciones del Social Wall
- Hacer endpoint para guardar y consultar esas configuraciones
- Mensaje de Hashtag no encontrados para el evento
- Pasar datos al Iframe
- Componente de loader o spinner reutilizable
*/


export default class SocialWall extends Component {

    constructor(props) {
        super(props);

        this.mostrarFiltros = true;

        this.state = {
            footer: "Footer",
            estaCargando: false,
            api_token: localStorage.getItem("api_token"),
            usuario: JSON.parse(localStorage.getItem("usuario"))
        };

        this.colocarPantallaCompleta = this.colocarPantallaCompleta.bind(this);
        this.consultarHashtagsDelEvento = this.consultarHashtagsDelEvento.bind(this);
        this.editarFiltroDeTipoDeContenido = this.editarFiltroDeTipoDeContenido.bind(this);
        this.agregarEventoPantallaCompletaAIframe = this.agregarEventoPantallaCompletaAIframe.bind(this);

        this.estilosIframe = {
            width: "inherit",
            border: "none"
        };
    }

    /**
     * Consultar Hashtags asignados al evento
     * 
     * @return {void}
     */
    consultarHashtagsDelEvento() {

        axios.get('api/eventos/redes-sociales/consultar?eventoId=' + this.state.eventoId, {
            headers: {
                Authorization: this.state.api_token
            }
        }).then(respuesta => {
            if (respuesta.status === 200) {

                this.hashtagsTwitter = (respuesta.data.hashtagsTwitter) ? JSON.parse(respuesta.data.hashtagsTwitter) : [];
                this.hashtagsInstagram = (respuesta.data.hashtagsInstagram) ? JSON.parse(respuesta.data.hashtagsInstagram) : [];

                this.setState({
                    estaCargando: false
                });

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
        document.getElementById('iFrameSocialWall').addEventListener('webkitfullscreenchange', () => {
            this.editarFiltroDeTipoDeContenido();
        });
    }

    render() {
        if (this.state.estaCargando) {
            return (
                <div>Cargando...</div>
            );
        } else {
            let urlParaIframe = window.location.protocol + "//" + window.location.hostname + "/Lib";
            return (
                <div>
                    <Menu usuario={this.state.user} />
                    <Header usuario={this.state.user} history={this.props.history} />

                    <div className="content-wrapper">
                        <header className="page-header">
                            <div className="container-fluid">
                                
                                <div className="row">
                                    <div className="col-sm-6 col-md-6">
                                        <div className="d-flex">
                                            <div className="my-2">
                                                <h1 className="page-header-heading">
                                                    <div>
                                                        <i className="fas fa-photo-video page-header-heading-icon" />
                                                        Social Wall
                                                    </div>
                                                </h1>
                                            </div>
                                            <form className="form-inline ml-5">
                                                <i className="fas fa-calendar-week fa-lg mr-3" />
                                                <select
                                                    className="form-control form-control-sm form-select-event"
                                                    name="evento"
                                                >
                                                    <option value="">
                                                        Seleccione evento
                                                    </option>
                                                </select>
                                            </form>
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
                        <iframe
                            id="iFrameSocialWall"
                            style={this.estilosIframe}
                            src={urlParaIframe}
                            onLoad={this.agregarEventoPantallaCompletaAIframe}
                        >
                        </iframe>
                    </div>

                    {/**esto de abajo es de php, es el texto que cambia con el menu */}
                    <footer className="content-wrapper-footer">
                        <span>{this.state.footer}</span>
                    </footer>
                    </div>
                        
                </div>
            );
        }
    }
}