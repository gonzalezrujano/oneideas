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
      <Loop />
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  audio: state.show.audio,
});

export default connect(mapStateToProps)(AudioControls);