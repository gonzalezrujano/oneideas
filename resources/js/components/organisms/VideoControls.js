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
      <div className="mt-3">
        <select className="form-control form-control-sm">
          <option value="">Seleccione</option>
          <option value="1">Wedding.mp4</option>
          <option value="2">WifesVideo.mpeg</option>
          <option value="3">AvengersBirthday.mp4</option>
        </select>
      </div>
      <Loop />
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  video: state.show.video,
});

export default connect(mapStateToProps)(VideoControls);