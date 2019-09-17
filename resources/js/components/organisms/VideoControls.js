import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import { connect } from 'react-redux';

class VideoControls extends React.Component {  
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
          name="video"
          icon={this.props.video.icon}
          color={this.props.video.color}
          running={this.props.video.running}
          current={this.props.video.current}
        />
        <div className="mt-3">
          <select className="form-control form-control-sm">
            <option value="">Seleccione</option>
            <option value="1">Wedding.mp4</option>
            <option value="2">WifesVideo.mpeg</option>
            <option value="3">AvengersBirthday.mp4</option>
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
  video: state.show.video,
});

export default connect(mapStateToProps)(VideoControls);