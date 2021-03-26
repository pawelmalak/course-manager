import React from 'react';

import Navlink from './Navlink';

const Navlinks = () => {
  return (
    <div className='collapse navbar-collapse' id='navbarNav'>
      <ul className='navbar-nav'>
        <Navlink link='/'>Home</Navlink>
        <Navlink link='/courses'>Courses</Navlink>
        <Navlink link='/authors'>Authors</Navlink>
        <Navlink link='/tags'>Tags</Navlink>
        <Navlink link='/auth'>Auth</Navlink>
      </ul>
    </div>
  )
};

export default Navlinks;