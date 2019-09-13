import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import { connect } from 'react-redux';

function ColorControls (props) {  
  return (
    <React.Fragment>
      <ConsoleControl 
        name="color"
        icon={props.color.icon}
        color={props.color.color}
        running={props.color.running}
        current={props.color.current}
      />
      <Loop />
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  color: state.show.color,
});

export default connect(mapStateToProps)(ColorControls);