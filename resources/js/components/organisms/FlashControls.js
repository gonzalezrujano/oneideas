import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import { connect } from 'react-redux';

class FlashControls extends React.Component {
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  flash: state.show.flash,
});

export default connect(mapStateToProps)(FlashControls);