import React, { Component } from "react";
import axios from "axios";
import Menu from "../../../components/Menu";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";

import "../../css/configuracion/Empresas.css";

export default class AddEmpresas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: JSON.parse(localStorage.getItem("usuario")),
            permisoUsuario: JSON.parse(localStorage.getItem("permisosUsuario")),
            empresasTabla: JSON.parse(localStorage.getItem("empresasTabla")),
            paises : JSON.parse(localStorage.getItem("paises")),
            estados : JSON.parse(localStorage.getItem("estados")),
            opcion: "Empresas",
            footer: "Footer",
            eventos: JSON.parse(localStorage.getItem("eventos")),
            user: this.props.location.state,
            isLoading: true
        };
    }

    getPaises(){
        axios.get('api/empresas/paises').then(res=>{
            let r = res.data.data
        })
    }



    render() {
        if (!JSON.parse(localStorage.getItem("paises"))) {
            console.log("no esta en local storage");
            this.getPaises();
        } else {
            console.log("esta en local storage");
            this.state.isLoading = false;
        }
        console.log(this.state.empresasTabla);
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
                                        <i className="fa fa-spinner fa-spin" />{" "}
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
                            
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" id="pills-datos-tab" data-toggle="pill" href="#pills-datos" role="tab" aria-controls="pills-datos" aria-selected="true">Datos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" id="pills-logo-tab" data-toggle="pill" href="#pills-logo" role="tab" aria-controls="pills-logo" aria-selected="false">Logo</a>
                    </li>

                </ul>

                <hr class="line-gray"/>

                <form id="form-add-empresa" class="form-change-password form" enctype="multipart/form-data">

                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Identificación</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="identificacion" name="identificacion" placeholder="Ingrese el numero de identificacion fiscal"  />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Nombre</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="nombre" name="nombre" placeholder="Ingrese el nombre de la empresa"  />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Correo</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="correo" name="correo"  placeholder="Ingrese el correo de la empresa"  />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Teléfono</label>
                                <div class="col-sm-4">
                                    <input type="text" class="form-control form-control-sm" id="telefono" name="telefono"  placeholder="Ingrese el teléfono de la empresa"  />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">País</label>
                                <div class="col-sm-4">
                                    <select class="form-control form-control-sm" id="pais" name="pais">
                                        <option value="">Seleccione</option>
                                        {/*@foreach($paises as $pais)
                                            <option value="{{ $pais->_id }}">{{ $pais->Nombre }}</option>
                                        @endforeach*/}
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label col-form-label-sm">Estado</label>
                                <div class="col-sm-4">
                                    <select class="form-control form-control-sm" id="estatus" name="estatus" >
                                        <option value="">Seleccione</option>
                                        {/*@foreach($estados as $estado)
                                            <option value="{{ $estado->Valor == true ? 1 : 0 }}">{{ $estado->Nombre }}</option>
                                        @endforeach*/}
                                    </select>
                                </div>
                            </div>

                        </div>


                        <div class="tab-pane fade" id="pills-logo" role="tabpanel" aria-labelledby="pills-logo-tab">

                            <div class="alert alert-primary mb-4" role="alert">
                                <i class="fas fa-info-circle"></i>&nbsp;
                                La imagén a subir debe tener una resolución de <strong>200x200</strong>, en formato <strong>.jpg</strong> o <strong>.png</strong> y un peso aproximado entre <strong>10KB</strong> y <strong>5MB</strong>.
                            </div>

                            <div class="text-center btn-upload-image mb-5">
                                <span class="btn btn-dark btn-file">Subir Imagen <input type="file" id="emp-logo" name="emp-logo"/></span>
                            </div>

                            <div id="div-add-emp-img" class="text-center area-cropper">
                                <img id="preview-add-emp" src="" class="rounded img-example preview-add" alt=""/>
                            </div>

                            <input type="hidden" id="emp-add-x"/>
                            <input type="hidden" id="emp-add-y"/>
                            <input type="hidden" id="emp-add-w"/>
                            <input type="hidden" id="emp-add-h"/>

                        </div>

                    </div>

                    <div class="form-group row">
                        <div class="col-sm-4">
                            <button type="button" id="save-empresa" class="btn btn-sm btn-dark mr-2">Guardar</button>

                            <a href=""><button type="button" class="btn btn-sm btn-dark">Volver</button></a>
                        </div>
                    </div>

                </form>

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
