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
        /* axios
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
                console.log(res);
                this.setState({
                    isLoading: false
                });
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

    handleDelete(id) {
        Swal.fire({
            text: "¿Está seguro que desea borrar el grupo?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#343a40",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            target: document.getElementById("sweet")
        }).then(result => {
            if (result.value) {
                axios
                    .post(
                        "/api/invitados/delete",
                        { id },
                        {
                            headers: {
                                Authorization: this.state.api_token
                            }
                        }
                    )
                    .then(res => {
                        if (res.data.code === 200) {
                            sweetalert(
                                "Item eliminado correctamente",
                                "success",
                                "sweet"
                            );
                            $("#" + id).hide();
                        } else if (res.data.code === 600) {
                            sweetalert(
                                "Error en el Proceso de Eliminacion. Consulte al Administrador",
                                "error",
                                "sweet"
                            );
                        } else if (res.data.code == 500) {
                            sweetalert(
                                "Error al Eliminar. Consulte al Administrador",
                                "error",
                                "sweet"
                            );
                        }
                    });
            }
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
                                            <i className="fas fa-user-friends page-header-heading-icon" />
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
                                            <i className="fas fa-user-friends page-header-heading-icon" />
                                            &nbsp; Invitados
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div id="sweet" className="container-fluid">
                            <div className="row mb-4">
                                {this.state.permisoUsuario.permisos.evento.includes(
                                    "add"
                                ) ? (
                                    <div className="m-2">
                                        <Link
                                            className="btn-sm btn-dark button-add p-2"
                                            to={"/invitados/add/"}
                                        >
                                            Agregar Invitado
                                        </Link>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <table
                                    className="table table-hover table-condensed table-dark-theme table-responsive-sm"
                                    id="dt-eventos"
                                >
                                    <thead>
                                        <tr className="fila-head">
                                            <th className="text-center">
                                                NOMBRE
                                            </th>
                                            <th className="text-center">
                                                APELLIDO
                                            </th>
                                            <th className="text-center">
                                                INVITADO
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
                                                                <span>
                                                                    ADICIONAL
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    DIRECTO
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="text-center">
                                                            {e.Grupo_id}
                                                        </td>
                                                        <td className="text-center">
                                                            {e.Etapas.length}
                                                        </td>
                                                        <td>
                                                            {"NO DISPONIBLE"}
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
                                                                    className="fa fa-times fa-lg boton-negado"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </td>
                                                        <td className="text-center">
                                                            <div className="text-center">
                                                                <Link
                                                                    to={
                                                                        `/invitados/show/` +
                                                                        e._id
                                                                    }
                                                                    className="mr-2"
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
                                                                            "/invitados/edit/" +
                                                                            e._id
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
                                                                    "edit"
                                                                ) ? (
                                                                    <a
                                                                        className="mr-2"
                                                                        onClick={
                                                                            this
                                                                                .handleMail
                                                                        }
                                                                    >
                                                                        <i
                                                                            data-toggle="tooltip"
                                                                            data-placement="top"
                                                                            title="Enviar Mail"
                                                                            className="fas fa-envelope icono-ver"
                                                                        />
                                                                    </a>
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
                                                            </div>
                                                        </td>
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
