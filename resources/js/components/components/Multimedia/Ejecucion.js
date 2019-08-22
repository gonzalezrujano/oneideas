import React from "react";

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
                    {props.envios.map(e => {
                        if (e.status != "ejecucion")
                            return null;

                        if (e.eventId != props.evento)
                            return null;

                        return (
                            <tr key={e.id} id={e.id}>
                                <td>{e.type}</td>
                                <td>{e.startTime}</td>
                                <td>{e.endTime}</td>
                                <td>Grada, Campo</td>
                                <td>{e.payload}</td>
                                <td>
                                    <i
                                        className="fa fa-trash"
                                        style={{ cursor: "pointer" }}
                                        onClick={ev =>
                                            props.sincola(
                                                "ejecucion",
                                                e.type,
                                                e.startTime,
                                                e.endTime,
                                                e.id
                                            )
                                        }
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

export default Ejecucion;

/*
 <tr>
                    <td>Luces Flash</td>
                    <td>15:30:55</td>
                    <td>15:50:00</td>
                    <td>Grada, Campo</td>
                    <td>Intermitencia 30ms</td>
                    <td><i className="fas fa-ban fa-lg icon-console"></i></td>
                </tr>

*/
