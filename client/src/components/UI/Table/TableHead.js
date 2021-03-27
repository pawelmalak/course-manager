import React from 'react';

const TableHead = (props) => {
  return (
    <thead>
      <tr>
        {props.headers.map(h => <th scope='col'>{h}</th>)}
      </tr>
    </thead>
  )
}

export default TableHead;