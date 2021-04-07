import { useState } from 'react';
import { AddUserIcon } from '../icons';
import {

    isMdID,
    isNotMdID,
    isAdminID,
    isNotAdminID,
    bassID,
    guitarID,
    drumID,
    keyID,
  } from '../constants';

export const AddUser = ({handleNewUser}) => {
  const [newUser, setNewUser] = useState({
    name: '',
    roleId: '',
    isDmId: isNotMdID,
    isAdminId: isNotAdminID,
  });

  return (
    <div className='card' style={{ width: '18rem' }}>
      <div className='card-header bg-secondary text-white'>Add a member</div>
      <div className='card-body'>
        <div className='input-group'>
          <span className='input-group-text' id='basic-addon1'>
            <AddUserIcon />
          </span>
          <input
            type='text'
            className='form-control'
            id='floatingInput'
            placeholder='Name'
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
        </div>
        <select
          className='form-select py-0 my-2'
          aria-label='Default select example'
          onChange={(e) => setNewUser({ ...newUser, roleId: e.target.value })}
        >
          <option value=''>Role</option>
          <option value={keyID}>keyboard</option>
          <option value={bassID}>bass</option>
          <option value={drumID}>drum</option>
          <option value={guitarID}>guitar</option>
        </select>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value=''
            id='flexCheckDefault'
            onChange={(e) =>
              setNewUser({
                ...newUser,
                isDmId: e.target.checked ? isMdID : isNotMdID,
              })
            }
          />
          <label
            className='form-check-label text-nowrap'
            htmlFor='flexCheckDefault'
          >
            Is Md
          </label>
        </div>
        <div className='form-check my-2'>
          <input
            className='form-check-input '
            type='checkbox'
            value=''
            id='flexCheckDefault'
            onChange={(e) =>
              setNewUser({
                ...newUser,
                isAdminId: e.target.checked ? isAdminID : isNotAdminID,
              })
            }
          />
          <label
            className='form-check-label text-nowrap'
            htmlFor='flexCheckDefault'
          >
            Is Admin
          </label>
        </div>
        </div>
        <div class="card-footer">
        <button
          onClick={() => handleNewUser(newUser)}
          type='button'
          className='btn btn-outline-secondary mx-auto d-flex  justify-content-center'
        >
          save
        </button>
      </div>
    </div>
  );
};

export default AddUser;
