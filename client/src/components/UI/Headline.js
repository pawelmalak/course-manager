import React, { Fragment } from 'react';

const Headline = (props) => {
  return (
    <Fragment>
      <div className='d-flex justify-content-between'>
        <h2>{props.title}</h2>
        {props.count && (
          <button type='button' className='btn btn-outline-dark'>
            Total&nbsp;&nbsp;
            <span className='badge bg-dark' id='badge-count'>{props.count}</span>
          </button>
        )}
      </div>
      {props.subtitle && (<h6 className='text-muted'>{props.subtitle}</h6>)}
    </Fragment>
  )
}

export default Headline;