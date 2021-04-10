import { useState } from 'react';
import { useQuery,useMutation } from '@apollo/client';
import { Loading } from './Loading';
import { MONTH } from '../constants';
import { GET_LISTS_MONTH } from '../graphql/queries';
import { DELETE_LIST } from '../graphql/mutations';

import { TrashIcon } from '../icons';

export const DeleteList = ({ teamsMonth, year, month }) => {
  const [sundaySelected, setSunday] = useState(teamsMonth[0]?.sunday);
  const { loading, data, error, refetch } = useQuery(GET_LISTS_MONTH, {
    variables: {
      year: String(year),
      month: String(month),
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
        },
      },
    ],
    awaitRefetchQueries: true,
  })


  const deleteTitle=({id})=>{
      deleteList({
        variables: {
          id,
        },
      })
      refetch()
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className=' p-2'>
        <div className='card' style={{ width: '24rem' }}>
          <div className='card-header bg-secondary text-white'>
           Delete List
          </div>
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
            <ul className='list-group list-group-flush'>
              {data.list
                .filter(({ sunday }) => sunday === sundaySelected)
                .map(({ title ,id}) => {
                  return (
                    <li key={id} className='list-group-item d-flex justify-content-between'>
                      {title}
                      <button
                        className='btn btn-outline-secondary'
                        type='button'
                        id='button-addon1'
                        onClick={() => deleteTitle({id})}
                      >
                        <TrashIcon />
                      </button>
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
export default DeleteList;
