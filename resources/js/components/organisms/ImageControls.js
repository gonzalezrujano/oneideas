import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import { connect } from 'react-redux';

class ImageControls extends React.Component {  
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
          name="imagen"
          icon={this.props.image.icon}
          color={this.props.image.color}
          running={this.props.image.running}
          current={this.props.image.current}
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
  image: state.show.image,
});

export default connect(mapStateToProps)(ImageControls);