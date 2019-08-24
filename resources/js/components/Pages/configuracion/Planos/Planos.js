import React, { Component } from "react";
//import { SeatsioSeatingChart } from "@seatsio/seatsio-react";
import { SeatsioDesigner } from "@seatsio/seatsio-react";

export default class Planos extends Component {
    render() {
        return (
            <div>
                <button type="button">Agregar svg</button>
                {/*
                <SeatsioSeatingChart
                    publicKey="648ce2f6-f6c0-49e6-9155-7a99440e748a"
                    event="29ef56b2-30ab-4c3f-8934-e3faf614afac"
/>*/}
                <SeatsioDesigner designerKey="90e8b482-18d2-4747-8b3d-f77f9fe4391a" />
            </div>
        );
    }
}
