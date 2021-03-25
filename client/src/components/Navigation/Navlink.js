import React from 'react';
import { Link } from 'react-router-dom';

const Navlink = (props) => {
  const classes = ['nav-link', props.active && 'active'].join(' ');

  return (
    <li className='nav-item'>
      <Link className={classes} to={props.link}>{props.children}</Link>
    </li>
  )
};

export default Navlink;