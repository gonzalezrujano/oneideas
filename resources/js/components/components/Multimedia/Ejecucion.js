import React from "react";
import { connect } from 'react-redux';
import { deleteJob } from './../../../redux/actions/multimedia';

import "./css/Ejecucion.css";

const Ejecucion = props => {
    return (
        <div>
            <table className="table table-dark-theme-console fixed_header">
                <thead>
                    <tr className="titulos-tabla">
                        <th>Ejecutando</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Sectores</th>
                        <th>Parametros</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {props.envios.map(event => {
                        if (event.status != "ejecucion")
                            return null;

                        if (event.eventId != props.evento)
                            return null;

                        return (
                            <tr key={event.id} id={event.id}>
                                <td>{event.type}</td>
                                <td>{event.startTime}</td>
                                <td>{event.endTime}</td>
                                <td>Grada, Campo</td>
                                <td>{event.payload}</td>
                                <td>
                                    <i
                                      className="fa fa-trash"
                                      style={{ cursor: "pointer" }}
                                      onClick={e =>props.deleteJob(event.id)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
  deleteJob: (id) => dispatch(deleteJob(id))
});

export default connect(null, mapDispatchToProps)(Ejecucion);
