import React from 'react';
import { NavLink } from 'react-router-dom';

const Navlink = (props) => {
  return (
    <li className='nav-item'>
      <NavLink className='nav-link' exact to={props.link}>{props.children}</NavLink>
    </li>
  )
};

export default Navlink;