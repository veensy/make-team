import { useState, useEffect } from 'react';
import { ModifyUserIcon } from '../icons';
import {
  isMdID,
  isNotMdID,
  isAdminID,
  isNotAdminID,
  bassID,
  guitarID,
  drumID,
  keyID,
  YES,
  NO,
} from '../constants';

export const UpdateUser = ({ users, handleUpdateUser }) => {
  const [show, setShowInput] = useState(false);
  const [selected, setSelected] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMd, setIsMd] = useState(false);
  const [newName, setNewName] = useState('');
  const [currentRole, setCurrenRole] = useState('');
  const [newRole, setNewRole] = useState('');
  const [updateUser, setUpdateUser] = useState({
    id: '',
    name: '',
    roleId: '',
    isDmId: '',
    isAdminId: '',
  });

  useEffect(() => {
    users.forEach(({ name, isAdmin, isDm }) => {
      if (name === selected) {
        setIsAdmin(isAdmin.status === YES ? true : false);
        setIsMd(isDm.status === YES ? true : false);
        setUpdateUser({
          ...updateUser,
          name: newName ? newName : selected,
          isDmId: isDm.status === YES ? isMdID : isNotMdID,
          isAdminId: isAdmin.status === YES ? isAdminID : isNotAdminID,
          roleId: newRole ? newRole : currentRole,
        });
      }
    });
  }, [selected, newRole, newName]);
  const preSelectRole = () => {
    switch (currentRole) {
      case bassID:
        return bassID;
      case keyID:
        return keyID;
      case drumID:
        return drumID;
      case guitarID:
        return guitarID;
      default:
        break;
    }
  };
  return (
    <div className='card' style={{ width: '18rem' }}>
      <div className='card-header bg-secondary text-white'>Modify a member</div>
      <div className='card-body'>
        <select
          className='form-select py-0 my-2'
          aria-label='Default select example'
          onChange={(e) => {
            setUpdateUser({ ...updateUser, id: e.target.value });
            setSelected(e.target[e.target.selectedIndex].innerHTML);
            setCurrenRole(e.target[e.target.selectedIndex].dataset.roleId);
          }}
        >
          <option value=''>Choose a name</option>
          {users.map(({ name, id, role }) => (
            <option key={id} value={id} data-role-id={role.id}>
              {name}
            </option>
          ))}
        </select>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value=''
            id='showInput'
            onChange={() => setShowInput(!show)}
          />
          <label className='form-check-label text-nowrap' htmlFor='showInput'>
            Modify name
          </label>
        </div>
        {show && (
          <div className='input-group'>
            <span className='input-group-text' id='basic-addon1'>
              <ModifyUserIcon />
            </span>

            <input
              type='text'
              className='form-control'
              id='floatingInput'
              placeholder='name'
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
        )}
        <select
          className='form-select py-0 my-2'
          aria-label='Default select example'
          onChange={(e) => {
            setNewRole(e.target.value);
            setCurrenRole('');
          }}
          value={preSelectRole()}
        >
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
            id='isDm'
            checked={isMd}
            onChange={(e) => {
              setUpdateUser({
                ...updateUser,
                isDmId: e.target.checked ? isMdID : isNotMdID,
              });
              setIsMd(!isMd);
            }}
          />
          <label className='form-check-label text-nowrap' htmlFor='isDm'>
            Is Md
          </label>
        </div>
        <div className='form-check my-2'>
          <input
            className='form-check-input '
            type='checkbox'
            checked={isAdmin}
            id='isAdmin'
            onChange={(e) => {
              setUpdateUser({
                ...updateUser,
                isAdminId: e.target.checked ? isAdminID : isNotAdminID,
              });
              setIsAdmin(!isAdmin);
            }}
          />
          <label className='form-check-label text-nowrap' htmlFor='isAdmin'>
            Is Admin
          </label>
        </div>
      </div>
      <div className='card-footer'>
        <button
          onClick={() => handleUpdateUser(updateUser)}
          type='button'
          className='btn btn-outline-secondary mx-auto d-flex justify-content-center'
        >
          update
        </button>
      </div>
    </div>
  );
};
export default UpdateUser;
