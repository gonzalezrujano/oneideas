import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import { connect } from 'react-redux';

function VideoControls (props) {  
  return (
    <React.Fragment>
      <ConsoleControl 
        name="video"
        icon={props.video.icon}
        color={props.video.color}
        running={props.video.running}
        current={props.video.current}
      />
      <Loop />
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  video: state.show.video,
});

export default connect(mapStateToProps)(VideoControls);