import React, { Component } from "react";
import axios from "axios";
import Menu from "../../../components/Menu";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";

import "../../css/configuracion/Biblioteca.css";

export default class Biblioteca extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: JSON.parse(localStorage.getItem("usuario")),
            permisoUsuario: JSON.parse(localStorage.getItem("permisosUsuario")),
            empresas: JSON.parse(localStorage.getItem("empresas")),
            opcion: "Biblioteca",
            footer: "Footer",
            eventos: JSON.parse(localStorage.getItem("eventos")),
            user: this.props.location.state,
            isLoading: true
        };
    }

    getEmpresas() {
        axios.get("api/empresas").then(res => {
            let r = res.data;
            console.log(r);
            localStorage.setItem("empresas", JSON.stringify(r.empresas));
            this.setState({
                empresas: r.empresas,
                isLoading: false
            });
        });
    }

    getDataTables() {
        axios
            .post("api/biblioteca", {
                rol: this.state.permisoUsuario.nombre,
                id: this.state.usuario._id
            })
            .then(res => {
                localStorage.setItem("eventos", JSON.stringify(res.data));
                this.setState({
                    eventos: res.data
                });
            });
    }

    render() {
        if (
            !JSON.parse(localStorage.getItem("empresas")) ||
            !JSON.parse(localStorage.getItem("eventos"))
        ) {
            console.log("no esta en local storage");
            this.getEmpresas();
            this.getDataTables();
        } else {
            console.log("esta en local storage");
            console.log(this.state.empresas);
            console.log(this.state.eventos);
            this.state.isLoading = false;
        }
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
                                        <h1 className="page-header-heading">
                                            <i className="fas fa-tachometer-alt page-header-heading-icon" />
                                            {this.state.opcion}
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
                                        <h1 className="page-header-heading">
                                            <i className="fas fa-tachometer-alt page-header-heading-icon" />
                                            {this.state.opcion}
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div id="sweet" className="container-fluid">
                            <div className="form-inline mb-3">
                                <label className="my-1 mr-2 form-control-sm">
                                    <strong>Empresa</strong>
                                </label>
                                {this.state.permisoUsuario.nombre ==
                                "ADMINISTRADOR" ? (
                                    <select
                                        className="form-control form-control-sm my-1 mr-sm-2 col-2"
                                        id="pro-find-empresa"
                                        name="pro-find-empresa"
                                    >
                                        <option value="">Todas</option>
                                        {this.state.empresas.map((e, index) => {
                                            return (
                                                <option
                                                    value={e._id}
                                                    key={index}
                                                >
                                                    {e.Nombre}
                                                </option>
                                            );
                                        })}
                                    </select>
                                ) : (
                                    <select
                                        className="form-control form-control-sm my-1 mr-sm-2 col-2"
                                        id="pro-find-empresa"
                                        name="pro-find-empresa"
                                        disabled
                                    />
                                )}

                                <button
                                    id="p-buscar"
                                    className="btn btn-dark btn-sm mr-1"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Buscar"
                                >
                                    <i
                                        className="fa fa-search"
                                        aria-hidden="true"
                                    />
                                </button>
                                <button
                                    id="p-limpiar"
                                    className="btn btn-dark btn-sm mr-1"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Limpiar Busqueda"
                                >
                                    <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            <table
                                className="table table-hover table-condensed table-dark-theme table-responsive-sm"
                                id="dt-eventos"
                            >
                                <thead>
                                    <tr className="fila-head">
                                        <th className="text-center">EMPRESA</th>
                                        <th className="text-center">EVENTO</th>
                                        <th className="text-center">FECHA</th>
                                        <th className="text-center">APP</th>
                                        <th className="text-center">
                                            ARCHIVOS
                                        </th>
                                        <th className="text-center">
                                            ACCIONES
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.eventos.map((e, index) => {
                                        console.log(e);
                                        let link =
                                            "/biblioteca/evento/" + e._id;
                                        return (
                                            <tr key={index}>
                                                <td className="text-center">
                                                    {e.Empresa}
                                                </td>
                                                <td className="text-center">
                                                    {e.Evento}
                                                </td>
                                                <td className="text-center">
                                                    {e.Fecha}
                                                </td>
                                                <td className="text-center">
                                                    {e.app}
                                                </td>
                                                <td className="text-center">
                                                    {e.Archivos}
                                                </td>
                                                {this.state.permisoUsuario.permisos.biblioteca.includes(
                                                    "show"
                                                ) ? (
                                                    <td className="columna-icono">
                                                        <Link to={link}>
                                                            <i
                                                                data-toggle="tooltip"
                                                                data-placement="top"
                                                                title="Ver"
                                                                className="fas fa-eye icono-ver"
                                                            />
                                                        </Link>
                                                    </td>
                                                ) : (
                                                    ""
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
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
