import React from 'react';
import $ from 'jquery';
import reactMobileDatePicker from 'react-mobile-datepicker';
const Datepicker = reactMobileDatePicker;
const dateConfig = {
    'year': {
        format: 'YYYY',
        caption: 'Year',
        step: 1,
    },
    'month': {
        format: 'MM',
        caption: 'Mon',
        step: 1,
    },
    'date': {
        format: 'DD',
        caption: 'Day',
        step: 1,
    },
    'hour': {
        format: 'hh',
        caption: 'Hour',
        step: 1,
    },
    'minute': {
        format: 'mm',
        caption: 'Min',
        step: 1,
    },
    'second': {
        format: 'hh',
        caption: 'Sec',
        step: 1,
    },
};
const Parametros = (props) => {

    let istool = props.istool;
    let title = props.title;
    let bibliotecas = props.bibliotecas;
    let sectores = props.sectores;
    let sector = props.sector;
    let fechainicio = props.fechainicio;
    let fechafin = props.fechafin;
    let archivo = props.archivo;
    let flash='';
    let color='';
    let flash2=props.flash2;

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
                                            <label>Estado</label>
                                            <select className="form-control form-control-sm" name="flash2" value={flash2} onChange={props.change}>
                                                <option key="flas1" value="">Seleccione</option>
                                                
                                                <option key="flas2" value="0">Apagar</option>
                                                <option key="flas3" value="1">Encender</option>
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


                        {title == 'colores' ?

                            <div>

                                <form>

                                    <div className="form-row">


                                        <div className="col-md-3 mb-3">
                                            <label>Hora Inicio</label>
                                            <a
                                            className="select-btn sm" style={{'border': '1px solid #fff','padding-top': '0.5rem','padding-bottom': '0.5rem','width': '88%','color': '#dadada'}}
                                            onClick={props.handleThemeToggle}>
                                             {props.hora==''?'Ingrese (Opcional)':props.hora.getDate()+'/'+(props.hora.getMonth() + 1) +'/'+props.hora.getFullYear()}
                                        </a>
                                        <Datepicker
                                        showCaption={true}
                                        showHeader={true}
                                        headerFormat={'hh:mm:ss'}
                                        value={props.hora}
                                        theme="default"
                                        isOpen={props.isOpenHora}
                                        onSelect={props.handleSelect}
                                        onCancel={(e) => props.handleToggle(false)} 
                                        confirmText="Seleccionar"
                                        cancelText="Cancelar"
                                        max={new Date()}
                                        dateConfig={dateConfig}
                                        />
                                            <input type="time" step="1" className="form-control form-control-sm" name="fechainicio" value={fechainicio} onChange={props.change }  placeholder="Hora inicio" />
                                        </div>

                                        <div className="col-md-3 mb-3">
                                            <label>Hora Fin</label>
                                            <a
                                            className="select-btn sm" style={{'border': '1px solid #fff','padding-top': '0.5rem','padding-bottom': '0.5rem','width': '88%','color': '#dadada'}}
                                            onClick={props.handleThemeToggle2}>
                                            {props.hora2==''?'Ingrese (Opcional)':props.hora2.getDate()+'/'+(props.hora2.getMonth() + 1) +'/'+props.hora2.getFullYear()}
                                        </a>
                                        <Datepicker
                                        showCaption={true}
                                        showHeader={true}
                                        headerFormat={'hh:mm:ss'}
                                        value={props.hora2}
                                        theme="default"
                                        isOpen={props.isOpenHora2}
                                        onSelect={props.handleSelect2}
                                        onCancel={(e) => props.handleToggle2(false)} 
                                        confirmText="Seleccionar"
                                        cancelText="Cancelar"
                                        max={new Date()}
                                        dateConfig={dateConfig}
                                        />
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
                                            <label>Parametro color </label>
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
                            <button className="btn btn-sm btn-dark mr-2" onClick={(e) => props.cola('cola',fechainicio,fechafin)}>En cola</button>
                            <button className="btn btn-sm btn-dark mr-2">Cancelar</button>
                        </div>

                    </div>


                </div>

            }

        </div>

    );

};

export default Parametros;
