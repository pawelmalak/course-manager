import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/author';

import Headline from '../UI/Headline';
import Container from '../UI/Container';
import AuthorCard from '../UI/Cards/AuthorCard';
import Spinner from '../UI/Spinner';

const Authors = (props) => {
  const { fetchAuthors } = props;

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  return (
    <Container>
      <Headline title='Authors' count={props.authors.length} />
      {props.loading
        ? <Spinner />
        : (
          props.authors.length > 0
            ? props.authors.map(a => <AuthorCard author={a} key={a._id} />)
            : (<p>No authors found</p>)
        )
      }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    authors: state.author.authors,
    loading: state.author.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAuthors: () => dispatch(actions.getAuthors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authors);