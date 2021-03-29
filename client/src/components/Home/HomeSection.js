import React, { Fragment } from 'react';

import CourseCard from '../UI/Cards/CourseCard';

const HomeSection = (props) => {
  return (
    <Fragment>
      <h5 className='mb-2'>{props.title}</h5>
      <CourseCard title='courseX' id='456' displayProgress />
      <CourseCard title='courseX' id='456' displayProgress />
    </Fragment>
  )
}

export default HomeSection;