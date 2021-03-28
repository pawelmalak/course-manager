import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/author';

import Headline from '../UI/Headline';
import Container from '../UI/Container';
import CourseCard from '../UI/Cards/CourseCard';
import Spinner from '../UI/Spinner';

const Author = (props) => {
  const { fetchAuthor } = props;

  useEffect(() => {
    fetchAuthor(props.match.params.id);
  }, [fetchAuthor]);

  return (
    <Container>
      {props.loading
        ? (<Spinner />)
        : (
          <Fragment>
            <Headline 
              title={props.author.name}
              subtitle={<a href={props.author.website} target='blank' className='text-decoration-none'>Go to author's website</a>}
              link='/authors'
              count={props.author.courses ? props.author.courses.length : 0}
            />
            {props.author.courses && props.author.courses.length > 0
              ? (
                props.author.courses.map(c => (
                  <CourseCard
                    key={c._id}
                    title={c.name}
                    date={c.createdAt}
                    id={c._id}
                    cover={c.cover}
                    displayProgress
                  />
                ))
              )
              : (<p>This author doesn't have any courses</p>)
            }
          </Fragment>
        )
      }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    author: state.author.author,
    loading: state.author.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAuthor: (id) => dispatch(actions.getAuthor(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Author);

