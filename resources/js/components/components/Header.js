import React, { Component } from "react";
import axios from "axios";
import logo from "../../../../public/images/logo-oneshow.png";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            usuario: this.props.usuario,
            isLoading: false
        };
    }

    render() {
        if (this.state.isLoading) {
            return "";
        } else {
            return (
                <header className="top-header">
                    <a href="#" className="top-header-logo">
                        <img className="logo-inside" src={logo} />
                    </a>

                    <nav
                        id="navbar-principal"
                        className="navbar navbar-default"
                    >
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <button
                                    type="button"
                                    className="navbar-sidebar-toggle"
                                    data-toggle-sidebar
                                >
                                    <span className="fas fa-arrow-left fa-xs icon-arrow visible-sidebar-sm-open" />
                                    <span className="fas fa-arrow-right fa-xs icon-arrow visible-sidebar-sm-closed" />
                                    <span className="fas fa-arrow-left fa-xs icon-arrow visible-sidebar-md-open" />
                                    <span className="fas fa-arrow-right fa-xs icon-arrow visible-sidebar-md-closed" />
                                </button>
                            </div>

                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdownMenuLink"
                                        role="button"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-user" />
                                        &nbsp;
                                        {this.state.usuario.Correo}
                                        {/*{ Str::limit(Auth::user()->nameMail(), 15) }*/}
                                    </a>
                                    <div
                                        className="dropdown-menu dropdown-menu-right dropdown-menu-sm-right"
                                        aria-labelledby="navbarDropdownMenuLink"
                                    >
                                        <a
                                            className="dropdown-item"
                                            href="{{ route('change-password') }}"
                                        >
                                            <i className="fas fa-key" />
                                            &nbsp;Cambiar Contraseña
                                        </a>
                                        <a
                                            className="dropdown-item"
                                            href="{{ route('logout') }}"
                                        >
                                            <i className="fas fa-sign-out-alt" />
                                            &nbsp;Salir
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
            );
        }
    }
}
