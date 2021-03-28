import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/author';

import Headline from '../UI/Headline';
import Container from '../UI/Container';
import AuthorCard from '../UI/Cards/AuthorCard';

const Authors = (props) => {
  const { fetchAuthors } = props;

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  return (
    <Container>
      <Headline title='Authors' count={props.authors.length} />
      {props.authors.map(a => <AuthorCard author={a} />)}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    authors: state.author.authors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAuthors: () => dispatch(actions.getAuthors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authors);