import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import Progress from './Progress';
import cover from '../../../assets/img/cover.png';

const CourseCard = (props) => {
  const classes = [
    'col-12',
    'col-sm-6',
    'col-md-6',
    'col-lg-4',
    'col-xl-3',
    'mb-3'
  ];

  const coursePath = `http://localhost:5001/uploads/${props.slug}`;

  return (
    <div className={classes.join(' ')}>
      <div className='card'>
        <img
          src={props.cover ? `${coursePath}/${props.cover}` : cover}
          className='card-img-top'
          alt='Course cover'
        />
        {props.displayProgress && <Progress />}
        <div className='card-body'>
          <h5 className='card-title'>{props.title}</h5>
          {props.author && (
            <h6 className="card-subtitle mb-2 text-muted">by {
              <Link
                className='text-decoration-none'
                to={`/authors/${props.author._id}`}>
                {props.author.name}
              </Link>
            }</h6>
          )}
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