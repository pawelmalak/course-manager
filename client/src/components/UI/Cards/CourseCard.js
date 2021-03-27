import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Progress from './Progress';
import cover from '../../../assets/img/cover.png';

const CourseCard = (props) => {
  const sizeClasses = [
    'col-12',
    'col-sm-6',
    'col-md-6',
    'col-lg-4',
    'col-xl-3'
  ];

  const spaceClasses = [
    'my-2'
  ];

  return (
    <div className={[...sizeClasses, ...spaceClasses].join(' ')}>
      <div className='card'>
        <img
          src={props.cover ? `http://localhost:5001/uploads/${props.id}/${props.cover}` : cover}
          className='card-img-top'
          alt='Course cover'
        />
        {props.displayProgress && <Progress />}
        <div className='card-body'>
          <h5 className='card-title'>{props.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">by designcode.io</h6>
          {props.date && (
            <h6 className="card-subtitle mb-2 text-muted">{
              dayjs(props.date).format('YYYY-MM-DD')
            }</h6>
          )}
          {props.id && (
            <Link
              to={`/courses/${props.id}`}
              className='btn btn-outline-dark'
              style={{ width: '100%' }}>
              View more
            </Link>
          )}
        </div>
      </div>
    </div>
  )
};

export default CourseCard;