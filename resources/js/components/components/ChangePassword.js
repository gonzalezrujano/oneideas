import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from "sweetalert2";


export default class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            changePassword: props.changepassword,
            passwordnew: '',
            passwordold: '',
            passwordrepeat: '',
            isLoading: false
        };

        this.actionChangePassword = this.actionChangePassword.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    actionChangePassword(e){

        let self = this;

        self.setState({
            isLoading: true
        });

        let urlLogout = this.state.url+'/logout';

        let passwordold    = this.state.passwordold;
        let passwordnew    = this.state.passwordnew;
        let passwordrepeat = this.state.passwordrepeat;

        e.preventDefault();

        axios.post('/ajax-change-password', {passwordold, passwordnew, passwordrepeat})
            .then(res => {

                let r = res.data;

                if(r.code === 200){

                    self.setState({
                        passwordnew: '',
                        passwordold: '',
                        passwordrepeat: '',
                        changePassword: false,
                        isLoading: false
                    });

                    swal.fire({
                        title: '<i class="fa fa-check-circle"></i>',
                        text: r.msj,
                        showCancelButton: false,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok',
                        target: document.getElementById('cp')
                    }).then((result) => {
                        if (result.value) {

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
                        confirmButtonText: 'Ok',
                        target: document.getElementById('cp')

                    });

                }else if(r.code === 300){

                    self.setState({
                        passwordnew: '',
                        passwordold: '',
                        passwordrepeat: '',
                        changePassword: false,
                        isLoading: false
                    });

                    swal.fire({
                        title: '<i class="fa fa-check-circle"></i>',
                        text: r.msj,
                        showCancelButton: false,
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok',
                        target: document.getElementById('cp')
                    }).then((result) => {
                        if (result.value) {

                            window.location.href = urlLogout;

                        }
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
                        confirmButtonText: 'Ok',
                        target: document.getElementById('cp')
                    });

                }

            });
    }

    render() {

        let passwordold    = this.state.passwordold;
        let passwordnew    = this.state.passwordnew;
        let passwordrepeat = this.state.passwordrepeat;
        let changePassword = this.state.changePassword;

        return (


            <div id="cp" className="col-lg-12">

                <div className="widget widget-default">

                    <div className="widget-body">

                        <form method="POST" onSubmit={this.actionChangePassword} className="form-change-password form">

                            { changePassword ?

                                <div className="alert alert-faded-blue" role="alert">
                                    <i className="fas fa-info-circle"></i>&nbsp;Es tu primer inicio de sesión, por seguridad te recomendamos cambiar tu contraseña por la de tu preferencia.
                                </div>

                                : ''
                            }

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Contraseña actual</label>
                                <div className="col-sm-4">
                                    <input type="password" className="form-control" id="passwordold" name="passwordold" onChange={this.handleChange} placeholder="Ingrese su contraseña actual" value={passwordold} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Contraseña nueva</label>
                                <div className="col-sm-4">
                                    <input type="password" className="form-control" id="passwordnew" name="passwordnew" onChange={this.handleChange} placeholder="Ingrese su contraseña nueva" value={passwordnew} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label">Confirme contraseña</label>
                                <div className="col-sm-4">
                                    <input type="password" className="form-control" id="passwordrepeat" name="passwordrepeat" onChange={this.handleChange} placeholder="Confirme su contraseña nueva" value={passwordrepeat} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label"></label>
                                <div className="col-sm-4">
                                    <button type="submit" className="btn btn-sm btn-red-one">
                                        { this.state.isLoading ? <span><i className="fas fa-sync fa-spin"></i>&nbsp;&nbsp;</span> : '' }
                                        Cambiar
                                    </button>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>

            </div>


        );
    }
}

if (document.getElementById('change-password')) {

    const element = document.getElementById('change-password');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<ChangePassword {...props} />, element);
}
