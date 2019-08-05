import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            usuario: this.props.usuario,
            permisosUsuario: {},
            api_token: localStorage.getItem("api_token"),
            isLoading: true
        };
    }

    getPermisos() {
        axios
            .get("api/usuarios/permisos/" + this.state.usuario.Rol_id, {
                headers: {
                    Authorization: this.state.api_token
                }
            })
            .then(res => {
                let r = res.data.data;
                localStorage.setItem(
                    "permisosUsuario",
                    JSON.stringify({
                        nombre: r.Nombre,
                        permisos: r.Permisos
                    })
                );
                this.setState({
                    permisosUsuario: {
                        nombre: r.Nombre,
                        permisos: r.Permisos
                    },
                    isLoading: false
                });
            });
    }

    render() {
        /** el siguiente if compara si tengo guardada en cache los permisos
         * del usuario logeado
         */
        if (!JSON.parse(localStorage.getItem("permisosUsuario"))) {
            this.getPermisos();
        } else {
            this.state.permisosUsuario = JSON.parse(
                localStorage.getItem("permisosUsuario")
            );
            this.state.isLoading = false;
        }

        if (this.state.isLoading) {
            return "";
        } else {
            let permisos = this.state.permisosUsuario.permisos;
            if (!permisos.multimedia) {
                permisos.multimedia = [];
            }
            if (!permisos.biblioteca) {
                permisos.biblioteca = [];
            }
            if (!permisos.angenda) {
                permisos.agenda = [];
            }
            if (!permisos.empresa) {
                permisos.empresa = [];
            }
            if (!permisos.cliente) {
                permisos.cliente = [];
            }
            if (!permisos.monitor) {
                permisos.monitor = [];
            }
            if (!permisos.usuario) {
                permisos.usuario = [];
            }
            if (!permisos.etapas) {
                permisos.etapas = [];
            }
            if (!permisos.angenda) {
                permisos.agenda = [];
            }
            if (!permisos.platos) {
                permisos.platos = [];
            }
            return (
                <aside className="left-sidebar">
                    <ul className="sidebar-nav mt-3">
                        <li className="sidebar-nav-link active">
                            <Link to="/welcome">
                                <i className="fas fa-tachometer-alt sidebar-nav-link-logo" />{" "}
                                Dashboard
                            </Link>
                        </li>

                        {permisos.multimedia.includes("show") ? (
                            <li className="sidebar-nav-link">
                                <Link to="/multimedia">
                                    <i className="fas fa-compact-disc sidebar-nav-link-logo" />{" "}
                                    Multimedia
                                </Link>
                            </li>
                        ) : (
                            ""
                        )}

                        <li className="sidebar-nav-link sidebar-nav-link-group">
                            <a
                                data-subnav-toggle
                                data-toggle="collapse"
                                href="#submenu-invitacion"
                                role="button"
                                aria-expanded="false"
                                aria-controls="submenu-invitacion"
                            >
                                <i className="fas fa-user-friends sidebar-nav-link-logo" />{" "}
                                Invitados
                                <span className="fa fa-chevron-right subnav-toggle-icon subnav-toggle-icon-closed" />
                                <span className="fa fa-chevron-down subnav-toggle-icon subnav-toggle-icon-opened" />
                            </a>

                            <div className="row">
                                <div
                                    className="collapse multi-collapse offset-1"
                                    id="submenu-invitacion"
                                >
                                    <ul className="sidebar-nav">
                                        {/*@if(true)*/}
                                        {true ? (
                                            <li className="sidebar-nav-link">
                                                <Link to="/invitacion">
                                                    <i className="fas fa-envelope-open-text sidebar-nav-link-logo" />{" "}
                                                    Invitación
                                                </Link>
                                            </li>
                                        ) : (
                                            ""
                                        )}

                                        {/*@endif*/}

                                        {/*@if(true)*/}
                                        {true ? (
                                            <li className="sidebar-nav-link">
                                                <Link to="/invitados">
                                                    <i className="fas fa-user-friends sidebar-nav-link-logo" />{" "}
                                                    Invitados
                                                </Link>
                                            </li>
                                        ) : (
                                            ""
                                        )}

                                        {/*@endif*/}

                                        {/*@if(true)*/}
                                        {true ? (
                                            <li className="sidebar-nav-link">
                                                <a href="{{ route('invitados.asiento') }}">
                                                    <i className="fas fa-chair sidebar-nav-link-logo" />{" "}
                                                    Asientos
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}

                                        {/*@endif*/}

                                        {/*@if(true)*/}
                                        {true ? (
                                            <li className="sidebar-nav-link">
                                                <a href="{{ route('invitados.regalo') }}">
                                                    <i className="fas fa-gift sidebar-nav-link-logo" />{" "}
                                                    Regalos
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {/*@endif*/}
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li className="sidebar-nav-link sidebar-nav-link-group">
                            <a
                                data-subnav-toggle
                                data-toggle="collapse"
                                href="#submenu-configuracion"
                                role="button"
                                aria-expanded="false"
                                aria-controls="submenu-configuracion"
                            >
                                <i className="fas fa-tools sidebar-nav-link-logo" />{" "}
                                Configuración
                                <span className="fa fa-chevron-right subnav-toggle-icon subnav-toggle-icon-closed" />
                                <span className="fa fa-chevron-down subnav-toggle-icon subnav-toggle-icon-opened" />
                            </a>

                            <div className="row">
                                <div
                                    className="collapse multi-collapse offset-1"
                                    id="submenu-configuracion"
                                >
                                    <ul
                                        className="sidebar-nav"
                                        id="collapseExample"
                                    >
                                        {/*@if(Auth::user()->hasPermission('biblioteca', 'show'))*/}
                                        {permisos.biblioteca.includes(
                                            "show"
                                        ) ? (
                                            <li className="sidebar-nav-link">
                                                <Link to="/biblioteca">
                                                    <i className="fas fa-book sidebar-nav-link-logo" />{" "}
                                                    Biblioteca
                                                </Link>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {/*@endif*/}

                                        {/*@if(Auth::user()->hasPermission('empresa', 'show'))*/}
                                        {permisos.empresa.includes("show") ? (
                                            <li className="sidebar-nav-link">
                                                <Link to="/empresas">
                                                    <i className="fas fa-industry sidebar-nav-link-logo" />{" "}
                                                    Empresas
                                                </Link>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {/*@endif*/}

                                        {/*@if(Auth::user()->hasPermission('cliente', 'show'))*/}
                                        {permisos.cliente.includes("show") ? (
                                            <li className="sidebar-nav-link">
                                                <Link to="/invitados">
                                                    <i className="fas fa-user-tie sidebar-nav-link-logo" />{" "}
                                                    Invitados
                                                </Link>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {console.log(
                                            this.state.permisosUsuario
                                        )}
                                        {this.state.permisosUsuario.nombre ==
                                        "ADMINISTRADOR" ? (
                                            <li className="sidebar-nav-link">
                                                <Link to="/grupos">
                                                    <i className="fas fa-users sidebar-nav-link-logo" />{" "}
                                                    Grupos
                                                </Link>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {/*@endif*/}

                                        {/*@if(Auth::user()->hasPermission('monitor', 'show'))*/}
                                        {permisos.monitor.includes("show") ? (
                                            <li className="sidebar-nav-link">
                                                <a href="{{ route('configuracion.monitor') }}">
                                                    <i className="fas fa-desktop sidebar-nav-link-logo" />{" "}
                                                    Monitor
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {/*@endif*/}

                                        {/*@if(Auth::user()->hasPermission('usuario', 'show'))*/}
                                        {permisos.usuario.includes("show") ? (
                                            <li className="sidebar-nav-link">
                                                <Link to="/usuarios">
                                                    <i className="fas fa-user-cog sidebar-nav-link-logo" />{" "}
                                                    Usuarios
                                                </Link>
                                            </li>
                                        ) : (
                                            ""
                                        )}

                                        {/*@endif*/}
                                        {/*@if(Auth::user()->hasPermission('agenda', 'show'))*/}
                                        {permisos.agenda.includes("show") ? (
                                            <li className="sidebar-nav-link">
                                                <a href="{{ route('configuracion.agenda') }}">
                                                    <i className="fas fa-address-book sidebar-nav-link-logo" />{" "}
                                                    Agendas
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {/*@endif*/}

                                        {/* {/@if(Auth::user()->hasPermission('etapas', 'show'))
                                <li className="sidebar-nav-link">
                                    <a href="{{ route('configuracion.menug_platos') }}">
                                        <i className="fas fa-coffee sidebar-nav-link-logo" />{" "}
                                        Menú Gastronómico
                                    </a>
                                </li>
                                {/*@endif -->*/}

                                        {/*@if(Auth::user()->hasPermission('etapas', 'show')) */}
                                        {permisos.etapas.includes("show") ? (
                                            <li className="sidebar-nav-link">
                                                <a href="{{ route('configuracion.menug_etapas') }}">
                                                    <i className="fas fa-folder-open sidebar-nav-link-logo" />{" "}
                                                    Menú Etapas
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {/*@endif*/}

                                        {/*@if(Auth::user()->hasPermission('platos', 'show'))*/}
                                        {permisos.platos.includes("show") ? (
                                            <li className="sidebar-nav-link">
                                                <a href="{{ route('configuracion.menug_platos') }}">
                                                    <i className="fas fa-coffee sidebar-nav-link-logo" />{" "}
                                                    Menú Platos
                                                </a>
                                            </li>
                                        ) : (
                                            ""
                                        )}
                                        {/*@endif */}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                </aside>
            );
        }
    }
}
