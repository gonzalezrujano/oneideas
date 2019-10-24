import React, { useEffect, useState } from "react";
import Checkbox from "../../../molecules/Checkbox";

export default function ConfigurarSocialWall(props) {

    const [cargandoIframe, setCargandoIframe] = useState(true);
    const [urlIframe , setUrlIframe] = useState(window.location.protocol + "//" + window.location.hostname + "/Lib");
    const [moderarContenido , setModerarContenido] = useState(true);

    /**
     * Obtener URL de la libreria con los datos de configuracion
     * 
     * @return {string}
     */
    function obtenerUrlConParametros() {
        return urlIframe + "?hashtagsInstagram=" + encodeURIComponent(
            JSON.stringify(
                ['violin']
            )
        ) +
        "&eventoId=" + props.eventoId +
        "&cantidadDeResultados=1" +
        "&tema=" + document.getElementsByName('tema')[0].value +
        "&presentacion=" + document.getElementsByName('presentacion')[0].value;
    }

    useEffect(() => {
        document.getElementById('iFrameSocialWall').setAttribute("src", obtenerUrlConParametros());
    })

    return (
        <div>
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label col-form-label-sm">Tema</label>
                        <div className="col-sm-6">
                            <select name="tema" className="form-control form-control-sm">
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
                        <label className="col-sm-4 col-form-label col-form-label-sm">Presentación</label>
                        <div className="col-sm-6">
                            <select name="presentacion" className="form-control form-control-sm">
                                <option value="wall">Muro</option>
                                <option value="timeline">Linea de tiempo</option>
                                <option value="feed">Carrusel</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label col-form-label-sm">Moderar contenido</label>
                        <div className="col-sm-6">
                            <Checkbox valor={moderarContenido} onChange={() => setModerarContenido(!moderarContenido)}/>
                        </div>
                    </div>

                    <div className="form-group row">
                        <div className="col-sm-4">
                            <button 
                                type="button"
                                disabled={cargandoIframe}
                                className="btn btn-sm btn-dark"
                                onClick={() => setCargandoIframe(true)}>
                                Probar
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="row">
                        { cargandoIframe &&
                            <div className="row">
                                <h4>Cargando vista previa</h4>
                            </div>
                        }
                        <div className="row">
                            <iframe 
                                id="iFrameSocialWall"
                                onLoad={() => setCargandoIframe(false)}
                                style={{ 
                                    width: "inherit", 
                                    border: "none",
                                    visibility: (cargandoIframe) ? 'hidden' : 'visible'
                                }}></iframe>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}
