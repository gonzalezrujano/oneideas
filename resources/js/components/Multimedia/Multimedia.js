import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import swal from "sweetalert2";
import EmptyMultimedia from "./EmptyMultimedia";
import Herramientas from "./Herramientas";
import Parametros from "./Parametros";
import Ejecucion from "./Ejecucion";
import Cola from "./Cola";
import Clock from 'react-live-clock';
import Fullscreen from "react-full-screen";

export default class Multimedia extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            footer: props.footer,
            eventos: JSON.parse(props.eventos),
            sectores: JSON.parse(props.sectores),
            bibliotecas: [],
            evento: '',
            multimedia: '',
            multimedias: [],
            titleTool: '',
            istool: false,
            isFull: false,
            isLoading: false
        };

        this.goFull = this.goFull.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.actionTool = this.actionTool.bind(this);
        this.getMultimedia = this.getMultimedia.bind(this);

    }

    goFull() {
        this.setState({ isFull: !this.state.isFull });
    }

    actionTool(herramienta){

        let {evento} = this.state;

        axios.post('/ajax-action-tool', {evento, herramienta} )
            .then(res => {
                if(res){

                    let r = res.data;

                    if(r.code === 200){

                        if(r.tool == 'Video' || r.tool == 'Imagen' || r.tool == 'Audio'){

                            this.setState({
                                istool: true,
                                titleTool: herramienta,
                                bibliotecas: r.biblioteca
                            });

                        }else{

                            this.setState({
                                istool: true,
                                titleTool: herramienta
                            });
                        }


                    }else if(r.code === 500){

                        this.setState({
                            istool: false,
                            titleTool: ''
                        });

                    }else if(r.code === 700){

                        swal.fire({
                            title: '<i class="fas fa-exclamation-circle"></i>',
                            text: r.msj,
                            confirmButtonColor: '#343a40',
                            confirmButtonText: 'Ok',
                            target: document.getElementById('sweet')
                        });

                        this.setState({
                            istool: false,
                            titleTool: ''
                        });
                    }

                }

            }).catch(function (error) {

                console.log(error);

                this.setState({
                    istool: false,
                    titleTool: ''
                });

        });


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


        if(e.target.name == 'evento'){

            this.setState({
                multimedia: '',
                multimedias: [],
                bibliotecas: [],
                evento: e.target.value,
                istool: false,
                titleTool: ''
            });

        }

        this.setState({
            [e.target.name]: e.target.value
        });
    }


    render() {

        let {eventos, evento, istool, multimedia, multimedias, titleTool, sectores, bibliotecas, footer} = this.state;

        return (

            <Fullscreen
                enabled={this.state.isFull}
                onChange={isFull => this.setState({isFull})}
            >

            <div className="content-wrapper">

                <header className="page-header">

                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12 col-md-12">

                                <div className="d-flex">

                                    <div>
                                        <h1 className="page-header-heading"><i className="fas fa-compact-disc page-header-heading-icon"></i>Multimedia
                                            <i className="fas fa-clock mr-2 ml-4"></i> <Clock format={'HH:mm:ss A'} ticking={true} />
                                            <button type="button" className="btn btn-sm btn-dark ml-4" onClick={this.goFull}><i className="fas fa-arrows-alt"></i>&nbsp;Fullscreen</button>
                                        </h1>


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


                            </div>
                        </div>
                    </div>

                </header>

                <div id="sweet" className="container-fluid">

                    <div className="col-lg-12">

                        <div className="widget widget-default">

                            <div className="widget-body">

                                {evento == '' ?

                                    <EmptyMultimedia/>

                                    :

                                    <div>

                                        <Ejecucion/>

                                        <Cola/>

                                        <div className="container-fluid container-tools">

                                            <div className="row">

                                                <Herramientas action={this.actionTool} />

                                                <Parametros istool={istool} title={titleTool} sectores={sectores} bibliotecas={bibliotecas}/>

                                            </div>

                                        </div>

                                    </div>

                                }

                            </div>
                        </div>

                    </div>


                    <footer className="content-wrapper-footer">
                        <span>{footer}</span>
                    </footer>

                </div>

            </div>

            </Fullscreen>

        );
    }
}

if (document.getElementById('multimedia')) {

    const element = document.getElementById('multimedia');

    const props = Object.assign({}, element.dataset);

    ReactDOM.render(<Multimedia {...props} />, element);
}
