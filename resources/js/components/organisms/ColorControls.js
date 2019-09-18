import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import BPM from './../molecules/BPM';
import ColorSelector from './../molecules/ColorSelector';
import ColorList from './../molecules/ColorList';
import Vibrate from './../molecules/Vibrate';
import Time from './../molecules/Time';
import { connect } from 'react-redux';

class ColorControls extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      bpm: 0,
      loop: 0,
      time: 0,
      colors: [],
      vibrate: false,
    }

    this.handleNewColor = this.handleNewColor.bind(this);
    this.handleDeletedColor = this.handleDeletedColor.bind(this);
    this.handleLoopChange = this.handleLoopChange.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);
    this.toggleVibration = this.toggleVibration.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleLoopChange (value) {
    this.setState({ loop: value });
  }

  handleBPMChange (value) {
    this.setState({ bpm: value });
  }
  
  handleTimeChange (value) {
    this.setState({ time: value });
  }

  handleNewColor (color) {
    this.setState(state => ({
      colors: [...state.colors, color]
    }));
  }

  handleDeletedColor (index) {
    this.setState(state => ({
      colors: state.colors.filter((_, i) => i !== index)
    }));
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
          name="color"
          icon={this.props.color.icon}
          color={this.props.color.color}
          running={this.props.color.running}
          current={this.props.color.current}
        />
        <ColorSelector 
          onSubmit={this.handleNewColor}
        />
        <ColorList 
          onDelete={this.handleDeletedColor}
          colors={this.state.colors}
        />
        <Loop
          value={this.state.loop}
          onChange={this.handleLoopChange}
        />
        <Time 
          value={this.state.time}
          onChange={this.handleTimeChange}
        />
        <BPM
          value={this.state.bpm}
          onChange={this.handleBPMChange}
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
  color: state.show.color,
});

export default connect(mapStateToProps)(ColorControls);