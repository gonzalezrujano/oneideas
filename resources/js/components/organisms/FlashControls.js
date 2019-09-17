import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import BPM from './../molecules/BPM';
import { connect } from 'react-redux';

class FlashControls extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      bpm: 0,
      loop: 0,
    }

    this.handleLoopChange = this.handleLoopChange.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);
  }

  handleLoopChange (value) {
    this.setState({ loop: value });
  }

  handleBPMChange (value) {
    this.setState({ bpm: value });
  }
  
  render () {
    return (
      <React.Fragment>
        <ConsoleControl 
          name="flash"
          icon={this.props.flash.icon}
          color={this.props.flash.color}
          running={this.props.flash.running}
          current={this.props.flash.current}
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
  flash: state.show.flash,
});

export default connect(mapStateToProps)(FlashControls);