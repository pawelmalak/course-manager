import React from 'react';

import LinkWithIcon from '../../UI/LinkWithIcon';

const DashboardCard = ({ card }) => {
  return (
    <div className='col-12 mb-3'>
      <div className='card'>
        <div className='card-body'>
          <div className='d-flex align-items-center justify-content-between'>
            <h5 className='card-title'>
              {card.title}
            </h5>
            <button type='button' className='btn btn-outline-dark'>
              Total <span className='badge bg-dark'>{card.count}</span>
            </button>
          </div>
          {card.links.map((l, i) => <LinkWithIcon link={l} key={i} />)}
        </div>
      </div>
    </div>
  )
}

export default DashboardCard;