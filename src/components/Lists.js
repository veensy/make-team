import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Loading } from './Loading';
import { MONTH, SERVICE } from '../constants';
import { GET_LISTS_MONTH } from '../graphql/queries';

export const Lists = ({
  teamsMonth,
  year,
  month,
  city,
  event,
  sundaysInMonth,
  eventName,
}) => {
  const [daySelected, setDay] = useState('');
  const { loading, data, error, refetch } = useQuery(GET_LISTS_MONTH, {
    variables: {
      year: String(year),
      month: String(month),
      city,
      event,
    },
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    if (teamsMonth && event === SERVICE) {
      setDay(teamsMonth[0]?.day);
    } else if (data?.list) {
      const listOfEvent = data.list.filter(
        (team) => team.eventName === eventName
      );
      if (listOfEvent) {
        setDay(listOfEvent[0]?.day);
      }
    }
    refetch()
  }, [teamsMonth, eventName]);
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
              onChange={(e) => setDay(e.target.value)}
            >
              {sundaysInMonth.map((sunday, idx) => {
                return (
                  <option
                    key={idx}
                    value={sunday}
                  >{`${sunday} ${MONTH[month]}`}</option>
                );
              })}
            </select>
          </div>
          <div className='card-body'>
            <ul className='list-group list-group-flush'>
              {data.list
                .filter(({ day }) => day === daySelected)
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
