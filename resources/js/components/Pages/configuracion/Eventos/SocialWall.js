import React, { Component } from "react";
import axios from "axios";

export default class SocialWall extends Component {

    constructor(props) {
        super(props);

        this.state = {
            api_token: localStorage.getItem("api_token")
        };

        this.estilosIframe = {
            width: "inherit",
            border: "none"
        };
    }

    render() {
        let urlParaIframe = window.location.protocol + "//" + window.location.hostname + "/Lib" + 
        '?cantidadDeResultados=1';
        return (
            <div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label col-form-label-sm">Tema</label>
                    <div className="col-sm-4">
                        <select className="form-control form-control-sm" id="pais" name="paisSeleccionado" value={this.state.plantilla} onChange={this.handleChange}>
                            <option value="sb-default-light">Default light</option>
                            <option value="sb-modern-light">Modern Light</option>
                            <option value="sb-modern2-light">Modern Light 2</option>
                            <option value="sb-metro-dark">Metro Dark</option>
                            <option value="sb-flat-light">Flat Light</option>
                            <option value="sb-modern-dark">Modern Dark</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label col-form-label-sm">Presentación</label>
                    <div className="col-sm-4">
                        <select className="form-control form-control-sm" id="pais" name="paisSeleccionado" value={this.state.plantilla} onChange={this.handleChange}>
                            <option value="muro">Muro</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label col-form-label-sm">Cantidad de resultados</label>
                    <div className="col-sm-4">
                        <input type="numeric" className="form-control form-control-sm" value={this.state.cantidadResultados} onChange={this.handleChange} id="nombre" name="nombre" placeholder="Ingrese el nombre del evento" />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label col-form-label-sm">Mostrar enlaces externos</label>
                    <div className="col-sm-4">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" id="customRadioInline1" name="ubicacion" className="custom-control-input" onChange={this.handleChange} />
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label col-form-label-sm">Ancho de bloques de publicación</label>
                    <div className="col-sm-4">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" id="customRadioInline1" name="ubicacion" className="custom-control-input" onChange={this.handleChange} />
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-sm-4">
                        <button type="button" className="btn btn-sm btn-dark">Probar</button>
                    </div>
                </div>

                <div className="row">
                    <iframe
                        id="iFrameSocialWall"
                        style={this.estilosIframe}
                        src={urlParaIframe}
                    ></iframe>
                </div>

            </div>
        );
    }
}
