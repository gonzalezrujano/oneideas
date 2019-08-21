

import React, { Component } from "react";
import axios from "axios";

import logo from "../../../../../../public/images/logo-oneshow.png";

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idConfirmacion: this.props.match.params.id,
            nombre:"",
            apellido:"",
            correo:"",
            telefono:"",
            id:"",
            idInvitado:"",
            adicionales:[],
            footer: "Footer",
            isLoading: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeAdicional = this.handleChangeAdicional.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    componentDidMount() {
        axios.post("api/mail-confirmacion",{
           idConfirmacion: this.state.idConfirmacion
        }).then(res => {
            console.log(res);
            let r = res.data;
            
            this.setState({
                id:r.invitado.id,
                idInvitado:r.invitado.invitado_id,
                nombre: r.invitado.nombre,
                apellido: r.invitado.apellido,
                correo:r.invitado.correo,
                telefono:r.invitado.telefono,
                grupo:r.invitado.grupo,
                evento:r.invitado.evento,
                adicionales: r.adicionales
            });
            this.setState({isLoading:false})
        });
    }


    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(value)
        const name = target.name;
        this.setState({
          [name]: value
        })
    }

    handleChangeAdicional(event){
        const target = event.target;
        const value = target.value;
        console.log(value)
        const arrayName = target.name.split("-");
        const name = arrayName[0];
        const index = arrayName[1];
        var adicionalesPrueba = this.state.adicionales;
        if(name=="Nombre"){
            adicionalesPrueba[index].Nombre = value;
            this.setState({
                adicionales: adicionalesPrueba
            })
        }else if(name=="Apellido"){
            adicionalesPrueba[index].Apellido = value;
            this.setState({
                adicionales: adicionalesPrueba
            })
        }else if(name=="Correo"){
            adicionalesPrueba[index].Correo = value;
            this.setState({
                adicionales: adicionalesPrueba
            })
        }else if(name == "Telefono"){
            adicionalesPrueba[index].Telefono = value;
            this.setState({
                adicionales: adicionalesPrueba
            })
        }
    }

    handleSubmit(e){
        e.preventDefault();
        let formData = new FormData()
        formData.append("id",this.state.idInvitado);
        formData.append("id_evento_invitado",this.state.id);
        formData.append("nombre", this.state.nombre);
        formData.append("apellido", this.state.apellido);
        formData.append("correo", this.state.correo);
        formData.append("telefono", this.state.telefono);
        $('#save-invitado').prepend('<i class="fa fa-spinner fa-spin"></i> ');
        axios.post("api/mail-confirmacion/datos",formData).then(res=>{
            console.log(res)
                if(res.data.code === 200) {
                    axios.post("api/mail-confirmacion/datos-listos",formData).then(res=>{
                        if (res.data.code === 200){
                            $('#save-invitado').find('i.fa').remove();
                            Swal.fire({
                                text: "Datos confirmados exitosamente",
                                type: "success",
                                showCancelButton: false,
                                confirmButtonColor: "#343a40",
                                confirmButtonText: "OK",
                                target: document.getElementById('sweet')
                            }).then((result) => {
                                if (result.value) {
                                    window.scrollTo(0, 0);
                                    location.href="http://www.oneshow.com.ar";
                                    
                                }
                            });
                        }
                        else if(res.data.code === 500){
                            sweetalert('Error al confirmar datos.', 'error', 'sweet');
                        }
                    })
                    

                }else if(res.data.code === 500){
                    sweetalert('Error al confirmar datos.', 'error', 'sweet');
                }
        }).catch(error => {
            $('button#save-usuario').find('i.fa').remove();
            sweetalert(error.response.data, 'error', 'sweet');
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>
                        <div id="sweet" className="container-fluid">
                            <div className="row">
                                <div className="offset-6">
                                <img className="logo-inside" src={logo} />
                                    <h3>
                                        <i className="fa fa-spinner fa-spin" />{" "}
                                        Cargando
                                    </h3>
                                </div>
                            </div>
                        </div>
                </div>
            );
        } else {
            console.log(this.state)
            return (
                <div>
                    <img className="logo-inside" src={logo} />
                        <div id="sweet" className="container-fluid">
                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="pills-datos-tab" data-toggle="pill" href="#pills-datos" role="tab" aria-controls="pills-datos" aria-selected="true">Datos</a>
                                </li>

                            </ul>

                            <hr className="line-gray"/>

                            <form id="form-add-usuario" className="form-change-password form" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-datos" role="tabpanel" aria-labelledby="pills-datos-tab">

                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label col-form-label-sm">Nombre</label>
                                            <div className="col-sm-4">
                                                <input type="text" className="form-control form-control-sm" id="nombre" name="nombre" placeholder="Ingrese el nombre" value={this.state.nombre} onChange={this.handleChange} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label col-form-label-sm">Apellido</label>
                                            <div className="col-sm-4">
                                                <input type="text" className="form-control form-control-sm" id="apellido" name="apellido" placeholder="Ingrese el apellido" value={this.state.apellido} onChange={this.handleChange} />
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label col-form-label-sm">Correo</label>
                                            <div className="col-sm-4">
                                                <input type="text" className="form-control form-control-sm" id="correo" name="correo" placeholder="Ingrese el correo" value={this.state.correo} onChange={this.handleChange} disabled/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label col-form-label-sm">Teléfono</label>
                                            <div className="col-sm-4">
                                                <input type="text" className="form-control form-control-sm" id="telefono" name="telefono" placeholder="Ingrese el telefono" value={this.state.telefono} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-4">
                                        <button type="submit" id="save-invitado" className="btn btn-sm btn-dark mr-2">Confirmar</button>
                                        
                                    </div>
                                </div>
                                {/*(this.state.adicionales.length)?(
                                    <div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label col-form-label-sm">Teléfono</label>
                                        </div>
                                        <div className="row">
                                                {(this.state.adicionales.map((e,index)=>{
                                                    console.log(e);
                                                        return (
                                                            <div key={e._id}>
                                                            <div className="form-group row" >
                                                                <label className="col-sm-4 col-form-label col-form-label-sm">Nombre</label>
                                                                <div className="col-sm-4">
                                                                    <input type="text" className="form-control form-control-sm" id="nombre" name={`Nombre-${index}`} placeholder="Ingrese el nombre" value={this.state.adicionales[index].Nombre} onChange={this.handleChangeAdicional} />
                                                                </div>
                                                            </div>
                
                                                            <div className="form-group row" >
                                                                <label className="col-sm-4 col-form-label col-form-label-sm">Apellido</label>
                                                                <div className="col-sm-4">
                                                                    <input type="text" className="form-control form-control-sm" id="apellido" name={`Apellido-${index}`} placeholder="Ingrese el apellido" value={this.state.adicionales[index].Apellido} onChange={this.handleChangeAdicional} />
                                                                </div>
                                                            </div>
                
                                                            <div className="form-group row">
                                                                <label className="col-sm-4 col-form-label col-form-label-sm">Correo</label>
                                                                <div className="col-sm-4">
                                                                    <input type="text" className="form-control form-control-sm" id="correo" name={`Correo-${index}`} placeholder="Ingrese el correo" value={this.state.adicionales[index].Correo} onChange={this.handleChangeAdicional} disabled/>
                                                                </div>
                                                            </div>
                
                                                        </div>
                                                        )
                                                    })
                                                )}
                                        </div>
                                    </div>
                                ):(
                                    ""
                                )*/}

                                

                            </form>
                        </div>
                    
                </div>
            );
        }
    }
}
