import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from "sweetalert2";
import logoOneShow from '../../../public/images/logo-oneshow.png';

export default class RecuperarPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            correo: '',
            isLoading: false
        };

        this.handleRecover = this.handleRecover.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleRecover(e){

        let self = this;

        self.setState({
            isLoading: true
        });

        let urlLogin = this.state.url+'/';
        let correo = this.state.correo;

        e.preventDefault();

        axios.post('/ajax-send-token-password', {correo})
            .then(res => {

                let r = res.data;

                if(r.code === 200){

                    self.setState({
                        correo: '',
                        isLoading: false
                    });

                    swal.fire({
                        title: '<i class="fa fa-check-circle"></i>',
                        text: r.msj,
                        showCancelButton: false,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.value) {

                            window.location.href = urlLogin;
                        }
                    });


                }else if(r.code === 600){

                    self.setState({
                        isLoading: false
                    });

                    swal.fire({
                        title: '<i class="fas fa-exclamation-circle"></i>',
                        text: r.msj,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok'
                    });

                }

            }).catch(function (error){

                if (error.response.status == 422){

                    self.setState({
                        isLoading: false
                    });

                    swal.fire({
                        title: '<i class="fas fa-exclamation-circle"></i>',
                        text: error.response.data,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok'
                    });

                }

            });
    }

    render() {

        let correo   = this.state.correo;
        let url      = this.state.url;

        let urlLogin    = url + '/';

        return (

            <div className="container" >
                <div className="absolute-center">

                    <form method="POST" onSubmit={this.handleRecover} className="form-login form">

                        <div className="text-center mb-4">
                            <img src={logoOneShow} className="img-fluid logo-login" alt="ONE Show"/>
                        </div>

                        <h4 className="text-center mb-4">Recuperar Contraseña</h4>

                        <div className="form-group">
                            <input type="text" className="form-control input-lg" id="correo" name="correo" value={correo} onChange={this.handleChange} placeholder="Ingresa tu correo" />
                        </div>

                        <button type="submit" className="btn btn-block btn-red-one">
                            { this.state.isLoading ? <i className="fas fa-sync fa-spin"></i> : '' }
                            &nbsp;&nbsp; Enviar
                        </button>

                        <ul className="login-bottom-links">
                            <li><a href={urlLogin}>Volver al login</a></li>
                        </ul>


                    </form>

                </div>
            </div>


        );
    }
}

if (document.getElementById('recuperar-password')) {

    const element = document.getElementById('recuperar-password');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<RecuperarPassword {...props} />, element);
}
