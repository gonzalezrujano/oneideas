import React from 'react';
import Toggle from './../atoms/Toggle';

class FlashScene extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      bpm: '',
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
          Flash
        </Toggle>
        <div className="row">
          <div className="col-md-12">
            <div className="form-inline">
              <div className="form-group">
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

export default FlashScene;