import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import Time from './../molecules/Time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFilesFromEvent } from './../../redux/actions/show';
import { displayAlertMessage } from './../../redux/actions/alert';
import { 
  endRunningShow,
  setCurrentScene, 
  endCurrentSceneTime,
} from './../../redux/actions/show';
import { connect } from 'react-redux';

class AudioControls extends React.Component {  
  constructor (props) {
    super(props);

    this.state = {
      loop: 0,
      time: 0,
      files: [],
      selected: '',
    }

    // Functions to control execution
    this.startCommand = this.startCommand.bind(this);
    this.endCurrentShow = this.endCurrentShow.bind(this);
    this.validateConfiguration = this.validateConfiguration.bind(this);

    // Class attributes
    this.timeout = '';
  }

  componentDidMount () {
    this.props.getFilesFromEvent('Audio').then(files => {
      this.setState({ files });
    })
    .catch(e => {
      console.log('Error', e);
    })
  }

  componentWillUnmount () {
    this.endCurrentShow();
  }

  endCurrentShow () {
    clearTimeout(this.timeout);

    this.props.endRunningShow('audio');

    console.log('command', 'REM,0,1,AUD');

    this.props.submitCommand(`REM,0,1,AUD`);
  }

  startCommand () {
    // Checking if the configuration is valid
    if (!this.validateConfiguration())
      return;

    // End previous execution
    this.endCurrentShow();

    this.props.setCurrentScene('audio', this.state);

    // Updating timer to 0 when time finishes
    if (this.state.time > 0) {
      this.timeout = setTimeout(() => {
        this.props.endCurrentSceneTime('audio')
        
        if (this.props.audio.current.loop === 0)
          return this.endCurrentShow();
        
      }, this.state.time * 1000);
    }

    // The audio command is only executed once because 
    // there is uncertainty of how long a song lasts
    const current = this.state;

    let id = 1;
    let audio = current.selected;
    let moment = 1;
    let now = (new Date()).getTime();
    let end = now + 600000;

    let command = `AUD,${moment},${id},${audio},${now},${end}`;

    console.log('command', command);

    this.props.submitCommand(command);

    this.setState({
      bpm: 0,
      loop: 0,
      time: 0,
      vibrate: false,
    });
  }

  validateConfiguration () {
    const { selected, loop, time } = this.state;

    if (selected === '') {
      this.props.displayAlertMessage('', 'Seleccione un archivo de audio', 'error');
      return false;
    }
    
    if (loop === 0 && time === 0) {
      this.props.displayAlertMessage('', 'Duración del comando no especificado', 'error');
      return false;
    }
  
    return true;
  }

  render () {
    const options = this.state.files.map(file => (
      <option key={file._id} value={file.NombreCompleto}>{file.NombreCompleto}</option>
    ));

    return (
      <React.Fragment>
        <ConsoleControl 
          name="audio"
          icon={this.props.audio.icon}
          color={this.props.audio.color}
          running={this.props.audio.running}
          current={this.props.audio.current}
        />
        <button 
          onClick={this.startCommand}
          className="btn btn-sm btn-block btn-running mt-3 py-0 rounded"
        >
          <FontAwesomeIcon icon="paper-plane" color="#fff"/>
        </button>
        {this.props.audio.current && 
          <button 
            onClick={this.endCurrentShow}
            className="btn btn-sm btn-block btn-danger mt-3 py-0 rounded"
          >
            <FontAwesomeIcon icon="stop" color="#fff"/>
          </button>
        }
        <div className="mt-3">
          <select 
            onChange={e => this.setState({ selected: e.target.value })} 
            className="form-control form-control-sm"
          >
            <option value="">Seleccione</option>
            {options}
          </select>
        </div>
        <Loop 
          value={this.state.loop}
          onChange={value => this.setState({ loop: value })}
        />
        <Time 
          value={this.state.time}
          onChange={value => this.setState({ time: value })}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.show.audio,
});

const mapDispatchToProps = dispatch => ({
  getFilesFromEvent: (type) => dispatch(getFilesFromEvent(type)),
  setCurrentScene: (scene, current) => dispatch(setCurrentScene(scene, current)),
  endCurrentSceneTime: scene => dispatch(endCurrentSceneTime(scene)),
  endRunningShow: (scene) => dispatch(endRunningShow(scene)),
  displayAlertMessage: (title, text, type = 'info') => dispatch(displayAlertMessage(title, text, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioControls);