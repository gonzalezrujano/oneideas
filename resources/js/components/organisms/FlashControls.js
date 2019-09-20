import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import BPM from './../molecules/BPM';
import Time from './../molecules/Time';
import Vibrate from './../molecules/Vibrate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

class FlashControls extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      bpm: 0,
      time: 0,
      loop: 0,
      status: false,
      vibrate: false
    }

    this.handleLoopChange = this.handleLoopChange.bind(this);
    this.handleBPMChange = this.handleBPMChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.toggleVibration = this.toggleVibration.bind(this);

    // Class attributes
    this.interval = '';
    this.timeout = '';
    this.step = 0;
  }

  componentWillUnmount () {
    this.endCurrentShow();
  }

  endCurrentShow () {
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.props.endRunningShow('flash');
  }

  startCommand () {
    // Checking if the configuration is valid
    if (!this.validateConfiguration())
      return;

    // End previous execution
    this.endCurrentShow();

    this.props.setCurrentScene('flash', this.state);
    const interval = (60 / this.state.bpm) * 1000;

    // Updating timer to 0 when time finishes
    if (this.state.time > 0) {
      this.timeout = setTimeout(() => {
        this.props.endCurrentSceneTime('flash')
        
        if (this.props.color.current.loop === 0)
          return this.endCurrentShow();
        
      }, this.state.time * 1000);
    }

    // Executing a command every time a
    // beat is produced
    this.interval = setInterval(() => {
      const { current } = this.props.flash;

      if (current.time === 0 && current.loop === 0)
        return this.endCurrentShow();

      let id = this.step;
      let flash = !current.status;
      let moment = 1;
      let now = (new Date()).getTime();
      let end = now + ((60 / current.bpm) * 1000) + 5000;

      let command = `COL,${moment},${id},${flash},${now},${end}`;

      console.log('command', command);

      this.props.submitCommand(command);

      if (this.step === (current.colors.length - 1)) {
        this.step = 0;

        if (current.loop > 0) {
          this.props.updateCurrentLoop('color', current.loop - 1);
        }    
      } else {
        this.step = this.step + 1;
      }
    }, interval);

    this.setState({
      bpm: 0,
      loop: 0,
      time: 0,
      colors: [],
      vibrate: false,
    });
  }

  handleTimeChange (value) {
    this.setState({ time: value });
  }

  handleLoopChange (value) {
    this.setState({ loop: value });
  }

  handleBPMChange (value) {
    this.setState({ bpm: value });
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
          name="flash"
          icon={this.props.flash.icon}
          color={this.props.flash.color}
          running={this.props.flash.running}
          current={this.props.flash.current}
        />
        <button 
          onClick={() => console.log(this.state)}
          className="btn btn-sm btn-block btn-running mt-3 py-0 rounded"
        >
          <FontAwesomeIcon icon="paper-plane" color="#fff"/>
        </button>
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
  flash: state.show.flash,
});

export default connect(mapStateToProps)(FlashControls);