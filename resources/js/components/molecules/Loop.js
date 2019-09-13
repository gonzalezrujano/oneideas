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

  onWheelMovement (e) {
    e.preventDefault();

    let next = parseInt(this.loopRef.current.value) + (e.deltaY * -0.01);

    this.loopRef.current.value = next < 0 ? 0 : next;

    // this.setState((state) => {
    //   let next = state.n + (e.deltaY * -0.01);

    //   return {n: next < 0 ? 0 : next}
    // });

    // return false;
  }

  onRestartClick (e) {
    e.preventDefault();

    this.loopRef.current.value = 0;
  }

  render () {
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
              <input 
                name="n" 
                min="0"
                defaultValue={0}
                type="number" 
                ref={this.loopRef}
              />
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