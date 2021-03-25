import React from 'react';

import Navlinks from './Navlinks';

const NavBar = () => {
  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
      <div className='container-fluid'>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <Navlinks />
        <form className='d-flex'>
          <input className='form-control me-2' type='search' placeholder='Search' />
        </form>
      </div>
    </nav>
  );
};

export default NavBar;