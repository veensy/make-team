import { useState, useEffect } from 'react';

export const DeleteUser = ({ users, handleDeleteUser }) => {
  const [deleteUser, setDeleteUser] = useState("");

  return (
    <div className='card' style={{ width: '18rem' }}>
      <div className='card-header bg-secondary text-white'>Delete a member</div>
      <div className='card-body'>
        <select
          className='form-select py-0 my-2'
          aria-label='Default select example'
          onChange={(e) => {
            setDeleteUser(  e.target.value );
          }}
        >
          <option value=''>Choose a name</option>
          {users.map(({ name, id }) => (
            <option key={id} value={id} >
              {name}
            </option>
          ))}
        </select>
      </div>
      <div class='card-footer'>
        <button
          onClick={() => handleDeleteUser(deleteUser)}
          type='button'
          className='btn btn-outline-secondary mx-auto d-flex justify-content-center'
        >
          delete
        </button>
      </div>
    </div>
  );
};
export default DeleteUser;
