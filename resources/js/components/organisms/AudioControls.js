import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import { connect } from 'react-redux';

class AudioControls extends React.Component {  
  constructor (props) {
    super(props);

    this.state = {
      loop: 0,
    }

    this.handleLoopChange = this.handleLoopChange.bind(this);
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.show.audio,
});

export default connect(mapStateToProps)(AudioControls);