import React from 'react';

import Headline from '../Headline';
import Container from '../Container';
import TableHead from './TableHead';

const Table = (props) => {
  return (
    <Container>
      <table className='table'>
        <TableHead headers={[1,2,3]} />
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </table>
    </Container>
  )
}

export default Table;