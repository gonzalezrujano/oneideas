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
      color: '#5e72e4',
    };

    this.setColor = this.setColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewColor = this.handleNewColor.bind(this);
    this.handleDeletedColor = this.handleDeletedColor.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleCheckboxChange (e) {
    const name = e.target.name;
    const checked = e.target.checked;

    this.setState(state => ({
      [name]: {
        ...state[name],
        enabled: checked
      }
    }));
  }

  handleNewColor (color) {
    this.setState(state => ({
      colors: {
        ...state.colors,
        colors: [
          ...state.colors.colors, 
          color
        ]
      }
    }));
  }

  setColor (color) {
    this.setState({ color });
  }

  handleDeletedColor (index) {
    this.setState(state => ({
      colors: {
        ...state.colors,
        colors: state.colors.colors.filter((_, i) => i !== index)
      }
    }));
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
              color={this.state.color}
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
            containerStyle="bg-dark py-3 px-3"
          />
          <FlashScene
            containerStyle="py-3 px-3"
          />
          <AudioScene
            containerStyle="bg-dark py-3 px-3"
          />
          <VideoScene
            containerStyle="py-3 px-3"
          />
          <ImageScene
            containerStyle="bg-dark py-3 px-3"
          />
          <div className="text-right my-3">
            <button className="btn btn-info btn-sm">
              Guardar Escena
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Scenes;