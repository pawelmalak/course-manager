import React from 'react';

const Container = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 py-5">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default Container;