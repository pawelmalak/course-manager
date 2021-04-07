import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import tableConfig from './Table.config.json';

const TableRow = (props) => {
  dayjs.extend(relativeTime);
  
  let fields = tableConfig.fields[props.type];

  return (
    <tr>
      {/* Loop over every field to display */}
      {fields.map((f, i) => (
        <td key={i}>
          {/* Check if current field is a date; render using dayjs if it is */}
          {!f.isDate
            // Check if data exists; use default if not
            ? props.data[f.name] ? props.data[f.name] : f.default
            : dayjs().to(props.data[f.name])
          }
        </td>
      ))}
      <td>
        <a href='/'>Edit</a>
        {' | '}
        <a href='/'>Delete</a>
      </td>
    </tr>
  )
}

export default TableRow;