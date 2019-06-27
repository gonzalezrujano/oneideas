import React, { Component } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";
import Axios from "axios";
import Clock from "react-live-clock";
import Fullscreen from "react-full-screen";

export default class Multimedia extends Component {
    constructor() {
        super();
        this.state = {
            url: "",
            correo: "",
            password: "",
            eventos: [],
            sectores: [],
            usuario: JSON.parse(localStorage.getItem("usuario")),
            permisoUsuario: JSON.parse(localStorage.getItem("permisosUsuario")),
            opcion: "Multimedia",
            evento: "prueba",
            footer: "Footer",
            zonaevento: "Etc/GMT+4",
            isFull: false,
            isLoading: true
        };
    }

    getEventos() {
        console.log(this.state.usuario._id);
        Axios.get("/api/eventos/usuario/" + this.state.usuario._id).then(
            res => {
                let r = res.data.data;
                localStorage.setItem("eventosUsuario", JSON.stringify(r));
                this.setState({
                    eventos: r.eventos,
                    sectores: r.sectores,
                    isLoading: false
                });
                console.log(r);
            }
        );
    }

    render() {
        if (!JSON.parse(localStorage.getItem("eventosUsuario"))) {
            this.getEventos();
        } else {
            this.state.eventos = JSON.parse(
                localStorage.getItem("eventosUsuario")
            ).eventos;
            this.state.sectores = JSON.parse(
                localStorage.getItem("eventosUsuario")
            ).sectores;
            this.state.isLoading = false;
        }

        if (this.state.isLoading) {
            return "";
        } else {
            return (
                <Fullscreen
                    enabled={this.state.isFull}
                    onChange={isFull => this.setState({ isFull })}
                >
                    <Menu usuario={this.state.user} />
                    <Header usuario={this.state.user} />
                    <div className="content-wrapper">
                        <header className="page-header">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                        <div className="d-flex">
                                            <div className="my-2">
                                                <h1 className="page-header-heading">
                                                    <i className="fas fa-compact-disc page-header-heading-icon" />
                                                    Multimedia
                                                    <i className="fas fa-clock mr-2 ml-4" />{" "}
                                                    <Clock
                                                        format={"HH:mm:ss A"}
                                                        ticking={true}
                                                        timezone={
                                                            this.state
                                                                .zonaevento
                                                        }
                                                    />
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
                                                    {this.state.eventos.map((p, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={
                                                                    p._id +
                                                                    "_" +
                                                                    p.Empresa_id
                                                                }
                                                            >
                                                                {p.Nombre}
                                                            </option>
                                                        );
                                                    })}
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
                            <div className="col-lg-12">
                                <div className="widget widget-default">
                                    <div className="widget-body">
                                        <div
                                            className="alert alert-success"
                                            role="alert"
                                        >
                                            <i className="fas fa-info-circle" />
                                            &nbsp;
                                            <strong>Bienvenido</strong> a ONE
                                            Show Console.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/**esto de abajo es de php, es el texto que cambia con el menu */}
                            <footer className="content-wrapper-footer">
                                <span>{this.state.footer}</span>
                            </footer>
                        </div>
                    </div>
                </Fullscreen>
            );
        }
    }
}
