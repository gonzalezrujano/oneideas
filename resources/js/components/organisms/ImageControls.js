import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import Time from './../molecules/Time';
import Vibrate from './../molecules/Vibrate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFilesFromEvent } from './../../redux/actions/show';
import DropdownImageSelector from './../molecules/DropdownImageSelector';
import { connect } from 'react-redux';

class ImageControls extends React.Component {  
  constructor (props) {
    super(props);

    this.state = {
      loop: 0,
      time: 0,
      files: [],
      isSelectorOpen: false,
      vibrate: false,
    }

    this.handleImageSelect = this.handleImageSelect.bind(this);
  }

  componentDidMount () {
    this.props.getFilesFromEvent('Imagen').then(files => {
      this.setState({ 
        files: files.map(file => ({...file, selected: false }))
      });
    })
    .catch(e => {
      console.log('Error', e);
    })
  }

  handleImageSelect (imageId) {
    this.setState(state => ({
      files: state.files.map(file => {
        if (file._id === imageId)
          return {...file, selected: !file.selected };

        return file;
      })
    }));
  }

  render () {

    const images = this.state.files.map(file => ({
      id: file._id,
      selected: file.selected,
      url: `storage/${file.Path}`
    }));

    return (
      <React.Fragment>
        <ConsoleControl 
          name="imagen"
          icon={this.props.image.icon}
          color={this.props.image.color}
          running={this.props.image.running}
          current={this.props.image.current}
        />
        <button 
          onClick={() => console.log(this.state)}
          className="btn btn-sm btn-block btn-running mt-3 py-0 rounded"
        >
          <FontAwesomeIcon icon="paper-plane" color="#fff"/>
        </button>
        <div className="mt-1">
          <button 
            onClick={e => this.setState(state => ({ isSelectorOpen: !state.isSelectorOpen }))}
            className="btn btn-block btn-primary mt-3 py-0 rounded btn-txt"
          >
            {this.state.isSelectorOpen ? (
              <FontAwesomeIcon icon="sort-up" color="#fff"/>
              ) : (
              <FontAwesomeIcon icon="sort-down" color="#fff"/>
            )}
          </button>
        </div>
        <div className="mt-3">
          <DropdownImageSelector
            images={images}
            open={this.state.isSelectorOpen}
            handleSelect={this.handleImageSelect}
          />
        </div>
        <Loop 
          value={this.state.loop}
          onChange={loop => this.setState({ loop })}
        />
        <Time 
          value={this.state.time}
          onChange={time => this.setState({ time })}
        />
        <Vibrate 
          vibrate={this.state.vibrate}
          onChange={() => this.setState(state => ({ vibrate: !state.vibrate }))}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  image: state.show.image,
});

const mapDispatchToProps = dispatch => ({
  getFilesFromEvent: (type) => dispatch(getFilesFromEvent(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageControls);