import React from 'react';

const Parametros = (props) => {

    let istool = props.istool;
    let title = props.title;
    let bibliotecas = props.bibliotecas;
    let sectores = props.sectores;
    let sector = props.sector;
    let fechainicio = props.fechainicio;
    let fechafin = props.fechafin;
    let archivo = props.archivo;
    let flash=0;
    let color='';

    return (

        <div className="col-9 section-parametros">

            {istool == false ?

                <div className="d-flex align-items-center justify-content-center h-100">

                    <div className="text-center">
                        <i className="fas fa-ban fa-2x"></i>
                        <div>Seleccione una herramienta para configurar</div>
                    </div>

                </div>

                :

                <div>

                    <div>

                        <div className="text-left mb-4 mt-4"><h5 className="font-weight-bold text-capitalize">{title}</h5></div>

                        {title == 'video' ?

                            <div>

                                <form>

                                    <div className="form-row">

                                        <div className="col-md-3 mb-3">
                                            <label>Archivo</label>
                                            <select className="form-control form-control-sm" name="archivo" value={archivo} onChange={props.change}>
                                                <option value="">Seleccione</option>
                                                {
                                                    bibliotecas.map( (p, index) => {
                                                        return <option key={index} value={p._id} >{p.NombreCompleto}</option>
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label>Hora Inicio</label>
                                            <input type="time" step="1" className="form-control form-control-sm" name="fechainicio" value={fechainicio} onChange={props.change }  placeholder="Hora inicio" />
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label>Hora Fin</label>
                                            <input type="time" step="1" className="form-control form-control-sm" name="fechafin" value={fechafin} onChange={props.change } placeholder="Hora fin" />
                                        </div>


                                        <div className="col-md-3 mb-3">
                                            <label>Sector</label>
                                            <select className="form-control form-control-sm" name="sector" value={sector} onChange={props.change }>
                                                <option value="">Seleccione</option>
                                                {
                                                    sectores.map( (p, index) => {
                                                        return <option key={index} value={p._id} >{p.Nombre}</option>
                                                    })
                                                }
                                            </select>
                                        </div>


                                    </div>

                                 

                                </form>


                            </div>

                            : ''
                        }


                        {title == 'audio' ?

                            <div>

                                <form>

                                    <div className="form-row">

                                        <div className="col-md-3 mb-3">
                                            <label>Archivo</label>
                                            <select className="form-control form-control-sm">
                                                <option value="">Seleccione</option>
                                                {
                                                    bibliotecas.map( (p, index) => {
                                                        return <option key={index} value={p._id} >{p.NombreCompleto}</option>
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label>Hora Inicio</label>
                                            <input type="time" step="1" className="form-control form-control-sm"  placeholder="Hora inicio" />
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label>Hora Fin</label>
                                            <input type="time" step="1" className="form-control form-control-sm"  placeholder="Hora fin" />
                                        </div>


                                        <div className="col-md-3 mb-3">
                                            <label>Sector</label>
                                            <select className="form-control form-control-sm">
                                                <option value="">Seleccione</option>
                                                {
                                                    sectores.map( (p, index) => {
                                                        return <option key={index} value={p._id} >{p.Nombre}</option>
                                                    })
                                                }
                                            </select>
                                        </div>


                                    </div>

                                   

                                </form>


                            </div>

                            : ''
                        }


                        {title == 'imagen' ?

                            <div>

                                <form>

                                    <div className="form-row">

                                        <div className="col-md-3 mb-3">
                                            <label>Archivo</label>
                                            <select className="form-control form-control-sm"  name="archivo"  value={archivo} onChange={props.change} >
                                                <option value="">Seleccione</option>
                                                {
                                                    bibliotecas.map( (p, index) => {
                                                        return <option key={index} value={p.NombreCompleto} >{p.NombreCompleto}</option>
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label>Hora Inicio</label>
                                            <input type="time" step="1" className="form-control form-control-sm"  placeholder="Hora inicio" onChange={props.change}/>
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label>Hora Fin</label>
                                            <input type="time" step="1" className="form-control form-control-sm"  placeholder="Hora fin" onChange={props.change}/>
                                        </div>


                                        <div className="col-md-3 mb-3">
                                            <label>Sector</label>
                                            <select className="form-control form-control-sm">
                                                <option value="">Seleccione</option>
                                                {
                                                    sectores.map( (p, index) => {
                                                        return <option key={index} value={p._id} >{p.Nombre}</option>
                                                    })
                                                }
                                            </select>
                                        </div>


                                    </div>

                                   

                                </form>


                            </div>

                            : ''
                        }



                        {title == 'flash' ?

                            <div>

                                <form>

                                    <div className="form-row">


                                        <div className="col-md-3 mb-3">
                                            <label>Hora Inicio</label>
                                            <input type="time" step="1" className="form-control form-control-sm" name="fechainicio" value={fechainicio} onChange={props.change }  placeholder="Hora inicio" />
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label>Hora Fin</label>
                                            <input type="time" step="1" className="form-control form-control-sm" name="fechafin" value={fechafin} onChange={props.change } placeholder="Hora fin" />
                                        </div>


                                        <div className="col-md-3 mb-3">
                                            <label>Sector</label>
                                            <select className="form-control form-control-sm" name="sector" value={sector} onChange={props.change }>
                                                <option value="">Seleccione</option>
                                                {
                                                    sectores.map( (p, index) => {
                                                        return <option key={index} value={p._id} >{p.Nombre}</option>
                                                    })
                                                }
                                            </select>
                                        </div>


                                    </div>

                                    <div className="form-row">

                                        <div className="col-md-3 mb-3">
                                            <label>Parametro</label>
                                            <select className="form-control form-control-sm" name="flash" value={flash} onChange={props.change }>
                                                <option value="">Seleccione</option>
                                                <option value="0">Apagar</option>
                                                <option value="1">Encender</option>
                                            </select>
                                        </div>

                                    </div>

                                </form>


                            </div>

                            : ''
                        }


                        {title == 'colores' ?

                            <div>

                                <form>

                                    <div className="form-row">


                                        <div className="col-md-3 mb-3">
                                            <label>Hora Inicio</label>
                                            <input type="time" step="1" className="form-control form-control-sm" name="fechainicio" value={fechainicio} onChange={props.change }  placeholder="Hora inicio" />
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label>Hora Fin</label>
                                            <input type="time" step="1" className="form-control form-control-sm" name="fechafin" value={fechafin} onChange={props.change } placeholder="Hora fin" />
                                        </div>


                                        <div className="col-md-3 mb-3">
                                            <label>Sector</label>
                                            <select className="form-control form-control-sm" name="sector" value={sector} onChange={props.change }>
                                                <option value="">Seleccione</option>
                                                {
                                                    sectores.map( (p, index) => {
                                                        return <option key={index} value={p._id} >{p.Nombre}</option>
                                                    })
                                                }
                                            </select>
                                        </div>


                                    </div>

                                    <div className="form-row">

                                        <div className="col-md-3 mb-3">
                                            <label>Parametro</label>
                                            <input type="color"  name="color" value={color} onChange={props.change } />
                                        </div>

                                    </div>

                                </form>


                            </div>

                            : ''
                        }




                        <div className="text-center mb-4">
                            <button className="btn btn-sm btn-dark mr-2" onClick={(e)=> props.enviar(fechainicio,fechafin)}>Inmediata</button>
                            <button className="btn btn-sm btn-dark mr-2" onClick={(e) => props.enviar('audio')}>Proxima</button>
                            <button className="btn btn-sm btn-dark mr-2">En cola</button>
                            <button className="btn btn-sm btn-dark mr-2">Cancelar</button>
                        </div>

                    </div>


                </div>

            }

        </div>

    );

};

export default Parametros;
