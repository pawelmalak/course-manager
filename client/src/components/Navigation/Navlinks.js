import React from 'react';

import Navlink from './Navlink';

const Navlinks = () => {
  return (
    <div className='collapse navbar-collapse' id='navbarNav'>
      <ul className='navbar-nav'>
        <Navlink link='/' active>Home</Navlink>
        <Navlink link='/courses'>Courses</Navlink>
        <Navlink link='/tags'>Tags</Navlink>
        <Navlink link='/auth'>Auth</Navlink>
      </ul>
    </div>
  )
};

export default Navlinks;