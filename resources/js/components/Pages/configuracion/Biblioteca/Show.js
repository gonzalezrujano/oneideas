import React, { Component } from "react";
import axios from "axios";
import Menu from "../../../components/Menu";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";

import "../../css/configuracion/Biblioteca.css";

export default class Show extends React.Component {
    constructor() {
        super();
        this.state = {
            usuario: JSON.parse(localStorage.getItem("usuario")),
            evento: null,
            isLoading: true
        };
    }

    componentDidMount() {
        console.log(this.props.match.params);
        let idEvento = this.props.match.params.id;

        axios.get(`api/eventos/${idEvento}`).then(res => {
            console.log(res);
            let r = res.data;
            this.setState(() => ({
                evento: r.evento
            }));
        });

        axios.get();
    }

    render() {
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
                                            <i className="fas fa-book page-header-heading-icon" />
                                            &nbsp;
                                            <Link to="/biblioteca">
                                                Biblioteca
                                            </Link>{" "}
                                            / Ver Archivos
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div id="sweet" className="container-fluid">
                            {this.state.evento != null ? (
                                <table
                                    class="table table-hover table-condensed table-dark-theme table-responsive-sm"
                                    id="dt-files"
                                >
                                    <thead>
                                        <tr>
                                            <th>NOMBRE</th>
                                            {/*<th>TIPO</th>-*/}
                                            <th>TAMAÑO</th>
                                            <th>CATEGORIA</th>
                                            <th class="text-center">
                                                ACCIONES
                                            </th>
                                        </tr>
                                    </thead>
                                </table>
                            ) : (
                                <div
                                    className="alert alert-danger mb-4"
                                    role="alert"
                                >
                                    <i className="fas fa-info-circle" />
                                    &nbsp;No existen archivos.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
    }
}
