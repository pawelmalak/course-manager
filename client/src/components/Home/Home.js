import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Headline from '../UI/Headline';
import Container from '../UI/Container';
import HomeSection from './HomeSection';

const Home = (props) => {
  const hour = new Date().getHours();
  let greeting = '';
  let name = '';
  if (hour < 6) greeting = `Pulling an all-nighter?`;
  else if (hour >= 6 && hour < 12) greeting = `Good Morning ${name}`;
  else if (hour >= 12 && hour < 17) greeting = `Good Afternoon ${name}`;
  else if (hour >= 17 && hour <= 24) greeting = `Good Evening ${name}`;

  return (
    <Container>
      {props.loading || props.user === null
        ? (
          <Headline
            title={greeting}
            subtitle={<span>Go to <Link to='/courses' className='text-decoration-none'>Courses</Link> tab to explore available courses</span>}
          />
        )
        : (
          <Fragment>
            <Headline
              title={`${greeting} ${props.user.name ? props.user.name : ''}`}
              subtitle={props.user.watched.length > 0 
                ? 'Continue watching your recent courses'
                : <span>You haven't watched anything yet. Go to <Link to='/courses' className='text-decoration-none'>Courses</Link> tab to explore available courses</span>
              }
            />
            {props.user.favorites.watched > 0 && <HomeSection title='Continue watching' />}
            {props.user.favorites.length > 0 && <HomeSection title='Favorites' />}
          </Fragment>
        )
      }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.auth.loading
  }
}

export default connect(mapStateToProps)(Home);