import React from 'react';
import ColorControls from './ColorControls';
import FlashControls from './FlashControls';
import AudioControls from './AudioControls';
import VideoControls from './VideoControls';
import classnames from 'classnames';
import { connect } from 'react-redux';

class Live extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      
    }
  }

  render () {
    const { show } = this.props;

    const columns = Object.keys(show).map((name, i) => {
      let classNames = classnames('col-xs-6', 'col-sm-4', 'col-md-3', {
        'bg-dark': i % 2 === 0,
      }, 'py-3');
      
      return (
        <div key={i} className={classNames}>
          {name === 'color' && <ColorControls />}
          {name === 'flash' && <FlashControls />}
          {name === 'audio' && <AudioControls />}
          {name === 'video' && <VideoControls />}
        </div>
      )
    })

    return (
      <div className="row row-fluid">
        {columns}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  show: state.show,
})

export default connect(mapStateToProps)(Live);