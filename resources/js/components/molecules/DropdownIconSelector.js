import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import icons from './../../data/icons';

function DropdownIconSelector (props) {
  const [selected, setSelected] = useState('star');
  const [ isOpen, setOpen ] = useState(false);
  
  const style = useSpring({
    height: isOpen ? '200px' : '0px',
  });

  const iconItem = icons.map((icon, i) => (
    <div key={i} className="icon-dropdown-item text-center">
      <FontAwesomeIcon
        icon={icon}
        color={props.color}
        onClick={() => setSelected(icon)}
      />
    </div>
  ));

  const dropdownListClass = classnames('icon-dropdown-list', 'rounded', {
    'py-2': isOpen
  }, 'mt-1', 'bg-light')

  return (
    <div className="icon-dropdown rounded">
      <div 
        onClick={e => setOpen(!isOpen)} 
        className="icon-dropdown-header text-center rounded"
      >
        <FontAwesomeIcon
          color={props.color}
          icon={selected}
        />
      </div>
      <animated.div style={style} className={dropdownListClass}>
        {iconItem}
      </animated.div>
    </div>
  );
}

export default DropdownIconSelector;