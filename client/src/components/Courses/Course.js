import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../store/actions/course';

import Headline from '../UI/Headline';
import Container from '../UI/Container';
import Spinner from '../UI/Spinner';
import Player from '../Player/Player';
import List from '../UI/List';

const Course = (props) => {
  const { fetchCourse } = props;

  useEffect(() => {
    fetchCourse(props.match.params.id);
  }, []);

  return (
    <Container>
      {console.log(props)}
      {props.loading || props.course === null
        ? <Spinner />
        : (
          <Fragment>
            <Headline
              title={props.course.name}
              link='/courses'
              subtitle={<span>by <Link to={`/authors/${props.course.author._id}`} className='text-decoration-none'>{props.course.author.name}</Link></span>}
              count={props.course.lessons.length}
              badgeText='Lessons'
            />
            <div className="col-12 col-lg-8" id='testPl'>
              <Player cover={props.course.cover} slug={props.course.slug} />
            </div>
            <div className="col-12 col-lg-4">
              lessons
              <List />
            </div>
          </Fragment>
        )
      }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    course: state.course.course,
    loading: state.course.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCourse: (id) => dispatch(actions.getCourse(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);

