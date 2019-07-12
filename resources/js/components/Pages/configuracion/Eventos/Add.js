import React, { Component } from "react";
import axios from "axios";
import Menu from "../../../components/Menu";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";

import "../../css/configuracion/Biblioteca.css";

export default class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            usuario: JSON.parse(localStorage.getItem("usuario")),
            idEmpresa: props.history.location.state.empresaId,
            permisoUsuario: JSON.parse(localStorage.getItem("permisosUsuario")),
            eventos: JSON.parse(localStorage.getItem("eventos")),
            evento: null,
            eventoid: null,
            archivos: [],
            categorias: [],
            categoriaSeleccionada: "",
            paises : JSON.parse(localStorage.getItem("paises")),
            estados : JSON.parse(localStorage.getItem("estados")),
            estadoSeleccionado: "",
            appSeleccionado:"",
            isLoading: true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileInput = React.createRef();
    }

    componentDidMount() {
        this.state.eventoid = this.props.match.params.id;
        axios.get("api/biblioteca/evento/files/data-add").then(res => {
            console.log(res);
            this.setState({
                isLoading: false,
                categorias: res.data.data.categorias,
                idCategoria: res.data.data.categorias[0]._id,
                nombreArchivo: "",
                estados: res.data.data.estados
            });
        });
    }

    handleInputChange(e) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (name == "nombreArchivo") {
            this.setState({
                nombreArchivo: value
            });
        } else {
            this.setState({
                idCategoria: value
            });
        }
    }

    handleChange(e){
        console.log(e)
    }

    handleSubmit(e) {
        $("button#save-file").prepend('<i class="fa fa-spinner fa-spin"></i> ');
        e.preventDefault();
        let formData = new FormData();
        formData.append("id-evento", this.state.eventoid);
        formData.append("name", this.state.nombreArchivo);
        console.log(this.state.nombreArchivo);
        formData.append("categoria", this.state.idCategoria);
        formData.append(
            "archivo",
            this.fileInput.current.files[0] === undefined
                ? ""
                : this.fileInput.current.files[0]
        );
        console.log(formData);
        axios.post("api/biblioteca/evento/add-file", formData).then(res => {
            $("button#save-file")
                .find("i.fa")
                .remove();
            if (res.data.code === 200) {
                Swal.fire({
                    text: "Archivo agregado exitosamente",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#343a40",
                    confirmButtonText: "OK",
                    target: document.getElementById("sweet")
                }).then(result => {
                    if (result.value) {
                        this.props.history.push(
                            `/biblioteca/evento/${this.state.eventoid}`
                        );
                    }
                });
            } else if (res.data.code === 500) {
                sweetalert(
                    "Error al agregar archivo. Consulte al Administrador.",
                    "error",
                    "sweet"
                );
            }
        });
    }

    render() {
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
                                        <h1 class="page-header-heading">
                                            <i class="fas fa-calendar-week page-header-heading-icon" />
                                            &nbsp;
                                            <Link to="/empresas">
                                                Empresa
                                            </Link>{" "}
                                            /{" "}
                                            <Link
                                                to={`/empresa/evento/${
                                                    this.state.idEmpresa
                                                }`}
                                            >
                                                / Eventos
                                            </Link>{" "}
                                            / Agregar Evento
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div id="sweet" className="container-fluid">
                            <h3>
                                <i class="fa fa-spinner fa-spin" /> Cargando
                                espere
                            </h3>
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
                                            <i className="fas fa-book page-header-heading-icon" />
                                            &nbsp;
                                            <Link to="/biblioteca">
                                                Biblioteca
                                            </Link>{" "}
                                            /{" "}
                                            <Link
                                                to={`/biblioteca/evento/${
                                                    this.state.eventoid
                                                }`}
                                            >
                                                Archivos
                                            </Link>
                                            / Añadir Archivo
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <div id="sweet" className="container-fluid">
                            <ul
                                class="nav nav-pills mb-3"
                                id="pills-tab"
                                role="tablist"
                            >
                                <li class="nav-item">
                                    <a
                                        class="nav-link active"
                                        id="pills-datos-tab"
                                        data-toggle="pill"
                                        href="#pills-datos"
                                        role="tab"
                                        aria-controls="pills-datos"
                                        aria-selected="true"
                                    >
                                        Datos
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        id="pills-logo-tab"
                                        data-toggle="pill"
                                        href="#pills-logo"
                                        role="tab"
                                        aria-controls="pills-logo"
                                        aria-selected="false"
                                    >
                                        Logo
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a
                                        class="nav-link"
                                        id="pills-invitados-tab"
                                        data-toggle="pill"
                                        href="#pills-invitados"
                                        role="tab"
                                        aria-controls="pills-invitados"
                                        aria-selected="false"
                                    >
                                        APP Invitados
                                    </a>
                                </li>
                            </ul>

                            <hr class="line-gray" />

                            <form id="form-add-evento" class="form-change-password form" enctype="multipart/form-data">

<div class="tab-content" id="pills-tabContent">
    <div class="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

        <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Nombre Evento</label>
            <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" id="nombre" name="nombre" placeholder="Ingrese el nombre del evento"  />
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Fecha</label>
            <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" id="fecha" name="fecha" placeholder="Ingrese la fecha del evento"  />
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Hora</label>
            <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" id="hora" name="hora"  placeholder="Ingrese la hora del evento"  />
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Licencias</label>
            <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" id="licencias" name="licencias"  placeholder="Ingrese la cantidad de licencias del evento"  />
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">País</label>
            <div class="col-sm-4">
                <select class="form-control form-control-sm" id="pais" name="paisSeleccionado" value={this.state.paisSeleccionado} onChange={this.handleChange}>
                    <option value="">Seleccione</option>
                    {this.state.paises.map(
                    (e, index) => {
                        return (
                            <option value={e._id} key={index}>{e.Nombre}</option>
                        )
                    }
                    )}
                </select>
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Latitud</label>
            <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" id="latitud" name="latitud"  placeholder="Ingrese la latitud"  />
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Longitud</label>
            <div class="col-sm-4">
                <input type="text" class="form-control form-control-sm" id="longitud" name="longitud"  placeholder="Ingrese la longitud"  />
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Ubicación</label>
            <div class="col-sm-4">

                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio" value="g" id="customRadioInline1" name="ubicacion" class="custom-control-input"/>
                    <label class="custom-control-label" for="customRadioInline1">GPS</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                    <input type="radio"  value="m" id="customRadioInline2" name="ubicacion" class="custom-control-input" checked="checked"/>
                    <label class="custom-control-label" for="customRadioInline2">Manual</label>
                </div>

            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm" >App &nbsp;</label>
            <div class="col-sm-4">
                <select class="form-control form-control-sm" id="estatus" name="appSeleccionado" value={this.state.estadoSeleccionado} onChange={this.handleChange}>
                    <option value="">Seleccione</option>
                        {this.state.estados.map(
                        (e, index) => {
                            return (
                                <option value={e._id} key={index}>{e.Nombre}</option>
                            )
                        }
                        )}
                </select>
            </div>
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Estado</label>
            <div class="col-sm-4">
                <select class="form-control form-control-sm" id="estatus" name="estadoSeleccionado" value={this.state.estadoSeleccionado} onChange={this.handleChange}>
                    <option value="">Seleccione</option>
                    {this.state.estados.map(
                    (e, index) => {
                        return (
                            <option value={e._id} key={index}>{e.Nombre}</option>
                        )
                    }
                    )}
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
            <span class="btn btn-dark btn-file">Subir Imagen <input type="file" id="logo" name="logo"/></span>
        </div>

        <div id="div-add-emp-img" class="text-center area-cropper">
            <img id="preview-add-emp" src="" class="rounded img-example preview-add" alt=""/>
        </div>

        <input type="hidden" id="add-x"/>
        <input type="hidden" id="add-y"/>
        <input type="hidden" id="add-w"/>
        <input type="hidden" id="add-h"/>

    </div>

    <div class="tab-pane fade" id="pills-invitados" role="tabpanel" aria-labelledby="pills-invitados-tab">

        <div class="alert alert-primary mb-4" role="alert">
            <i class="fas fa-info-circle"></i>&nbsp;
            Seleccione los menús que estaran habilitado en la App para el evento.
        </div>

        <div class="form-group row">
            <label class="col-sm-2 col-form-label col-form-label-sm">Menús</label>
            <div class="col-sm-4">
                {/*<select class="form-control form-control-sm" id="menuapp" name="menuapp" multiple="multiple">
                    @foreach($menusapp as $ma)
                        <option value="{{ $ma->_id }}">{{ $ma->Nombre }}</option>
                    @endforeach
                </select>*/}
            </div>
        </div>

    </div>


</div>

<div class="form-group row">
    <div class="col-sm-4">
        <button type="button" id="save-evento" class="btn btn-sm btn-dark mr-2">Guardar</button>

        <Link to={`/empresa/evento/${this.state.idEmpresa}`}>
            <button type="button" class="btn btn-sm btn-dark">Volver</button>
        </Link>
    </div>
</div>

</form>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
