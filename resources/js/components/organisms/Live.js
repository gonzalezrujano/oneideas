import React from 'react';
import ColorControls from './ColorControls';
import FlashControls from './FlashControls';
import AudioControls from './AudioControls';
import VideoControls from './VideoControls';
import ImageControls from './ImageControls';
import SceneControl from './SceneControl';
import classnames from 'classnames';
import { getScenesFromShow } from './../../redux/actions/show';
import { connect } from 'react-redux';

class Live extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.getScenesFromShow();
  }

  render () {
    const { show } = this.props;

    const columns = Object.keys(show).filter(name => name !== 'scenes').map((name, i) => {
      let classNames = classnames('col-xs-6', 'col-sm-4', 'col-md-3', {
        'bg-dark': i % 2 === 0,
      }, 'py-3');
      
      return (
        <div key={i} className={classNames}>
          {name === 'color' && 
            <ColorControls 
              submitCommand={this.props.submitCommand} 
            />
          }
          {name === 'flash' && 
            <FlashControls 
              submitCommand={this.props.submitCommand} 
            />
          }
          {name === 'audio' && 
            <AudioControls 
              submitCommand={this.props.submitCommand} 
            />
          }
          {name === 'video' && 
            <VideoControls 
              submitCommand={this.props.submitCommand} 
            />
          }
          {name === 'image' && 
            <ImageControls 
              submitCommand={this.props.submitCommand} 
            />
          }
        </div>
      )
    })

    const length = Object.keys(show.scenes).length - 1;
    const scenes = show.scenes.items.map((scene, i) => {
      let classNames = classnames('col-xs-6', 'col-sm-4', 'col-md-3', {
        'bg-dark': (i + length) % 2 === 0,
      }, 'py-3');

      return (
        <div key={i + length} className={classNames}>
          <SceneControl
            key={scene._id}
            id={scene._id}
            name={scene.name}
            icon={scene.icon}
            color={scene.iconColor}
            scene={scene}
            submitCommand={this.props.submitCommand}
          />
        </div>
      );
    })

    return (
      <div className="row row-fluid">
        {columns}
        {scenes}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  show: state.show,
})

const mapDispatchToProps = dispatch => ({
  getScenesFromShow: () => dispatch(getScenesFromShow()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Live);