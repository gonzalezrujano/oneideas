import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import ColorSelector from './../molecules/ColorSelector';
import { connect } from 'react-redux';

class ColorControls extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      colors: [],
    }

    this.handleNewColor = this.handleNewColor.bind(this);
  }

  handleNewColor (color) {
    this.setState(state => ({
      colors: [...state.colors, color]
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
        <Loop />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  color: state.show.color,
});

export default connect(mapStateToProps)(ColorControls);