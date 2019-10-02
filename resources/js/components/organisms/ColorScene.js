import React from 'react';
import Toggle from './../atoms/Toggle';
import ColorList from './../molecules/ColorList';
import ColorSelector from './../molecules/ColorSelector';

class ColorScene extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      bpm: '',
      colors: [],
      vibrate: false,
      enabled: false,
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (e) {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    this.setState({
      [e.target.name]: value,
    })
  }

  render () {
    return (
      <div className={this.props.containerStyle}>
        <Toggle 
          name="enabled" 
          checked={this.state.enabled} 
          onChange={this.handleChange}
          className="mb-1"
        >
          Color
        </Toggle>
        <div className="row">
          <div className="col-md-3">
            <ColorSelector
              onSubmit={this.handleNewColor}
            />
            <ColorList 
              onDelete={this.handleDeletedColor}
              colors={this.state.colors}
            />
          </div>
          <div className="col-md-9">
            <div className="form-inline">
              <div className="form-group mx-sm-3">
                <label htmlFor="bpm" className="sr-only">Beats por Minuto</label>
                <input
                  id="bpm"
                  name="bpm"
                  type="number"
                  placeholder="Beats por minuto"
                  className="form-control"
                  value={this.state.bpm}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <Toggle 
                  name="vibrate" 
                  checked={this.state.vibrate} 
                  onChange={this.handleChange}
                >
                  Vibración
                </Toggle>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ColorScene;