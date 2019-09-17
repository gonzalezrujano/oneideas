import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import BPM from './../molecules/BPM';
import ColorSelector from './../molecules/ColorSelector';
import ColorList from './../molecules/ColorList';
import { connect } from 'react-redux';

class ColorControls extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      bpm: 0,
      loop: 0,
      colors: [],
    }

    this.handleNewColor = this.handleNewColor.bind(this);
    this.handleDeletedColor = this.handleDeletedColor.bind(this);
    this.handleLoopChange = this.handleLoopChange.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);
  }

  handleLoopChange (value) {
    this.setState({ loop: value });
  }

  handleBPMChange (value) {
    this.setState({ bpm: value });
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
        <BPM
          value={this.state.bpm}
          onChange={this.handleBPMChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  color: state.show.color,
});

export default connect(mapStateToProps)(ColorControls);