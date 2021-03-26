import React from 'react';

const Alert = (props) => {
  return (
    <div className={`alert alert-dismissible fade show alert-${props.alertType}`} role='alert'>
      {props.children}
      <button type='button' className='btn-close' data-bs-dismiss='alert'></button>
    </div>
  )
}

export default Alert;