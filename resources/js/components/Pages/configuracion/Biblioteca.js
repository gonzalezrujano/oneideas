import React, { Component } from "react";
import axios from "axios";
import Menu from "../../components/Menu";
import Header from "../../components/Header";

export default class Biblioteca extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: JSON.parse(localStorage.getItem("usuario")),
            permisoUsuario: JSON.parse(localStorage.getItem("permisosUsuario")),
            empresas: JSON.parse(localStorage.getItem("empresas")),
            opcion: "Biblioteca",
            footer: "Footer",
            user: this.props.location.state,
            isLoading: true
        };
    }

    getEmpresas() {
        axios.get("api/empresas").then(res => {
            let r = res.data;
            localStorage.setItem("empresas", JSON.stringify(r.empresas));
            this.setState({
                empresas: r.empresas,
                isLoading: false
            });
        });
    }

    render() {
        if (!JSON.parse(localStorage.getItem("empresas"))) {
            console.log("no esta en local storage");
            this.getEmpresas();
        } else {
            console.log("esta en local storage");
            this.state.isLoading = false;
        }

        if (this.state.isLoading) {
            return "";
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
                                        {console.log("estoy aqui")}
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
                                    <tr>
                                        <th>EMPRESA</th>
                                        <th>EVENTO</th>
                                        <th>FECHA</th>
                                        <th>APP</th>
                                        <th>ARCHIVOS</th>
                                        <th className="text-center">
                                            ACCIONES
                                        </th>
                                    </tr>
                                </thead>
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
