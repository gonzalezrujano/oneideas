import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Vibrate extends React.Component {

  render () {
    const { vibrate } = this.props;

    return (
      <div className="console command rounded mt-3">
        <div className="console-header">
          <h6>
            <FontAwesomeIcon icon="assistive-listening-systems" /> {`   `} Vibración
          </h6>
        </div>
        <form>
          <div className="console-body">
            <div className="command-control" onClick={e => this.props.onChange()}>
              {vibrate &&
                <div className="my-2 text-center">
                  <FontAwesomeIcon 
                    icon="toggle-on" 
                    color="#fff" 
                    size="2x"
                  />
                  <p 
                    className="text-center" 
                    style={{ 
                      fontWeight: '600', 
                      fontSize: '12px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Encendido
                  </p>
                </div>
              }
              {!vibrate &&
                <div className="my-2 text-center">
                  <FontAwesomeIcon 
                    icon="toggle-off" 
                    color="#fff" 
                    size="2x"
                  />
                  <p 
                    className="text-center" 
                    style={{ 
                      fontWeight: '600', 
                      fontSize: '12px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Apagado
                  </p>
                </div>
              }
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

export default Vibrate;