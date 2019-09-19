import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import Time from './../molecules/Time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFilesFromEvent } from './../../redux/actions/show';
import { connect } from 'react-redux';

class AudioControls extends React.Component {  
  constructor (props) {
    super(props);

    this.state = {
      loop: 0,
      time: 0,
      files: [],
    }

    this.handleLoopChange = this.handleLoopChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  componentDidMount () {
    this.props.getFilesFromEvent('Audio').then(files => {
      this.setState({ files });
    })
    .catch(e => {
      console.log('Error', e);
    })
  }

  handleTimeChange (value) {
    this.setState({ time: value });
  }

  handleLoopChange (value) {
    this.setState({ loop: value });
  }

  render () {
    const options = this.state.files.map(file => (
      <option key={file._id} value={file._id}>{file.NombreCompleto}</option>
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
          onClick={() => console.log(this.state)}
          className="btn btn-sm btn-block btn-running mt-3 py-0 rounded"
        >
          <FontAwesomeIcon icon="paper-plane" color="#fff"/>
        </button>
        <div className="mt-3">
          <select className="form-control form-control-sm">
            <option value="">Seleccione</option>
            {options}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  audio: state.show.audio,
});

const mapDispatchToProps = dispatch => ({
  getFilesFromEvent: (type) => dispatch(getFilesFromEvent(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioControls);