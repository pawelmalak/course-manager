import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Headline from '../UI/Headline';
import Container from '../UI/Container';
import CourseCard from '../UI/Cards/CourseCard';

const Author = (props) => {
  const [author, setAuthor] = useState();

  useEffect(() => {
    axios.get(`/api/v1/authors/${props.match.params.id}`)
      .then(res => setAuthor(res.data.data))
      .catch(err => console.log(err));
  }, [props.match.params.id]);

  return (
    <Container>
      {author && (
        <Headline
          title={author.name}
          subtitle={<a href={author.website} target='blank'>Go to author's website</a>}
          link='/authors'
          count={author.courses.length}
        />
      )}
      {author && author.courses.map(c => (
        <CourseCard
          key={c._id}
          title={c.name}
          date={c.createdAt}
          id={c._id}
          cover={c.cover}
          displayProgress
        />
      ))
      }
    </Container>
  )
}

export default Author;