import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import classnames from 'classnames';
import { connect } from 'react-redux';

class Live extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      
    }
  }

  render () {
    const { show } = this.props;

    const columns = Object.keys(show).map((name, i) => {
      let classNames = classnames('col-xs-6', 'col-sm-4', 'col-md-3', {
        'bg-dark': i % 2 === 0,
      }, 'py-3');
      
      return (
        <div key={i} className={classNames}>
          <ConsoleControl 
            name={name}
            icon={show[name].icon}
            color={show[name].color}
            running={show[name].running}
            current={show[name].current}
          />
        </div>
      )
    })

    return (
      <div className="row row-fluid">
        {columns}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  show: state.show,
})

export default connect(mapStateToProps)(Live);