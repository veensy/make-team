import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Loading } from './Loading';
import { MONTH, SERVICE } from '../constants';
import { GET_LISTS_MONTH } from '../graphql/queries';
import { DELETE_LIST } from '../graphql/mutations';

import { TrashIcon } from '../icons';

export const DeleteList = ({
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
  const [deleteList, { error: errordeleteList }] = useMutation(DELETE_LIST, {
    refetchQueries: [
      {
        query: GET_LISTS_MONTH,
        variables: {
          year: String(year),
          month: String(month),
          city,
          event,
        },
      },
    ],
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
    refetch();
  }, [teamsMonth, eventName]);

  const deleteTitle = ({ id }) => {
    deleteList({
      variables: {
        id,
      },
    });
    refetch();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='card d-flex justify-content-center'>
      <div className='card-header bg-secondary text-white'>Delete List</div>
      <div className='card-body'>
        <select
          className='form-select py-0 my-2'
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
        <ul className='list-group list-group-flush'>
          {data.list
            .filter(({ day }) => day === daySelected)
            .map(({ title, id }) => {
              return (
                <li
                  key={id}
                  className='list-group-item d-flex justify-content-between'
                >
                  {title}
                  <button
                    className='btn btn-outline-secondary'
                    type='button'
                    id='button-addon1'
                    onClick={() => deleteTitle({ id })}
                  >
                    <TrashIcon />
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};
export default DeleteList;
