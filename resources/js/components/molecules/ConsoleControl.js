import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

class ConsoleControl extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render () {
    const { name, icon, color, running, current } = this.props;
    const consoleClassNames = classnames('console-status', {
      'running': running && current,
      'waiting': !running && current,
      'nothing': !running && !current,
    });

    return (
      <div className="console rounded">
        <div className="console-header">
          <h5>
            <FontAwesomeIcon icon={icon} color={color}/> {`   `} {name}
          </h5>
        </div>
        <div className={consoleClassNames}>
          <p className="text-center">
            {running && current ? 'Ejecutando' : null}
            {!running && current ? 'En Espera' : null}
            {!running && !current ? 'Nada Pendiente' : null}
          </p>
        </div>
      </div>
    )
  }
}

export default ConsoleControl;