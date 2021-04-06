import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LinkWithIcon = ({ link }) => {
  return (
    <p className='card-text'>
      <span className='me-2'>
        <FontAwesomeIcon icon={link.icon} />
      </span>
      <Link to={{
        pathname: link.dest,
        state: {
          type: link.propsType
        }
      }}>{link.text}</Link>
    </p>
  )
}

export default LinkWithIcon;