import { useState} from 'react'
import { LockIcon, UserIcon } from '../icons';


export const Login = ({handleIsAdmin,isLogged}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isValidUserValue, setIsValidUserValue] = useState(true);
    const [isValidPassValue, setIsValidPassValue] = useState(true);
    const [adminValue, setAdminValue] = useState('');
    const [passValue, setPassValue] = useState('');

    const inputUserClass = `form-control ${isValidUserValue ? '' : 'is-invalid'}`;
    const inputPassClass = `form-control ${isValidPassValue ? '' : 'is-invalid'}`;

    const handleAdmin = (e) => {
        setAdminValue(e.target.value);
      };
    
      const handlePassword = (e) => {
        setPassValue(e.target.value);
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const ADMIN = 'admin';
        const isAdmin = adminValue === ADMIN && passValue === ADMIN;
        setIsAdmin(isAdmin);
        if (!adminValue !== ADMIN) {
          setIsValidUserValue(false);
        }
        if (!adminValue !== ADMIN) {
          setIsValidPassValue(false);
        }
        handleIsAdmin(isAdmin)
      };

    const handleLogout = (e) => {
        e.preventDefault();
        setAdminValue('');
        setPassValue('');
        setIsValidUserValue(true);
        setIsValidPassValue(true);
        setIsAdmin(false);
        handleIsAdmin(false)
      };
  if (isAdmin || isLogged) {
    return (
      <button
        className='btn btn-outline-secondary'
        type='button'
        id='button-addon2'
        onClick={handleLogout}
      >
        Logout
      </button>
    );
  }
  return (
    <div className='d-flex justify-content-end'>
      <div className='col-md-4 '>
        <div className='input-group'>
          <span className='input-group-text' id='inputGroup-sizing-sm'>
            <UserIcon />
          </span>
          <input
            type='text'
            id='user'
            className={inputUserClass}
            aria-label='Sizing example input'
            aria-describedby='inputGroup-sizing-sm'
            onChange={handleAdmin}
          />
          <div id='user' className='invalid-feedback'>
            you suck !!!
          </div>
        </div>
      </div>
      <div className='col-md-5'>
        <div className='input-group'>
          <span className='input-group-text'>
            <LockIcon />
          </span>
          <input
            type='password'
            className={inputPassClass}
            aria-label='Sizing example input'
            aria-describedby='inputGroup-sizing-sm'
            onChange={handlePassword}
          />

          <button
            className='btn btn-outline-secondary'
            type='submit'
            id='button-addon2'
            onClick={handleSubmit}
          >
            Login
          </button>
          <div id='user' className='invalid-feedback'>
            you really suck !!!
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
