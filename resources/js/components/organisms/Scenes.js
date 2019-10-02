import React from 'react';
import ColorSelector from './../molecules/ColorSelector';
import DropdownIconSelector from './../molecules/DropdownIconSelector';
import icons from './../../data/icons';

class Scenes extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      color: '#5e72e4',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleNewColor = this.handleNewColor.bind(this);
    this.handleDeletedColor = this.handleDeletedColor.bind(this);
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleNewColor (color) {
    this.setState({ color });
  }

  handleDeletedColor (index) {
    this.setState(state => ({
      colors: state.colors.filter((_, i) => i !== index)
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
              onSubmit={this.handleNewColor}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Scenes;