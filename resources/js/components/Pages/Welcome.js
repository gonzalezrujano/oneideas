import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import swal from "sweetalert2";
import Menu from "../components/Menu";
import Header from "../components/Header";

export default class Welcome extends Component {
    constructor() {
        super();
        this.state = {
            url: "",
            correo: "",
            password: "",
            opcion: "Dashboard",
            footer: "Footer",
            isLoading: false
        };
    }

    componentWillMount() {
        /**esto estaba en el template de welcome */
        localStorage.setItem("auto_load_agenda", "0");
    }

    render() {
        return (
            <div>
                <Menu />
                <Header />
                <div class="content-wrapper">
                    <header class="page-header">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-sm-12 col-md-12">
                                    <h1 class="page-header-heading">
                                        <i class="fas fa-tachometer-alt page-header-heading-icon" />
                                        {this.state.opcion}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div id="sweet" class="container-fluid">
                        <div class="col-lg-12">
                            <div class="widget widget-default">
                                <div class="widget-body">
                                    <div
                                        class="alert alert-success"
                                        role="alert"
                                    >
                                        <i class="fas fa-info-circle" />
                                        &nbsp;
                                        <strong>Bienvenido</strong> a ONE Show
                                        Console.
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/**esto de abajo es de php, es el texto que cambia con el menu */}
                        <footer class="content-wrapper-footer">
                            <span>{this.state.footer}</span>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}
