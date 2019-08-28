import React, { Component } from "react";
//import { SeatsioSeatingChart } from "@seatsio/seatsio-react";
import { SeatsioDesigner } from "@seatsio/seatsio-react";
import axios from "axios";
import Menu from "../../../components/Menu";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import "./css/planos.css";

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: JSON.parse(localStorage.getItem("usuario")),
            permisoUsuario: JSON.parse(localStorage.getItem("permisosUsuario")),
            nombre: "",
            idEvento: this.props.match.params.id,
            designerKey: this.props.location.state.designerKey,
            evento: "",
            opcion: "Etapas",
            footer: "Footer",
            eventos: JSON.parse(localStorage.getItem("eventos")),
            api_token: localStorage.getItem("api_token"),
            isLoading: true
        };
    }

    componentDidMount() {
        axios
            .get("api/eventos/one/" + this.state.idEvento, {
                headers: {
                    Authorization: this.state.api_token
                }
            })
            .then(res => {
                console.log(res);
                this.setState({
                    evento: res.data.evento.evento,
                    isLoading: false
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
                                            <i className="fas fa-ticket-alt page-header-heading-icon" />
                                            &nbsp; Planos
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
        }
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
                                        <i className="fas fa-ticket-alt page-header-heading-icon" />
                                        &nbsp;
                                        <Link
                                            to={
                                                "/eventos/etapas/" +
                                                this.state.idEvento
                                            }
                                        >
                                            Eventos
                                            {" /" + this.state.evento.Nombre}
                                        </Link>
                                        / Agregar Plano
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div id="sweet" className="container-fluid">
                        <ul
                            className="nav nav-pills mb-3"
                            id="pills-tab"
                            role="tablist"
                        >
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    id="pills-datos-tab"
                                    data-toggle="pill"
                                    href="#pills-datos"
                                    role="tab"
                                    aria-controls="pills-datos"
                                    aria-selected="true"
                                >
                                    Datos
                                </a>
                            </li>
                        </ul>

                        <hr className="line-gray" />

                        <form
                            id="form-add-usuario"
                            className="form-change-password form"
                            encType="multipart/form-data"
                        >
                            <div className="row mb-4">
                                <div className="col-10">
                                    <SeatsioDesigner
                                        designerKey={this.state.designerKey}
                                        language="es"
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-4">
                                    <Link
                                        to={{
                                            pathname:
                                                "/eventos/planos/" +
                                                this.state.idEvento,
                                            state: {
                                                link: this.state.eventoLink,
                                                nombreEmpresa: this.state
                                                    .nombreEmpresa
                                            }
                                        }}
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-dark"
                                        >
                                            Volver
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
