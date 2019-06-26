import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import swal from "sweetalert2";
import logoOneShow from "../../../../public/images/logo-oneshow.png";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            url: "",
            correo: "",
            password: "",
            isLoading: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleLogin(e) {
        let self = this;

        self.setState({
            isLoading: true
        });

        let urlInicio = this.state.url + "/welcome";
        let correo = this.state.correo;
        let password = this.state.password;

        e.preventDefault();

        axios
            .post("api/usuarios/login", { correo, password })
            .then(res => {
                let r = res.data;

                if (r.code === 200) {
                    self.setState({
                        correo: "",
                        password: "",
                        isLoading: false
                    });
                    console.log("log valido");
                    console.log(r);
                    localStorage.setItem("usuario", JSON.stringify(r.usuario));
                    this.props.history.push({
                        pathname: "/welcome",
                        state: r.usuario
                    });
                    //window.location.href = urlInicio;
                } else if (r.code === 600) {
                    self.setState({
                        isLoading: false
                    });

                    swal.fire({
                        title: '<i class="fas fa-exclamation-circle"></i>',
                        text: r.msj,
                        confirmButtonColor: "#343a40",
                        confirmButtonText: "Ok"
                    });
                }
            })
            .catch(function(error) {
                if (error.response.status == 422) {
                    self.setState({
                        isLoading: false
                    });

                    swal.fire({
                        title: '<i class="fas fa-exclamation-circle"></i>',
                        text: error.response.data,
                        confirmButtonColor: "#343a40",
                        confirmButtonText: "Ok"
                    });
                }
            });
    }

    render() {
        let correo = this.state.correo;
        let password = this.state.password;
        let url = this.state.url;

        let urlRecuperar = url + "/recovery-password";

        return (
            <div id="login-hidden" className="container login-display">
                <div className="absolute-center">
                    <form
                        method="POST"
                        onSubmit={this.handleLogin}
                        className="form-login form"
                    >
                        <div className="text-center mb-4">
                            <img
                                src={logoOneShow}
                                className="img-fluid logo-login"
                                alt="ONE Show"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control input-lg"
                                id="correo"
                                name="correo"
                                value={correo}
                                onChange={this.handleChange}
                                placeholder="Ingresa tu correo"
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control input-lg"
                                id="password"
                                name="password"
                                value={password}
                                onChange={this.handleChange}
                                placeholder="Ingresa tu contraseña"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-block btn-red-one"
                        >
                            {this.state.isLoading ? (
                                <i className="fas fa-sync fa-spin" />
                            ) : (
                                ""
                            )}
                            &nbsp;&nbsp; Ingresar
                        </button>

                        <ul className="login-bottom-links">
                            <li>
                                <a href={urlRecuperar}>
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        );
    }
}
