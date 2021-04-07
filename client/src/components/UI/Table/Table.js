import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Headline from '../Headline';
import Container from '../Container';
import TableHead from './TableHead';
import TableRow from './TableRow';

import tableConfig from './Table.config.json';

const Table = (props) => {
  // Set initial state with collection name and data array
  const [data, setData] = useState({
    type: props.location.state.type,
    array: []
  });

  // Get data from specific collection
  useEffect(() => {
    axios.get(`/api/v1/${props.location.state.type}`)
      .then(res => setData({ ...data, array: res.data.data }))
      .catch(err => console.log(err));
  }, []);

  // State for handling sorting options
  const [sortOptions, setSortOptions] = useState({
    field: 'createdAt',
    sortAsc: true
  });

  // Set table headers
  let headers = [];
  if (data.type === 'users') {
    headers = tableConfig.headers.users;
  } else if (data.type === 'authors') {
    headers = tableConfig.headers.authors;
  }

  // Listen for changes on sortOptions and re-render table
  useEffect(() => {
    sortTable(sortOptions.field, sortOptions.sortAsc);

    // Set active field in headers
    tableConfig.headers[data.type].forEach(h => {
      if (h.name === sortOptions.field) {
        h.isActive = true;
        h.isAsc = sortOptions.sortAsc;
      } else {
        h.isActive = false;
      }
    });
  }, [sortOptions]);

  // Init sorting table; Set sorting mode based on the current one
  const sortInitHanlder = (fieldName, fieldIsSortable) => {
    if (fieldIsSortable) {
      // If table is already sorted by given field, toggle sort mode
      const newMode = fieldName == sortOptions.field
        ? !sortOptions.sortAsc
        : true;
      setSortOptions({ field: fieldName, sortAsc: newMode });
    }
  }

  // Main sorting function
  const sortTable = (field = sortOptions.field, sortAsc = sortOptions.sortAsc) => {
    const initArray = [ ...data.array ];
    initArray.sort((a, b) => {
      if (sortAsc) {
        if (a[field] > b[field]) return 1;
        if (a[field] < b[field]) return -1;
        return 0;
      } else if (!sortAsc) {
        if (a[field] > b[field]) return -1;
        if (a[field] < b[field]) return 1;
        return 0;
      }
    });
    setData({ ...data, array: initArray });
  }

  return (
    <Container>
      <Headline
        title={(data.type)[0].toUpperCase() + data.type.slice(1)}
        link='/dashboard'
        count={data.array.length}
      />
      {data.array.length === 0
        ? <p>No data to be displayed</p>
        : (
          <table className='table mt-3'>
            <TableHead headers={headers} sort={sortInitHanlder} />
            <tbody>
              {data.array.map(el => <TableRow key={el._id} data={el} type={data.type} />)}
            </tbody>
          </table>
        )
      }
    </Container>
  )
}

export default Table;