import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MONTH } from '../constants';
import { ListInputs } from './ListInputs';
import { GET_LISTS_MONTH } from '../graphql/queries';
import { ADD_LIST, UPDATE_LIST } from '../graphql/mutations';
import { WarningIcon } from '../icons';

export const AddList = ({ teamsMonth, callToast, year, month }) => {
  const [listTosave, setlistTosave] = useState([]);
  const [inputList, setInputList] = useState([{ title: '', link: '' }]);

  const [sundaySelected, setSunday] = useState(teamsMonth[0]?.sunday);
  const [emptyValues, setEmptyValues] = useState(true);
  const [addList, { error: errorAddList }] = useMutation(ADD_LIST, {
    refetchQueries: [
      {
        query: GET_LISTS_MONTH,
        variables: {
          year: String(year),
          month: String(month),
        },
      },
    ],
  });
  const [updateList, { error: errorUpdateList }] = useMutation(UPDATE_LIST, {
    awaitRefetchQueries: true,
  });

  const saveList = (setlist) => {
    if (setlist.length) {
      setEmptyValues(false);
    }
    setlistTosave(setlist);
  };

  const addInput = () => {
    setInputList([...inputList, { title: '', link: '' }]);
  };

  const removeInput = (idx) => {
    const newInput = [...inputList];
    newInput.splice(idx, 1);
    setInputList(newInput);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    setlist(list);
  };

  const handleSetList = ({ sunday }) => {
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
            sunday: String(sunday),
            title,
            link,
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
            onChange={(e) => setSunday(e.target.value)}
          >
            {teamsMonth.map(({ sunday, month,id }) => {
              return (
                <option key={id} value={sunday}>{`${sunday} ${MONTH[month]}`}</option>
              );
            })}
          </select>
          <ListInputs setlist={saveList} />
        </div>
        <div className='card-footer '>
          <button
            onClick={() => handleSetList({ sunday: sundaySelected })}
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
