import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { executeScene } from './../../redux/actions/show';
import { connect } from 'react-redux';

class SceneControl extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      current: null,
    }

    this.startScene = this.startScene.bind(this);
  }

  startScene () {
    this.setState({ current: {} });

    this.props.executeScene(this.props.id);

    setTimeout(() => this.setState({
      current: null,
    }), 10000);
  }

  render () {
    return (
      <React.Fragment>
        <ConsoleControl
          running={false}
          name={this.props.name}
          icon={this.props.icon}
          color={this.props.color}
          current={this.state.current}
        />
        <button 
          onClick={this.startScene}
          className="btn btn-sm btn-block btn-running mt-3 py-0 rounded"
        >
          <FontAwesomeIcon icon="paper-plane" color="#fff"/>
        </button>
      </React.Fragment>
    );  
  }
}

const mapDispatchToProps = dispatch => ({
  executeScene: (sceneId) => dispatch(executeScene(sceneId)),
});

export default connect(null, mapDispatchToProps)(SceneControl);