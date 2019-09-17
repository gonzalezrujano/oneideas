import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import BPM from './../molecules/BPM';
import { connect } from 'react-redux';

class AudioControls extends React.Component {  
  constructor (props) {
    super(props);

    this.state = {
      bpm: 0,
      loop: 0,
    }

    this.handleLoopChange = this.handleLoopChange.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);
  }

  handleBPMChange (value) {
    this.setState({ bpm: value });
  }

  handleLoopChange (value) {
    this.setState({ loop: value });
  }

  render () {
    return (
      <React.Fragment>
        <ConsoleControl 
          name="audio"
          icon={this.props.audio.icon}
          color={this.props.audio.color}
          running={this.props.audio.running}
          current={this.props.audio.current}
        />
        <div className="mt-3">
          <select className="form-control form-control-sm">
            <option value="">Seleccione</option>
            <option value="1">Audio.mp3</option>
            <option value="2">IronMaidenClassic.mp3</option>
            <option value="3">LoveSong.mp3</option>
          </select>
        </div>
        <Loop 
          value={this.state.loop}
          onChange={this.handleLoopChange}
        />
        <BPM
          value={this.state.bpm}
          onChange={this.handleBPMChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.show.audio,
});

export default connect(mapStateToProps)(AudioControls);