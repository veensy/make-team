import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, GET_TEAMS_MONTH } from './graphql/queries';
import { ADD_TEAM, UPDATE_TEAM } from './graphql/mutations';
import { getSundaysInMonth, changeDate, getStatus, getSelected } from './utils';
import { MONTH, NEXT, PREV } from './constants';
import { ArrowLeft, ArrowRight, LockIcon, UserIcon } from './icons';

const date = new Date();

function App() {
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [md, setMd] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminValue, setAdminValue] = useState('');
  const [isValidUserValue, setIsValidUserValue] = useState(true);
  const [isValidPassValue, setIsValidPassValue] = useState(true);
  const [passValue, setPassValue] = useState('');
  const [bass, setBass] = useState([]);
  const [guitar, setGuitar] = useState([]);
  const [keyboard, setKeyboard] = useState([]);
  const [drum, setDrum] = useState([]);
  const [teamsMonth, setTeamsMonth] = useState([]);
  const [sundaysInMonth, setSundaysInMonth] = useState([]);
  const [valuesToSubmit, setValuesToSubmit] = useState([]);

  const [addTeam] = useMutation(ADD_TEAM);
  const [updateTeam] = useMutation(UPDATE_TEAM);

  const { loading: loadingUsers, data: dataUsers } = useQuery(GET_USERS);
  const { data: dataTeams } = useQuery(GET_TEAMS_MONTH, {
    variables: {
      year: String(year),
      month: String(month),
    },
  });
  if (sundaysInMonth.length) {
  }

  const handleClick = (step) => {
    const { newMonth, newYear } = changeDate({ step, month, year });
    setMonth(newMonth);
    setYear(newYear);
  };
  useEffect(() => {
    if (dataUsers && dataTeams) {
      const { md, bass, guitar, keyboard, drum } = getStatus(dataUsers.users);
      setMd(md);
      setBass(bass);
      setGuitar(guitar);
      setKeyboard(keyboard);
      setDrum(drum);
      setTeamsMonth(dataTeams);
      let newValues = [];
      if (sundaysInMonth.length && dataTeams) {
        sundaysInMonth.forEach((sunday, idx) => {
          if (dataTeams.team[idx]?.id) {
            newValues.push({ id: dataTeams.team[idx]?.id });
            setValuesToSubmit(newValues);
          } else {
            addTeam({
              variables: {
                year: String(year),
                month: String(month),
                sunday: String(sunday),
              },
            });
          }
        });
      }
    }
    setSundaysInMonth(getSundaysInMonth(month, year));
  }, [dataUsers, month, year, dataTeams, addTeam]);

  const handleChange = (e, field, id) => {
    if (!valuesToSubmit.length) {
      return;
    }
    const name = e.target.value;
    valuesToSubmit.forEach((value, idx) => {
      if (value.id === id) {
        valuesToSubmit[idx] = { ...valuesToSubmit[idx], [field]: name };
      }
    });
  };

  const saveTeam = (id) => {
    valuesToSubmit.forEach((value, idx) => {
      if (value.id === id) {
        const { md, keyboard, bass, drum, guitar } = valuesToSubmit[idx];
        updateTeam({
          variables: {
            id,
            md,
            keyboard,
            bass,
            drum,
            guitar,
          },
          refetchQueries: [
            {
              query: GET_TEAMS_MONTH,
              variables: {
                year: String(year),
                month: String(month),
              },
            },
          ],
        });
      }
    });
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
  };

  const handleAdmin = (e) => {
    setAdminValue(e.target.value);
  };

  const handlePassword = (e) => {
    setPassValue(e.target.value);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setAdminValue('');
    setPassValue('');
    setIsValidUserValue(true);
    setIsValidPassValue(true);
    setIsAdmin(false);
  };

  if (
    loadingUsers ||
    !sundaysInMonth.length ||
    !teamsMonth.team ||
    teamsMonth.team.length <= 0
  ) {
    return (
      <div className='d-flex justify-content-center align-items-center m-5'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  const inputUserClass = `form-control ${isValidUserValue ? '' : 'is-invalid'}`;
  const inputPassClass = `form-control ${isValidPassValue ? '' : 'is-invalid'}`;
  
  return (
    <div className='px-2'>
      <nav className='navbar navbar-light bg-light'>
        <div className='container-fluid'>
          <span className='navbar-brand mb-0 h1'>Sunday team</span>
          <form className='row g-3 float-end'>
            {!isAdmin ? (
              <div className='d-flex justify-content-end'>
                <div className='col-md-4 '>
                  <div className='input-group'>
                    <span
                      className='input-group-text'
                      id='inputGroup-sizing-sm'
                    >
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
            ) : (
              <button
                className='btn btn-outline-secondary'
                type='submit'
                id='button-addon2'
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
          </form>
        </div>
      </nav>
      <main>
        <div className='d-flex flex-row justify-content-between py-4'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => handleClick(PREV)}
          >
            <ArrowLeft />
          </button>
          <h2 className='text-center'>
            {MONTH[month]} {year}
          </h2>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => handleClick(NEXT)}
          >
            <ArrowRight />
          </button>
        </div>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th style={{ width: '6%' }}>Sunday</th>
              <th style={{ width: '10%' }}>Md</th>
              <th style={{ width: '10%' }}>Keyboard</th>
              <th style={{ width: '10%' }}>Bass</th>
              <th style={{ width: '10%' }}>Drum</th>
              <th style={{ width: '10%' }}>Guitar</th>
              {isAdmin && <th style={{ width: '10%' }}>Save</th>}
            </tr>
          </thead>
          <tbody>
            {sundaysInMonth.map((sunday, idx) => {
              const selectedMd = getSelected(
                teamsMonth.team,
                String(sunday),
                'md'
              );
              const selectedKey = getSelected(
                teamsMonth.team,
                String(sunday),
                'keyboard'
              );
              const selectedBass = getSelected(
                teamsMonth.team,
                String(sunday),
                'bass'
              );
              const selectedDrum = getSelected(
                teamsMonth.team,
                String(sunday),
                'drum'
              );
              const selectedGuitar = getSelected(
                teamsMonth.team,
                String(sunday),
                'guitar'
              );

              return (
                <tr key={sunday} className=''>
                  <th scope='row align-middle'>{`${sunday} ${MONTH[month]}`}</th>
                  <td>
                    {isAdmin ? (
                      <select
                        className='form-select'
                        aria-label='Default select example'
                        onChange={(e) => handleChange(e, 'md', id)}
                      >
                        <option />
                        {md.map((name) => {
                          return (
                            <option
                              selected={name === selectedMd}
                              key={name}
                              value={name}
                            >
                              {name}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <p className='m-0'>
                        {md.filter((name) => {
                          return name === selectedMd;
                        })}
                      </p>
                    )}
                  </td>
                  <td>
                    {isAdmin ? (
                      <select
                        className='form-select'
                        aria-label='Default select example'
                        onChange={(e) => handleChange(e, 'keyboard', id)}
                      >
                        <option />
                        {keyboard.map((name) => {
                          return (
                            <option
                              selected={name === selectedKey}
                              key={name}
                              value={name}
                            >
                              {name}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <p className='m-0'>
                        {keyboard.filter((name) => {
                          return name === selectedKey;
                        })}
                      </p>
                    )}
                  </td>
                  <td>
                    {isAdmin ? (
                      <select
                        className='form-select'
                        aria-label='Default select example'
                        onChange={(e) => handleChange(e, 'bass', id)}
                      >
                        <option />
                        {bass.map((name) => {
                          return (
                            <option
                              selected={name === selectedBass}
                              key={name}
                              value={name}
                            >
                              {name}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <p className='m-0'>
                        {bass.filter((name) => {
                          return name === selectedBass;
                        })}
                      </p>
                    )}
                  </td>
                  <td>
                    {isAdmin ? (
                      <select
                        className='form-select'
                        aria-label='Default select example'
                        onChange={(e) => handleChange(e, 'drum', id)}
                      >
                        <option />
                        {drum.map((name) => {
                          return (
                            <option
                              selected={name === selectedDrum}
                              key={name}
                              value={name}
                            >
                              {name}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <p className='m-0'>
                        {drum.filter((name) => {
                          return name === selectedDrum;
                        })}
                      </p>
                    )}
                  </td>
                  <td>
                    {isAdmin ? (
                      <select
                        className='form-select'
                        aria-label='Default select example'
                        onChange={(e) => handleChange(e, 'guitar', id)}
                      >
                        <option />
                        {guitar.map((name) => {
                          return (
                            <option
                              selected={name === selectedGuitar}
                              key={name}
                              value={name}
                            >
                              {name}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <p className='m-0'>
                        {guitar.filter((name) => {
                          return name === selectedGuitar;
                        })}
                      </p>
                    )}
                  </td>
                  {isAdmin && (
                    <td>
                      <button
                        onClick={() => saveTeam(id, teamsMonth.team[idx])}
                        type='button'
                        className='btn btn-outline-primary'
                      >
                        save
                      </button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
