import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import { connect } from 'react-redux';

function AudioControls (props) {  
  return (
    <React.Fragment>
      <ConsoleControl 
        name="audio"
        icon={props.audio.icon}
        color={props.audio.color}
        running={props.audio.running}
        current={props.audio.current}
      />
      <div className="mt-3">
        <select className="form-control form-control-sm">
          <option value="">Seleccione</option>
          <option value="1">Audio.mp3</option>
          <option value="2">IronMaidenClassic.mp3</option>
          <option value="3">LoveSong.mp3</option>
        </select>
      </div>
      <Loop />
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  audio: state.show.audio,
});

export default connect(mapStateToProps)(AudioControls);