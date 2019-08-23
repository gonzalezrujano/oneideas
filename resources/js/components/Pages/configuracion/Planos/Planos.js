import React, { Component } from "react";

export default class Planos extends Component {
    constructor () {
        this.state = {
            numChildren: 0
        };
    }

   

    render() {
        return (
            <div>
                <button type="button">Agregar svg</button>

                <svg>
                    <circle cx={50} cy={50} r={10} fill="red" />
                </svg>
            </div>
            
        );
    }
}
