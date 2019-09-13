import React from 'react';
import ConsoleControl from './../molecules/ConsoleControl';
import Loop from './../molecules/Loop';
import { connect } from 'react-redux';

function FlashControls (props) {  
  return (
    <React.Fragment>
      <ConsoleControl 
        name="flash"
        icon={props.flash.icon}
        color={props.flash.color}
        running={props.flash.running}
        current={props.flash.current}
      />
      <Loop />
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  flash: state.show.flash,
});

export default connect(mapStateToProps)(FlashControls);