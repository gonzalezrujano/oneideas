import React, { Component } from "react";
import axios from "axios";
import Menu from "../../../components/Menu";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";

import "../../css/configuracion/Biblioteca.css";

export default class Eventos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: JSON.parse(localStorage.getItem("usuario")),
            permisoUsuario: JSON.parse(localStorage.getItem("permisosUsuario")),
            empresas: JSON.parse(localStorage.getItem("empresas")),
            idEmpresa: props.history.location.state.empresaId,
            eventosEmpresa: [],
            opcion: "Eventos",
            footer: "Footer",
            eventos: JSON.parse(localStorage.getItem("eventos")),
            user: this.props.location.state,
            isLoading: true
        };
    }

    componentDidMount() {
        axios
            .post("api/eventos/empresa", {
                idEmpresa: this.state.idEmpresa,
                rol: this.state.permisoUsuario.nombre
            })
            .then(res => {
                this.setState({
                    eventosEmpresa: res.data.eventos,
                    isLoading: false
                });
            });
    }

    render() {
        console.log(this.state.permisoUsuario);
        if (this.state.isLoading) {
            return (
                <div>
                    <Menu usuario={this.state.user} />
                    <Header usuario={this.state.user} />
                    <div className="content-wrapper">
                        <header className="page-header">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                        <h1 class="page-header-heading">
                                            <i class="fas fa-calendar-week page-header-heading-icon" />
                                            &nbsp;
                                            <Link to="/empresas">
                                                Empresa
                                            </Link>{" "}
                                            / Eventos
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div id="sweet" className="container-fluid">
                            <div className="row">
                                <div className="offset-6">
                                    <h3>
                                        <i class="fa fa-spinner fa-spin" />{" "}
                                        Cagargando
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Menu usuario={this.state.user} />
                    <Header usuario={this.state.user} />
                    <div className="content-wrapper">
                        <header className="page-header">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                        <h1 class="page-header-heading">
                                            <i class="fas fa-calendar-week page-header-heading-icon" />
                                            &nbsp;
                                            <Link to="/empresas">
                                                Empresa
                                            </Link>{" "}
                                            / Eventos
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div id="sweet" className="container-fluid">
                            <table
                                class="table table-hover table-condensed table-dark-theme table-responsive-sm"
                                id="dt-eventos"
                            >
                                <thead>
                                    {this.state.permisoUsuario.permisos.evento.includes(
                                        "add"
                                    ) ? (
                                        <tr>
                                            <td>
                                                <Link
                                                    to="/empresa/eventos/add"
                                                    className="btn-sm btn-dark button-add p-2"
                                                >
                                                    Agregar Evento
                                                </Link>
                                            </td>
                                        </tr>
                                    ) : (
                                        ""
                                    )}
                                    <tr className="fila-head">
                                        <th className="text-center">NOMBRE</th>
                                        <th className="text-center">
                                            ID EVENTO
                                        </th>
                                        <th className="text-center">FECHA</th>
                                        <th className="text-center">PAÍS</th>
                                        <th className="text-center">APP</th>
                                        <th className="text-center">ESTADO</th>
                                        <th class="text-center">ACCIONES</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.eventosEmpresa.map(
                                        (e, index) => {
                                            console.log(e);
                                            let linkEdit =
                                                "/evento/edit/" + e._id;
                                            let linkShow =
                                                "/evento/show/" + e._id;
                                            let linkEvento = "/evento/" + e._id;
                                            console.log(e);
                                            console.log(
                                                "el id del siguiente es este " +
                                                    e._id
                                            );
                                            return (
                                                <tr key={index} id={e._id}>
                                                    <td className="text-center">
                                                        {e.Nombre}
                                                    </td>
                                                    <td className="text-center">
                                                        {e.IDEvento}
                                                    </td>
                                                    <td className="text-center">
                                                        {e.Fecha}
                                                    </td>
                                                    <td className="text-center">
                                                        {e.Pais}
                                                    </td>
                                                    <td className="text-center">
                                                        {e.Activo}
                                                    </td>
                                                    <td className="text-center">
                                                        {e.App}
                                                    </td>
                                                    {this.state.permisoUsuario.permisos.evento.includes(
                                                        "show"
                                                    ) ? (
                                                        <td className="columna-icono">
                                                            <div className="text-center">
                                                                <Link
                                                                    className="mr-2"
                                                                    to={
                                                                        linkShow
                                                                    }
                                                                >
                                                                    <i
                                                                        data-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title="Ver"
                                                                        className="fas fa-eye icono-ver"
                                                                    />
                                                                </Link>
                                                                {this.state.permisoUsuario.permisos.evento.includes(
                                                                    "edit"
                                                                ) ? (
                                                                    <Link
                                                                        className="mr-2"
                                                                        to={
                                                                            linkEdit
                                                                        }
                                                                    >
                                                                        <i
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title="Editar"
                                                                            className="fas fa-edit icono-ver"
                                                                        />
                                                                    </Link>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {this.state.permisoUsuario.permisos.evento.includes(
                                                                    "delete"
                                                                ) ? (
                                                                    <Link className="mr-2">
                                                                        <i
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title="Eliminar"
                                                                            className="fas fa-trash-alt icono-ver"
                                                                            onClick={ev =>
                                                                                this.modalDelete(
                                                                                    e._id,
                                                                                    ev
                                                                                )
                                                                            }
                                                                        />
                                                                    </Link>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {this.state.permisoUsuario.permisos.evento.includes(
                                                                    "evento"
                                                                ) ? (
                                                                    <Link
                                                                        className="mr-2"
                                                                        to={
                                                                            linkEvento
                                                                        }
                                                                    >
                                                                        <i
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title="Evento"
                                                                            className="fas fa-calendar-week icono-ver"
                                                                        />
                                                                    </Link>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </div>
                                                        </td>
                                                    ) : (
                                                        ""
                                                    )}
                                                </tr>
                                            );
                                        }
                                    )}
                                </tbody>
                            </table>

                            {/**esto de abajo es de php, es el texto que cambia con el menu */}
                            <footer className="content-wrapper-footer">
                                <span>{this.state.footer}</span>
                            </footer>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
