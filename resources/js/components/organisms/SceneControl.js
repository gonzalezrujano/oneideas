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
      <div className="mb-3">
        <ConsoleControl
          running={false}
          roundedBottom={false}
          name={this.props.name}
          icon={this.props.icon}
          color={this.props.color}
          current={this.state.current}
          className="no-border-bottom"
        />
        <button 
          onClick={this.startScene}
          className="btn btn-sm btn-block btn-running py-0 rounded-bottom"
        >
          <FontAwesomeIcon icon="paper-plane" color="#fff"/>
        </button>
      </div>
    );  
  }
}

const mapDispatchToProps = dispatch => ({
  executeScene: (sceneId) => dispatch(executeScene(sceneId)),
});

export default connect(null, mapDispatchToProps)(SceneControl);