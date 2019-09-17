import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Loop extends React.Component {
  constructor (props) {
    super(props);

    this.onWheelMovement = this.onWheelMovement.bind(this);
    this.onRestartClick = this.onRestartClick.bind(this);
    this.loopRef = React.createRef();
  }

  componentDidMount () {
    this.loopRef.current.addEventListener('wheel', this.onWheelMovement, { passive: false });
  }

  componentDidUpdate (prevProps) {
    if (prevProps.value == -1 && this.props.value > -1) {
      this.loopRef.current.addEventListener('wheel', this.onWheelMovement, { passive: false });
    }
  }

  onWheelMovement (e) {
    e.preventDefault();

    let next = parseInt(this.loopRef.current.value) + (e.deltaY * -0.01);
    let value = next < -1 ? -1 : next;

    this.props.onChange(value);
  }

  onRestartClick (e) {
    e.preventDefault();

    this.props.onChange(0);
  }

  render () {
    const { value } = this.props;

    return (
      <div className="console command rounded mt-3">
        <div className="console-header">
          <h6>
            <FontAwesomeIcon icon="ring" /> {`   `} Loop
          </h6>
        </div>
        <form>
          <div className="console-body">
            <div className="command-control">
              {value === -1 ? (
                <div className="my-2 text-center">
                  <FontAwesomeIcon 
                    icon="infinity" 
                    color="#fff" 
                    size="3x"
                    onClick={this.onRestartClick}
                  />
                </div>
              ):(
                <input 
                  name="n" 
                  min="-1"
                  value={value}
                  type="number"
                  ref={this.loopRef}
                />
              )}
            </div>
            <div className="command-control">
              <div className="btn-group" style={{ display: 'flex' }}>
                <button 
                  type="button" 
                  className="btn btn-sm p-0 nothing" 
                  onClick={this.onRestartClick}
                >
                  <FontAwesomeIcon icon="undo-alt" color="#fff" />
                </button>
                <button 
                  type="button" 
                  className="btn btn-sm p-0 running"
                >
                  <FontAwesomeIcon icon="paper-plane" color="#fff" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Loop;