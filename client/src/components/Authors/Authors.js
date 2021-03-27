import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Headline from '../UI/Headline';
import Container from '../UI/Container';
import AuthorCard from '../UI/Cards/AuthorCard';

const Authors = (props) => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/authors')
      .then(res => setAuthors(res.data.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <Container>
      <Headline title='Authors' count={authors.length} />
      {authors.map(a => <AuthorCard author={a} />)}
    </Container>
  )
}

export default Authors;