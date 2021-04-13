import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { MONTH } from '../constants';
import { ListInputs } from './ListInputs';
import { GET_LISTS_MONTH } from '../graphql/queries';
import { ADD_LIST, UPDATE_LIST } from '../graphql/mutations';
import { WarningIcon } from '../icons';

export const AddList = ({
  teamsMonth,
  callToast,
  year,
  month,
  sundaysInMonth,
  city,
  event,
  eventName,
}) => {
  const [listTosave, setlistTosave] = useState([]);
  const [daySelected, setDay] = useState('');
  const [emptyValues, setEmptyValues] = useState(true);
  const [addList, { error: errorAddList }] = useMutation(ADD_LIST, {
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
  });

  useEffect(() => {
    if (teamsMonth) {
      setDay(teamsMonth[0]?.day);
    }
  }, [teamsMonth]);

  useEffect(() => {
    setDay(sundaysInMonth[0]);
  }, [sundaysInMonth]);

  const saveList = (setlist) => {
    if (setlist.length) {
      setEmptyValues(false);
    }
    setlistTosave(setlist);
  };
  const handleSetList = ({ day }) => {
    listTosave.map(({ title, link }) => {
      if (!title && !link) {
        callToast({
          text: `title and link missing`,
          title: 'Empty field',
          icon: <WarningIcon />,
          color: 'bg-warning',
        });
      } else {
        addList({
          variables: {
            year: String(year),
            month: String(month),
            day: String(day),
            title,
            link,
            city,
            event,
        eventName
          },
        });
      }
    });
  };
  return (
    <div className=' p-2'>
      <div className='card' style={{ width: '32rem' }}>
        <div className='card-header bg-secondary text-white'>Add a song</div>

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
          <ListInputs setlist={saveList} />
        </div>
        <div className='card-footer '>
          <button
            onClick={() => handleSetList({ day: daySelected })}
            type='button'
            className='btn btn-outline-secondary mx-auto d-flex  justify-content-center'
            disabled={emptyValues}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddList;
