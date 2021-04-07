import React, { useEffect, useState } from 'react';
import { faUser, faList } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/dashboard';

import Headline from '../UI/Headline';
import Container from '../UI/Container';
import DashboardCard from '../UI/Cards/DashboardCard';
import Spinner from '../UI/Spinner';

const Dashboard = (props) => {
  const [cards, setCards] = useState([
    {
      title: 'Users',
      links: [
        { text: 'Add', dest: '/dashboard/users/create', icon: faUser },
        { text: 'List', dest: '/dashboard/users', icon: faList, propsType: 'users' }
      ]
    },
    {
      title: 'Courses',
      links: [
        { text: 'Add', dest: '/dashboard/courses/create', icon: faUser }
      ]
    },
    {
      title: 'Authors',
      links: [
        { text: 'Add', dest: '/dashboard/authors/create', icon: faUser },
        { text: 'List', dest: '/dashboard/authors', icon: faList, propsType: 'authors' }
      ]
    },
  ]);

  const { fetchCount } = props;

  useEffect(() => {
    fetchCount();
  }, [fetchCount]);


  useEffect(() => {
    if (props.count) {
      setCards([
        { ...cards[0], count: props.count.users },
        { ...cards[1], count: props.count.courses },
        { ...cards[2], count: props.count.authors }
      ])
    }
  }, [props.count]);

  return (
    <Container>
      <Headline title='App Dashboard' subtitle='Manage courses, authors and users from here' />
      {props.loading
        ? <Spinner />
        : cards.map((c, i) => <DashboardCard card={c} key={i} />)
      }
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.dashboard.loading,
    count: state.dashboard.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCount: () => dispatch(actions.getCount())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);