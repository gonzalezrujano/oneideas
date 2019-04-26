import React from 'react';
import iconAudio from "../../../../public/images/icons/console/Audio.png";
import iconAudiorritmico from "../../../../public/images/icons/console/Audiorritmico.png";
import iconColores from "../../../../public/images/icons/console/Colores.png";
import iconCuentaRegresiva from "../../../../public/images/icons/console/CuentaRegresiva.png";
import iconFlash from "../../../../public/images/icons/console/Flash.png";
import iconImagen from "../../../../public/images/icons/console/Imagen.png";
import iconOla from "../../../../public/images/icons/console/OlaHumana.png";
import iconPixeles from "../../../../public/images/icons/console/Pixels.png";
import iconSirena from "../../../../public/images/icons/console/Sirena.png";
import iconVideo from "../../../../public/images/icons/console/Video.png";

const Herramientas = (props) => {

    return (

        <div className="col-3 section-herramientas">

            <div className="text-center mb-4 mt-4"><h5 className="font-weight-bold">Herramientas</h5></div>

            <hr className="hr-tools" />

            <div className="row text-center mb-4">

                <div className="col-3 mb-3"><a onClick={(e) => props.action('audio')}><img src={iconAudio} className="icon-img-console" data-toggle="tooltip" data-placement="top" title="Audio" /></a></div>
                <div className="col-3 mb-3"><a onClick={(e) => props.action('audioritmico')}><img src={iconAudiorritmico} className="icon-img-console" data-toggle="tooltip" data-placement="top" title="Audioritmico" /></a></div>
                <div className="col-3 mb-3"><a onClick={(e) => props.action('colores')}><img src={iconColores} className="icon-img-console" data-toggle="tooltip" data-placement="top" title="Colores" /></a></div>
                <div className="col-3 mb-3"><a onClick={(e) => props.action('cuenta regresiva')}><img src={iconCuentaRegresiva} className="icon-img-console" data-toggle="tooltip" data-placement="top" title="Cuenta Regresiva" /></a></div>

                <div className="col-3 mb-3"><a onClick={(e) => props.action('flash')}><img src={iconFlash} className="icon-img-console" data-toggle="tooltip" data-placement="top" title="Flash" /></a></div>
                <div className="col-3 mb-3"><a onClick={(e) => props.action('imagen')}><img src={iconImagen} className="icon-img-console" data-toggle="tooltip" data-placement="top" title="Imagen" /></a></div>
                <div className="col-3 mb-3"><a onClick={(e) => props.action('ola humana')}><img src={iconOla} className="icon-img-console" data-toggle="tooltip" data-placement="top" title="Ola Humana" /></a></div>
                <div className="col-3 mb-3"><a onClick={(e) => props.action('pixeles')}><img src={iconPixeles} className="icon-img-console" data-toggle="tooltip" data-placement="top" title="Pixeles" /></a></div>

                <div className="col-3"></div>
                <div className="col-3"><a onClick={(e) => props.action('sirena')}><img src={iconSirena} className="icon-img-console" data-toggle="tooltip" data-placement="top" title="Sirena" /></a></div>
                <div className="col-3"><a onClick={(e) => props.action('video')}><img src={iconVideo} className="icon-img-console" data-toggle="tooltip" data-placement="top" title="Video" /></a></div>
                <div className="col-3"></div>

            </div>

        </div>

    );

};

export default Herramientas;
