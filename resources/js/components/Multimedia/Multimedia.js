import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from "sweetalert2";
import Clock from 'react-live-clock';

import EmptyMultimedia from "./EmptyMultimedia";

export default class Multimedia extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            eventos: JSON.parse(props.eventos),
            evento: '',
            herramientas: [],
            herramienta: '',
            multimedia: '',
            multimedias: [],
            isLoading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.getMultimedia = this.getMultimedia.bind(this);

    }

    getMultimedia(){

        let {evento} = this.state;

        axios.post('/ajax-get-multimedia', {evento} )
            .then(res => {
                if(res){

                    let r = res.data;

                    if(r.code === 200){

                        this.setState({
                            multimedias: r.multimedia,
                        });

                    }else if(r.code === 500){

                        console.log(r.msj);
                        this.setState({
                            multimedias: [],
                        });

                    }

                }

            }).catch(function (error) {});

    }

    handleChange(e) {


        if(e.target.name == 'herramienta'){

            if(e.target.value == 'm'){

                this.getMultimedia();
            }

        }

        if(e.target.name == 'evento'){

            if(e.target.value == ''){

                this.setState({
                    herramientas: [],
                    herramienta: '',
                    multimedia: '',
                    multimedias: []
                });
            }

        }

        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {

        let {eventos, evento, herramienta, multimedia, multimedias} = this.state;

        return (


            <div className="col-lg-12">

                <div className="widget widget-default">

                    <div className="widget-body">

                        <header className="widget-header">

                            <div className="d-flex">

                                <div className="my-2">

                                    <i className="fas fa-clock fa-lg mr-2"></i> <Clock format={'HH:mm:ss A'} ticking={true} />

                                </div>


                                <div className="ml-auto">

                                    <form className="form-inline">
                                        <i className="fas fa-calendar-week fa-lg mr-3"></i>
                                        <select className="form-control form-control-sm form-select-event" name="evento" value={evento} onChange={this.handleChange}>
                                            <option value="">Seleccione evento</option>
                                            {
                                                eventos.map( (p, index) => {
                                                    return <option key={index} value={p._id} >{p.Nombre}</option>
                                                })
                                            }
                                        </select>
                                    </form>

                                </div>
                            </div>

                        </header>


                        {evento == '' ?

                            <EmptyMultimedia/>

                            :

                            <div>

                                <table className="table table-dark-theme-console">
                                    <thead>
                                        <tr>
                                            <th>Ejecutando</th>
                                            <th>Inicio</th>
                                            <th>Fin</th>
                                            <th>Sectores</th>
                                            <th>Parametros</th>
                                            <th>Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Luces Flash</td>
                                            <td>15:30:55</td>
                                            <td>15:50:00</td>
                                            <td>Grada, Campo</td>
                                            <td>Intermitencia 30ms</td>
                                            <td><i className="fas fa-ban fa-lg icon-console"></i></td>
                                        </tr>
                                    </tbody>
                                </table>


                                <table className="table table-dark-theme-console">
                                    <thead>
                                    <tr>
                                        <th>Cola</th>
                                        <th>Inicio</th>
                                        <th>Fin</th>
                                        <th>Sectores</th>
                                        <th>Parametros</th>
                                        <th>Accion</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Luces Led</td>
                                        <td>16:30:55</td>
                                        <td>16:40:00</td>
                                        <td>Grada, Campo</td>
                                        <td>Intermitencia 30ms</td>
                                        <td>
                                            <i className="fas fa-ban fa-lg icon-console mr-2"></i>
                                            <i className="fas fa-arrow-up fa-lg icon-console mr-2"></i>
                                            <i className="fas fa-arrow-down fa-lg icon-console mr-2"></i>
                                            <i className="fas fa-pencil-alt fa-lg icon-console mr-2"></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Ola humana</td>
                                        <td>17:00:00</td>
                                        <td>17:10:00</td>
                                        <td>Grada</td>
                                        <td>Intermitencia 10ms</td>
                                        <td>
                                            <i className="fas fa-ban fa-lg icon-console mr-2"></i>
                                            <i className="fas fa-arrow-up fa-lg icon-console mr-2"></i>
                                            <i className="fas fa-arrow-down fa-lg icon-console mr-2"></i>
                                            <i className="fas fa-pencil-alt fa-lg icon-console mr-2"></i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Pantalla</td>
                                        <td>18:00:00</td>
                                        <td>18:50:00</td>
                                        <td>Todos</td>
                                        <td>Ninguno</td>
                                        <td>
                                            <i className="fas fa-ban fa-lg icon-console mr-2"></i>
                                            <i className="fas fa-arrow-up fa-lg icon-console mr-2"></i>
                                            <i className="fas fa-arrow-down fa-lg icon-console mr-2"></i>
                                            <i className="fas fa-pencil-alt fa-lg icon-console mr-2"></i>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>


                                <div className="container-fluid container-tools">

                                    <div className="row">

                                        <div className="col-3 section-herramientas">
                                            <div className="text-center mb-4 mt-4"><h5 className="font-weight-bold"><i className="fas fa-tools fa-lg mr-2"></i>Herramientas</h5></div>

                                            <div className="text-center mb-5">
                                                <select className="form-control form-control-sm form-select-event-tools" name="herramienta" value={herramienta} onChange={this.handleChange}>
                                                    <option value="">Seleccione herramienta</option>
                                                    <option value="a">Audioritmicas</option>
                                                    <option value="m">Multimedia</option>
                                                    <option value="p">Pantalla Humana</option>
                                                    <option value="o">Ola Humana</option>
                                                    <option value="c">Cuenta Regresiva</option>
                                                </select>
                                            </div>


                                        </div>

                                        <div className="col-9 section-parametros">



                                            {herramienta == '' ?

                                                <div className="section-empty mt-5 mb-5">

                                                    <div className="text-center">
                                                        <i className="fas fa-ban fa-2x"></i>
                                                        <div>Seleccione una herramienta para configurar</div>
                                                    </div>

                                                </div>

                                                :

                                                <div>

                                                    {herramienta == 'm' ?


                                                        <div>

                                                            <div className="text-center mb-4 mt-4"><h5 className="font-weight-bold">Multimedia</h5></div>

                                                            <div className="text-center mb-4">
                                                                <select className="form-control form-control-sm form-select-event-tools" name="multimedia" value={multimedia} onChange={this.handleChange}>
                                                                    <option value="">Seleccione</option>
                                                                    {
                                                                        multimedias.map( (p, index) => {
                                                                            return <option key={index} value={p._id} >{p.NombreCompleto}</option>
                                                                        })
                                                                    }

                                                                </select>
                                                            </div>

                                                            <div className="text-center mb-4">
                                                                <button className="btn btn-sm btn-dark mr-2">Inmediata</button>
                                                                <button className="btn btn-sm btn-dark mr-2">Proxima</button>
                                                                <button className="btn btn-sm btn-dark mr-2">En cola</button>
                                                                <button className="btn btn-sm btn-dark mr-2">Agregar</button>
                                                                <button className="btn btn-sm btn-dark mr-2">Cancelar</button>
                                                            </div>

                                                        </div>

                                                        :

                                                        <div></div>

                                                    }


                                                </div>

                                            }

                                        </div>
                                    </div>

                                </div>

                            </div>

                        }

                    </div>
                </div>

            </div>


        );
    }
}

if (document.getElementById('multimedia')) {

    const element = document.getElementById('multimedia');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<Multimedia {...props} />, element);
}
