import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, GET_TEAMS_MONTH } from './graphql/queries';
import { ADD_TEAM, UPDATE_TEAM, DELETE_TEAM } from './graphql/mutations';
import { getSundaysInMonth, changeDate, getStatus, getSelected } from './utils';
import { MONTH, NEXT, PREV } from './constants';
import { ArrowLeft, ArrowRight, InfoIcon, WarningIcon } from './icons';
import { SetList, Login, EditUser, Lists, EditList } from './components';

const date = new Date();

function App() {
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [md, setMd] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [bass, setBass] = useState([]);
  const [guitar, setGuitar] = useState([]);
  const [keyboard, setKeyboard] = useState([]);
  const [drum, setDrum] = useState([]);
  const [teamsMonth, setTeamsMonth] = useState([]);
  const [sundaysInMonth, setSundaysInMonth] = useState([]);
  const [valuesToSubmit, setValuesToSubmit] = useState([]);
  const [displayToast, setDisplayToast] = useState('hide');
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [toastIcon, setToastIcon] = useState(<></>);
  const [toastColor, setToastColor] = useState('');

  const [addTeam] = useMutation(ADD_TEAM, {
    refetchQueries: [
      {
        query: GET_USERS,
      },
      {
        query: GET_TEAMS_MONTH,
        variables: {
          year: String(year),
          month: String(month),
        },
      },
    ],
    awaitRefetchQueries: true,
  });
  const [updateTeam, { error: errorUpdateTeam }] = useMutation(UPDATE_TEAM, {
    refetchQueries: [
      {
        query: GET_USERS,
      },
      {
        query: GET_TEAMS_MONTH,
        variables: {
          year: String(year),
          month: String(month),
        },
      },
    ],
    awaitRefetchQueries: true,
  });
  const [deleteTeamm] = useMutation(DELETE_TEAM, {
    refetchQueries: [
      {
        query: GET_USERS,
      },
      {
        query: GET_TEAMS_MONTH,
        variables: {
          year: String(year),
          month: String(month),
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const {
    loading: loadingUsers,
    data: dataUsers,
    error: errorUser,
    refetch: refetchUsers,
  } = useQuery(GET_USERS);
  const {
    data: dataTeams,
    loading: loadingTeams,
    error: errorTeam,
    refetch: refetchTeams,
  } = useQuery(GET_TEAMS_MONTH, {
    variables: {
      year: String(year),
      month: String(month),
    },
  });
  const handleClick = (step) => {
    const { newMonth, newYear } = changeDate({ step, month, year });
    setMonth(newMonth);
    setYear(newYear);
  };

  const callToast = ({ title, icon, color, text }) => {
    setDisplayToast('show');
    setMessage(text);
    setMessageTitle(title);
    setToastIcon(icon);
    setToastColor(color);
  };

  useEffect(() => {
    setSundaysInMonth(getSundaysInMonth(month, year));
    if (dataUsers && dataTeams) {
      const { md, bass, guitar, keyboard, drum } = getStatus(dataUsers.users);
      setMd(md);
      setBass(bass);
      setGuitar(guitar);
      setKeyboard(keyboard);
      setDrum(drum);
      setTeamsMonth(dataTeams);
    }
    let newValues = [];
    if (sundaysInMonth.length && dataTeams && !valuesToSubmit.length) {
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
  }, [dataUsers, month, year, dataTeams, addTeam]);

  const handleChange = (e, field, id) => {
    const name = e.target.value;

    valuesToSubmit.forEach((value, idx) => {
      if (value.id === id) {
        valuesToSubmit[idx] = { ...valuesToSubmit[idx], [field]: name };
      }
    });
  };

  const saveTeam = (team) => {
    valuesToSubmit.forEach((value, idx) => {
      if (value.id === team.id) {
        const { md, keyboard, bass, drum, guitar } = valuesToSubmit[idx];
        updateTeam({
          variables: {
            id: team.id,
            md,
            keyboard,
            bass,
            drum,
            guitar,
          },
        });

        if (errorUpdateTeam) {
          setDisplayToast('show');
          setMessage(`adding user failed`);
          setMessageTitle('Error');
          setToastIcon(<InfoIcon />);
          setToastColor('bg-danger');
        } else {
          setDisplayToast('show');
          setMessage(`a new player has been added to the team`);
          setMessageTitle('New User');
          setToastIcon(<InfoIcon />);
          setToastColor('bg-success');
        }
      }
    });
  };
  const refetchLists = () => {
    setRefetchList(true);
  };

  const handleAdmin = (status) => {
    setIsAdmin(status);
  };

  if (
    loadingUsers ||
    loadingTeams ||
    !sundaysInMonth.length ||
    !teamsMonth.team
  ) {
    return (
      <div className='d-flex justify-content-center align-items-center m-5'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className='p-3'>
      <nav className='navbar navbar-light bg-light'>
        <div className='container-fluid'>
          <span className='navbar-brand mb-0 h1'>Sunday team</span>
          <form className='row g-3 float-end'>
            <Login handleIsAdmin={handleAdmin} />
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
                        onChange={(e) =>
                          handleChange(e, 'md', teamsMonth.team[idx].id)
                        }
                      >
                        <option />
                        {md.map((name) => {
                          return (
                            <option
                              selected={name === selectedMd?.name}
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
                          return name === selectedMd?.name;
                        })}
                      </p>
                    )}
                  </td>
                  <td>
                    {isAdmin ? (
                      <select
                        className='form-select'
                        aria-label='Default select example'
                        onChange={(e) =>
                          handleChange(e, 'keyboard', teamsMonth.team[idx].id)
                        }
                      >
                        <option />
                        {keyboard.map((name) => {
                          return (
                            <option
                              selected={name === selectedKey?.name}
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
                          return name === selectedKey?.name;
                        })}
                      </p>
                    )}
                  </td>
                  <td>
                    {isAdmin ? (
                      <select
                        className='form-select'
                        aria-label='Default select example'
                        onChange={(e) =>
                          handleChange(e, 'bass', teamsMonth.team[idx].id)
                        }
                      >
                        <option />
                        {bass.map((name) => {
                          return (
                            <option
                              selected={name === selectedBass?.name}
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
                          return name === selectedBass?.name;
                        })}
                      </p>
                    )}
                  </td>
                  <td>
                    {isAdmin ? (
                      <select
                        className='form-select'
                        aria-label='Default select example'
                        onChange={(e) =>
                          handleChange(e, 'drum', teamsMonth.team[idx].id)
                        }
                      >
                        <option />
                        {drum.map((name) => {
                          return (
                            <option
                              selected={name === selectedDrum?.name}
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
                          return name === selectedDrum?.name;
                        })}
                      </p>
                    )}
                  </td>
                  <td>
                    {isAdmin ? (
                      <select
                        className='form-select'
                        aria-label='Default select example'
                        onChange={(e) =>
                          handleChange(e, 'guitar', teamsMonth.team[idx].id)
                        }
                      >
                        <option />
                        {guitar.map((name) => {
                          return (
                            <option
                              selected={name === selectedGuitar?.name}
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
                          return name === selectedGuitar?.name;
                        })}
                      </p>
                    )}
                  </td>
                  {isAdmin && (
                    <td>
                      <button
                        onClick={() => saveTeam(teamsMonth.team[idx])}
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
        {teamsMonth.team && (
          <>
            <p className='fs-1 text-center'>SetLists</p>

            <Lists teamsMonth={teamsMonth.team} year={year} month={month} />
          </>
        )}
        {teamsMonth.team && !isAdmin && (
          <EditList
            teamsMonth={teamsMonth.team}
            callToast={callToast}
            year={year}
            month={month}
          />
        )}
        {isAdmin && (
          <EditUser
            callToast={callToast}
            users={dataUsers.users}
            refetchUsers={refetchUsers}
            refetchTeams={refetchTeams}
          />
        )}
      </main>
      <>
        <div
          className='position-fixed bottom-0 end-0 p-3'
          style={{ zIndex: 5 }}
        >
          <div
            id='liveToast'
            className={`toast ${displayToast} `}
            role='alert'
            aria-live='assertive'
            aria-atomic='true'
          >
            <div className={`toast-header ${toastColor} text-white`}>
              <div className='me-2'>{toastIcon}</div>
              <strong className='me-auto'>{messageTitle}</strong>
              <button
                type='button'
                className='btn-close btn-close-white'
                data-bs-dismiss='toast'
                aria-label='Close'
                onClick={() => setDisplayToast('hide')}
              ></button>
            </div>
            <div className='toast-body'>{message}</div>
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
