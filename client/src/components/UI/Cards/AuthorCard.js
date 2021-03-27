import React from 'react';
import { Link } from 'react-router-dom';

import avatar from '../../../assets/img/avatar.png';

const AuthorCard = ({ author }) => {
  return (
    <div className="col-12 col-md-4 col-xl-3 my-2">
      <div className='card'>
        <div className='card-body d-flex'>
          <img
            src={author.avatar ? author.avatar : avatar}
            className='img-fluid me-4'
            alt='...'
            style={{ height: '50px', borderRadius: '50%' }}
          />
          <div>
            <h5 class="card-title">{author.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{author.courses.length} courses</h6>
            <Link to={`/authors/${author._id}`}>View Author</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthorCard;