import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Loading } from './Loading';
import { MONTH } from '../constants';
import { GET_LISTS_MONTH } from '../graphql/queries';

export const Lists = ({ teamsMonth, year, month }) => {
  const [sundaySelected, setSunday] = useState(teamsMonth[0]?.sunday);
  const { loading, data, error, refetch } = useQuery(GET_LISTS_MONTH, {
    variables: {
      year: String(year),
      month: String(month),
    },
    awaitRefetchQueries: true,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className=' p-2'>
        <div className='card' style={{ width: '24rem' }}>
          <div className='card-header bg-secondary text-white'>
            <select
              className='form-select bg-secondary text-white'
              aria-label='Default select example'
              onChange={(e) => setSunday(e.target.value)}
            >
              {teamsMonth.map(({ sunday, month, id }) => {
                return (
                  <option
                    key={id}
                    value={sunday}
                  >{`${sunday} ${MONTH[month]}`}</option>
                );
              })}
            </select>
          </div>
          <div className='card-body'>
            <ul className='list-group list-group-flush'>
              {data.list
                .filter(({ sunday }) => sunday === sundaySelected)
                .map(({ title, link, id }) => {
                  return title && link ? (
                    <a key={id} href={link} className='list-group-item'>
                      {title}
                    </a>
                  ) : (
                    <li key={id} className='list-group-item'>
                      {title}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Lists;
