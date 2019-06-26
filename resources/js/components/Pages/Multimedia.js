import React, { Component } from "react";
import Menu from "../components/Menu";
import Header from "../components/Header";

export default class Multimedia extends Component {
    constructor() {
        super();
        this.state = {
            url: "",
            correo: "",
            password: "",
            opcion: "Multimedia",
            footer: "Footer",
            isLoading: false
        };
    }

    render() {
        console.log("abajo es el localstorage");
        console.log(JSON.parse(localStorage.getItem("usuario")));
        return (
            <div>
                {/*<Menu usuario={this.state.user} />
                <Header usuario={this.state.user} />*/}
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
                        <div className="row">Esto es Multimedia</div>
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
