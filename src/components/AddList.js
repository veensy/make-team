import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { MONTH } from '../constants';
import { ListInputs } from './ListInputs';
import { GET_LISTS_MONTH } from '../graphql/queries';
import { ADD_LIST } from '../graphql/mutations';
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
  const emptyMessage = { type: '', message: '' };
  const [daySelected, setDay] = useState('');
  const [helperMessage, setMessage] = useState(emptyMessage);
  const [disabled, setDisable] = useState(false);
  const [addList, { data, error }] = useMutation(ADD_LIST, {
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

  useEffect(() => {
    if (helperMessage?.message) {
      setDisable(true);
      const timer = setTimeout(() => {
        setDisable(false);
        setMessage(emptyMessage);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [helperMessage.message]);

  const saveSetList = (saveList) => {
    const { title, link } = saveList;
    if (!daySelected || !year || !month) {
      setMessage({ type: 'error', message: 'please reload the page' });
      return;
    }
    if (!title && !link) {
      setMessage({ type: 'error', message: 'title and link missing' });
      callToast({
        text: `title and link missing`,
        title: 'Empty field',
        icon: <WarningIcon />,
        color: 'bg-warning',
      });
      return;
    } else {
      setDisable(true);
      addList({
        variables: {
          year: String(year),
          month: String(month),
          day: String(daySelected),
          title,
          link,
          city,
          event,
          eventName,
        },
      });
      if (error) {
        setMessage({
          type: 'error',
          message: 'Not able to save please try again',
        });
      }
      if (data) {
        setMessage({ type: 'success', message: 'Saved' });
      }
    }
  };
  const helperTypeClassname = `${
    helperMessage.type === 'error' ? 'text-danger' : 'text-success'
  } fw-bolder m-0`;
  return (
      <div className='card d-flex justify-content-center' >
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
          <ListInputs
            saveSetList={saveSetList}
            disabled={disabled}
            helperMessage={helperMessage}
          />
          {helperMessage?.message && (
            <p className={helperTypeClassname}>{helperMessage.message}</p>
          )}
        </div>
      </div>
  );
};
export default AddList;
