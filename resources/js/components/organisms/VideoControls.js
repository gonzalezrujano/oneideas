import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import Time from './../molecules/Time';
import Vibrate from './../molecules/Vibrate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

class VideoControls extends React.Component {  
  constructor (props) {
    super(props);

    this.state = {
      loop: 0,
      time: 0,
      vibrate: false,
    }

    this.handleLoopChange = this.handleLoopChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.toggleVibration = this.toggleVibration.bind(this);
  }

  handleLoopChange (value) {
    this.setState({ loop: value });
  }
  
  handleTimeChange (value) {
    this.setState({ time: value });
  }

  toggleVibration () {
    this.setState(state => ({
      vibrate: !state.vibrate
    }));
  }

  render () {
    return (
      <React.Fragment>
        <ConsoleControl 
          name="video"
          icon={this.props.video.icon}
          color={this.props.video.color}
          running={this.props.video.running}
          current={this.props.video.current}
        />
        <button 
          onClick={() => console.log(this.state)}
          className="btn btn-sm btn-block btn-running mt-3 py-0 rounded"
        >
          <FontAwesomeIcon icon="paper-plane" color="#fff"/>
        </button>
        <div className="mt-3">
          <select className="form-control form-control-sm">
            <option value="">Seleccione</option>
            <option value="1">Wedding.mp4</option>
            <option value="2">WifesVideo.mpeg</option>
            <option value="3">AvengersBirthday.mp4</option>
          </select>
        </div>
        <Loop 
          value={this.state.loop}
          onChange={this.handleLoopChange}
        />
        <Time 
          value={this.state.time}
          onChange={this.handleTimeChange}
        />
        <Vibrate 
          vibrate={this.state.vibrate}
          onChange={this.toggleVibration}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  video: state.show.video,
});

export default connect(mapStateToProps)(VideoControls);