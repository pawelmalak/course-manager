import React from 'react';

const Container = (props) => {
  return (
    <div className="container">
      <div className="row py-4">
        {props.children}
      </div>
    </div>
  )
}

export default Container;