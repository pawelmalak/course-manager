import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import classes from './Table.module.css';

const TableHead = (props) => {
  return (
    <thead>
      <tr>
        {props.headers.map((h, i) => {
          return (
            <th
              key={i}
              name={h.name}
              onClick={() => props.sort(h.name, h.isSortable)}
              className={h.isSortable ? classes.TableHead : ''}
            >
              {h.display}
              {' '}
              {h.isActive && (
                h.isAsc
                  ? <FontAwesomeIcon icon={faSortUp} />
                  : <FontAwesomeIcon icon={faSortDown} />
              )}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}

export default TableHead;