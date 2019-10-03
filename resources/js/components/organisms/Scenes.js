import React from 'react';
import ColorSelector from './../molecules/ColorSelector';
import ColorScene from './ColorScene';
import FlashScene from './FlashScene';
import AudioScene from './AudioScene';
import VideoScene from './VideoScene';
import ImageScene from './ImageScene';
import DropdownIconSelector from './../molecules/DropdownIconSelector';

class Scenes extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      icon: 'star',
      color: '#5e72e4',
    };

    // Refs
    this.colorRef = React.createRef();
    this.flashRef = React.createRef();
    this.audioRef = React.createRef();
    this.videoRef = React.createRef();
    this.imageRef = React.createRef();

    // Functions
    this.setColor = this.setColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  setColor (color) {
    this.setState({ color });
  }

  handleSubmit (e) {
    e.preventDefault();

    const colorConf = this.colorRef.current.getConfiguration();
    const flashConf = this.flashRef.current.getConfiguration();
    const audioConf = this.audioRef.current.getConfiguration();
    const videoConf = this.videoRef.current.getConfiguration();
    const imageConf = this.imageRef.current.getConfiguration();
    const { name, color, icon } = this.state;

    console.log('name', name);
    console.log('color', color);
    console.log('icon', icon);
    console.log('colorConf', colorConf);
    console.log('flashConf', flashConf);
    console.log('audioConf', audioConf);
    console.log('videoConf', videoConf);
    console.log('imageConf', imageConf);   
  }

  render () {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-center mb-1 mt-2 oneshow-title">
              Nombre
            </h5>
            <div className="form-group">
              <input 
                type="text"
                name="name"
                value={this.state.name}
                className="form-control"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-md-4">
            <h5 className="text-center mb-1 mt-2 oneshow-title">
              Icono
            </h5>
            <DropdownIconSelector
              icon={this.state.icon}
              color={this.state.color}
              onChange={(icon) => this.setState({ icon })}
            />
          </div>
          <div className="col-md-4">
            <h5 className="text-center mb-1 mt-2 oneshow-title">
              Color
            </h5>
            <ColorSelector 
              onSubmit={this.setColor}
            />
          </div>
        </div>
        <div>
          <ColorScene
            ref={this.colorRef}
            containerStyle="bg-dark py-3 px-3"
          />
          <FlashScene
            ref={this.flashRef}
            containerStyle="py-3 px-3"
          />
          <AudioScene
            ref={this.audioRef}
            containerStyle="bg-dark py-3 px-3"
          />
          <VideoScene
            ref={this.videoRef}
            containerStyle="py-3 px-3"
          />
          <ImageScene
            ref={this.imageRef}
            containerStyle="bg-dark py-3 px-3"
          />
          <div className="text-right my-3">
            <button onClick={this.handleSubmit} className="btn btn-primary btn-sm rounded">
              Guardar Escena
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Scenes;