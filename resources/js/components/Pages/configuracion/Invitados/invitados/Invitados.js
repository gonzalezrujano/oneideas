import React, { Component } from "react";
import axios from "axios";
import Menu from "../../../../components/Menu";
import Header from "../../../../components/Header";
import { Link } from "react-router-dom";

import "./css/invitados.css";
export default class Invitados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: JSON.parse(localStorage.getItem("usuario")),
            permisoUsuario: JSON.parse(localStorage.getItem("permisosUsuario")),
            invitados: [],
            opcion: "Invitacion",
            footer: "Footer",
            eventos: JSON.parse(localStorage.getItem("eventos")),
            api_token: localStorage.getItem("api_token"),
            isLoading: true,
            isLoadingEmpresa: true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        /*axios
            .get("api/invitados", {
                headers: { Authorization: this.state.api_token }
            })
            .then(res => {
                console.log(res);
                this.setState({
                    invitados: res.data.invitados,
                    isLoading: false
                });
            });*/
        axios
            .get("api/invitados/eliminar-todos", {
                headers: { Authorization: this.state.api_token }
            })
            .then(res => {
                console.log(res.data);
                this.setState({ isLoading: false });
            });
    }

    handleChange(event) {
        this.setState({ isLoadingEmpresa: true });
        const target = event.target;
        const value = target.value;
        this.setState({
            empresa: value
        });
        axios
            .post(
                "api/invitaciones/get-info",
                {
                    empresa: value,
                    rol: this.state.permisoUsuario.nombre,
                    id: this.state.usuario._id
                },
                {
                    headers: { Authorization: this.state.api_token }
                }
            )
            .then(res => {
                console.log(res);
                this.setState({
                    infoEmpresas: res.data.data,
                    isLoadingEmpresa: false
                });
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    <Menu usuario={this.state.user} />
                    <Header
                        usuario={this.state.user}
                        history={this.props.history}
                    />
                    <div className="content-wrapper">
                        <header className="page-header">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                        <h1 className="page-header-heading">
                                            <i className="fas fa-calendar-week page-header-heading-icon" />
                                            &nbsp; Invitados
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div id="sweet" className="container-fluid">
                            <div className="row">
                                <div className="offset-6">
                                    <h3>
                                        <i className="fa fa-spinner fa-spin" />{" "}
                                        Cagargando
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            console.log(this.state.permisoUsuario.permisos);
            return (
                <div>
                    <Menu usuario={this.state.user} />
                    <Header
                        usuario={this.state.user}
                        history={this.props.history}
                    />
                    <div className="content-wrapper">
                        <header className="page-header">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                        <h1 className="page-header-heading">
                                            <i className="fas fa-calendar-week page-header-heading-icon" />
                                            &nbsp; Invitados
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div id="sweet" className="container-fluid">
                            <div className="row mb-4">
                                <table
                                    className="table table-hover table-condensed table-dark-theme table-responsive-sm"
                                    id="dt-eventos"
                                >
                                    <thead>
                                        {this.state.permisoUsuario.permisos.evento.includes(
                                            "add"
                                        ) ? (
                                            <tr>
                                                <td>
                                                    <Link
                                                        className="btn-sm btn-dark button-add p-2"
                                                        to={"/invitados/add/"}
                                                    >
                                                        Agregar Invitado
                                                    </Link>
                                                </td>
                                            </tr>
                                        ) : (
                                            ""
                                        )}
                                        <tr className="fila-head">
                                            <th className="text-center">
                                                NOMBRE
                                            </th>
                                            <th className="text-center">
                                                APELLIDO
                                            </th>
                                            <th className="text-center">
                                                TIPO
                                            </th>
                                            <th className="text-center">
                                                GRUPO
                                            </th>
                                            <th className="text-center">
                                                ETAPAS
                                            </th>
                                            <th className="text-center">
                                                UBICACIÓN
                                            </th>
                                            <th className="text-center">
                                                MAIL
                                            </th>
                                            <th className="text-center">
                                                CONFIRMACIÓN
                                            </th>
                                            <th className="text-center">
                                                ACCIONES
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {console.log(this.state.invitados)}
                                        {/*this.state.invitados.map(
                                            (e, index) => {
                                                return (
                                                    <tr key={index} id={e._id}>
                                                        <td className="text-center">
                                                            {e.Nombre}
                                                        </td>
                                                        <td className="text-center">
                                                            {e.Apellido}
                                                        </td>
                                                        <td className="text-center">
                                                            {e.EsInvitadoAdicional ? (
                                                                <span className="badge badge-success badge-dt">
                                                                    INVITADO
                                                                    ADICIONAL
                                                                </span>
                                                            ) : (
                                                                <span className="badge badge-success badge-dt">
                                                                    INVITADO
                                                                    DIRECTO
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="text-center">
                                                            {e.Grupo_id}
                                                        </td>
                                                        <td className="text-center">
                                                            {e.Etapas}
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="text-center">
                                                                <Link
                                                                    to={
                                                                        `/invitacion/show/` +
                                                                        e._id
                                                                    }
                                                                >
                                                                    <i
                                                                        data-toggle="tooltip"
                                                                        data-placement="top"
                                                                        title="Ver"
                                                                        className="fas fa-eye icono-ver"
                                                                    />
                                                                </Link>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">
                                                            {"No disponible"}
                                                        </td>
                                                        <td className="text-center">
                                                            {e.Correo}
                                                        </td>
                                                        <td className="text-center">
                                                            {e.Confirmacion ? (
                                                                <i
                                                                    className="fa fa-check fa-lg icono-check"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <i
                                                                    style="color: #d9534f"
                                                                    className="fa fa-times fa-lg"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </td>
                                                        <td>{""}</td>
                                                    </tr>
                                                );
                                            }
                                        )*/}
                                    </tbody>
                                </table>

                                {/**esto de abajo es de php, es el texto que cambia con el menu */}
                                <footer className="content-wrapper-footer">
                                    <span>{this.state.footer}</span>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
