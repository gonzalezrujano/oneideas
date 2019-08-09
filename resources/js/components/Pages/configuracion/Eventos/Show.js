import React, { Component } from "react";
import axios from "axios";
import Menu from "../../../components/Menu";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";

import "../../css/configuracion/Biblioteca.css";
import "./css/Eventos.css";

export default class Show extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usuario: JSON.parse(localStorage.getItem("usuario")),
            permisoUsuario: JSON.parse(localStorage.getItem("permisosUsuario")),
            paises: [],
            estados: [],
            menuAppInvitados:[],
            idEvento: this.props.match.params.id,
            nombre:"",
            fecha:"",
            hora:"",
            licencias:"",
            paisSeleccionado:"",
            latitud:"",
            longitud:"",
            ubicacion:"",
            estado:"",
            app:"",
            menuAppSeleccionados: [],
            infoEvento:"",
            logo:"",
            api_token: localStorage.getItem("api_token"),
            isLoading: true
        };

    }

    componentDidMount() {
        axios
            .get("api/eventos/menus",{
                headers: {
                    Authorization: this.state.api_token
                }
            })
            .then(res => {
                this.setState({
                    menuAppInvitados: res.data.data
                });
                axios.get("api/eventos/one/"+this.state.idEvento,{
                    headers: {
                        Authorization: this.state.api_token
                    }
                }).then(res=>{
                    console.log(res)
                    this.setState({
                        infoEvento:res.data.evento,
                        nombre:res.data.evento.evento.Nombre,
                        fecha:res.data.evento.evento.Fecha,
                        hora:res.data.evento.evento.Hora,
                        licencias:res.data.evento.evento.Licencias,
                        paises:res.data.evento.paises,
                        estados:res.data.evento.estados,
                        paisSeleccionado:res.data.evento.Pais_id,
                        latitud:res.data.evento.evento.Latitud,
                        longitud:res.data.evento.evento.Longitud,
                        ubicacion:res.data.evento.evento.Ubicacion,
                        estado:res.data.evento.evento.Activo,
                        app:res.data.evento.evento.App,
                        logo:res.data.evento.evento.Logo,
                        isLoading:false
                    })
                    console.log(this.state)
                    this.infoForm()
                })
            });
        }

        infoForm(){
            var optionSelectMultiple = {
                placeholder: 'Seleccione',
                selectAllText: 'Todos',
                allSelected: 'Todos',
                countSelected: '# de % opciones'
            };
            $('#menuapp').multipleSelect(optionSelectMultiple).multipleSelect('setSelects', this.state.menuAppInvitados);
            $('#licencias').inputmask({"mask": "9999999", greedy: false, "placeholder": ""});
            var fecha = (this.state.fecha.split("/")).reverse();
            fecha = fecha.toString();
            fecha = fecha.replace(/,/g,"-");
            var ms = Date.parse(fecha);
             fecha = new Date(ms);
            $('#fecha').datetimepicker({
                format: 'DD/MM/YYYY',
                minDate: fecha,
            });
    
            $('#hora').datetimepicker({
                format: 'LT'
            });
    
            $('#div-edit-emp-img-preview').show();
            $('#div-edit-emp-img-new').hide();
        }


    render() {
        if (this.state.isLoading) {
            return (
                <div>
                <Menu usuario={this.state.usuario} />
                <Header  usuario={this.state.usuario} history={this.props.history}    />
                <div className="content-wrapper">
                    <header className="page-header">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <h1 className="page-header-heading">
                                        <i className="fas fa-user-friends page-header-heading-icon" />
                                        &nbsp;
                                        <Link to="/empresas">
                                            Empresa
                                        </Link>{" "}
                                        {" "}
                                        <Link
                                            to={`/empresa/eventos/${
                                                this.state.idEmpresa
                                            }`}
                                        >
                                            / Eventos
                                        </Link>{" "}
                                        / Mostrar Evento
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
        }else{
            return(
                <div>
                <Menu usuario={this.state.user} />
                <Header  usuario={this.state.user} history={this.props.history}    />
                <div className="content-wrapper">
                    <header className="page-header">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12 col-md-12">
                                    <h1 className="page-header-heading">
                                        <i className="fas fa-calendar-week page-header-heading-icon" />
                                        &nbsp;
                                        <Link to="/empresas">
                                            Empresa
                                        </Link>{" "}
                                        /{" "}
                                        <Link
                                            to={`/empresa/eventos/${
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
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="pills-datos-tab" data-toggle="pill" href="#pills-datos" role="tab" aria-controls="pills-datos" aria-selected="true">Datos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-logo-tab" data-toggle="pill" href="#pills-logo" role="tab" aria-controls="pills-logo" aria-selected="false">Logo</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="pills-invitados-tab" data-toggle="pill" href="#pills-invitados" role="tab" aria-controls="pills-invitados" aria-selected="false">APP Invitados</a>
                        </li>
                    </ul>

                <hr className="line-gray"/>

                <form id="form-add-evento" className="form-change-password form" encType="multipart/form-data" onSubmit={this.handleSubmit}>

                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Nombre Evento</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Ingrese el nombre del evento" value={this.state.nombre} onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Fecha</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control form-control-sm" id="fecha" name="fecha" placeholder="Ingrese la fecha del evento"  value={this.state.fecha} onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Hora</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control form-control-sm" id="hora" name="hora"  placeholder="Ingrese la hora del evento"  value={this.state.hora} onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Licencias</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control form-control-sm" id="licencias" name="licencias"  placeholder="Ingrese la cantidad de licencias del evento" value={this.state.licencias} onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">País</label>
                                <div className="col-sm-4">
                                <select className="form-control form-control-sm" id="pais" name="paisSeleccionado" value={this.state.paisSeleccionado} onChange={this.handleChange}>
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

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Latitud</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control form-control-sm" id="latitud" name="latitud"  placeholder="Ingrese la latitud"  value={this.state.latitud} onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Longitud</label>
                                <div className="col-sm-4">
                                    <input type="text" className="form-control form-control-sm" id="longitud" name="longitud"  placeholder="Ingrese la longitud"  value={this.state.longitud} onChange={this.handleChange}/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Ubicación</label>
                                <div className="col-sm-4">

                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input type="radio" value="g" id="customRadioInline1" name="ubicacion" className="custom-control-input" checked={this.state.ubicacion} onChange={this.handleChange}/>
                                        <label className="custom-control-label" htmlFor="customRadioInline1">GPS</label>
                                    </div>
                                    <div className="custom-control custom-radio custom-control-inline">
                                        <input value="m" type="radio"  id="customRadioInline2" name="ubicacion" className="custom-control-input" checked={this.state.ubicacion} onChange={this.handleChange}/>
                                        <label className="custom-control-label" htmlFor="customRadioInline2">Manual</label>
                                    </div>

                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm" >App &nbsp;</label>
                                <div className="col-sm-4">
                                    <select className="form-control form-control-sm" id="app" name="app" value={this.state.app} onChange={this.handleChange} >
                                    <option value="">Seleccione</option>
                                        {/*this.state.estados.map(
                                        (e, index) => {
                                            return (
                                                <option value={e._id} key={index}>{e.Nombre}</option>
                                            )
                                        }
                                    )*/}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Estado</label>
                                <div className="col-sm-4">
                                    <select className="form-control form-control-sm" id="estatus" name="estado" value={this.state.estado} onChange={this.handleChange}>
                                    <option value="">Seleccione</option>
                                        {/*this.state.estados.map(
                                        (e, index) => {
                                            return (
                                                <option value={e._id} key={index}>{e.Nombre}</option>
                                            )
                                        }
                                    )*/}
                                    </select>
                                </div>
                            </div>

                        </div>


                        <div className="tab-pane fade" id="pills-logo" role="tabpanel" aria-labelledby="pills-logo-tab">

                            <div className="alert alert-primary mb-4" role="alert">
                                <i className="fas fa-info-circle"></i>&nbsp;
                                La imagén a subir debe tener una resolución de <strong>200x200</strong>, en formato <strong>.jpg</strong> o <strong>.png</strong> y un peso aproximado entre <strong>10KB</strong> y <strong>5MB</strong>.
                            </div>

                            <div className="text-center btn-upload-image mb-5">
                                <span className="btn btn-dark btn-file">Subir Imagen <input type="file" id="logo" name="logo" value={this.state.logo} onChange={this.handleLogo}/></span>
                            </div>


                            <div id="div-edit-emp-img-preview" class="text-center">
                                    <img id="preview-emp-logo-edit" src={this.state.logo} class="rounded img-example preview-emp-logo-edit" alt=""/>
                                </div>

                                <div id="div-edit-emp-img-new" class="text-center area-cropper">
                                    <img id="preview-emp-logo-edit-new" src="" class="rounded img-example preview-emp-edit-new" alt=""/>
                                </div>

                            <input type="hidden" id="add-x"/>
                            <input type="hidden" id="add-y"/>
                            <input type="hidden" id="add-w"/>
                            <input type="hidden" id="add-h"/>

                        </div>

                        <div className="tab-pane fade" id="pills-invitados" role="tabpanel" aria-labelledby="pills-invitados-tab">

                            <div className="alert alert-primary mb-4" role="alert">
                                <i className="fas fa-info-circle"></i>&nbsp;
                                Seleccione los menús que estaran habilitado en la App para el evento.
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label col-form-label-sm">Menús</label>
                                <div className="col-sm-4">
                                    <select className="form-control form-control-sm" id="menuapp" name="menuAppSeleccionados" value={this.state.menuAppSeleccionados} onChange={this.handleChangeMulti} multiple="multiple">
                                    {/*this.state.menuAppInvitados.map(
                                        (e, index) => {
                                            return (
                                                <option value={e._id} key={index}>{e.Nombre}</option>
                                            )
                                        }
                                    )*/}
                                    </select>
                                </div>
                            </div>

                        </div>


                    </div>

                    <div className="form-group row">
                        <div className="col-sm-4">

                            <Link to={`/empresa/eventos/${
                                                    this.state.idEmpresa
                                                }`}><button type="button" className="btn btn-sm btn-dark">Volver</button></Link>
                        </div>
                    </div>

                </form>
                    </div>
                </div>
            </div>
            
            )
        }
    }
}
