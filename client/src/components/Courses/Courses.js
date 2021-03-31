import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/course';

import Headline from '../UI/Headline';
import Container from '../UI/Container';
import CourseCard from '../UI/Cards/CourseCard';
import Spinner from '../UI/Spinner';

const Courses = (props) => {
  const { fetchCourses } = props;

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <Container>
      <Headline
        title='Courses'
        subtitle='All courses in your library'
        count={props.courses.length}
      />
      {props.loading
        ? <Spinner />
        : (
          props.courses.length > 0
            ? props.courses.map(c => (
              <CourseCard
                key={c._id}
                title={c.name}
                date={c.createdAt}
                id={c._id}
                cover={c.cover}
                slug={c.slug}
                author={c.author}
                displayProgress
              />
            ))
            : (<p>This course library is empty</p>)
        )
      }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    courses: state.course.courses,
    loading: state.course.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCourses: () => dispatch(actions.getCourses())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Courses);