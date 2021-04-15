import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS, GET_TEAMS_MONTH } from './graphql/queries';
import { getSundaysInMonth, changeDate, getStatus, getSelected } from './utils';
import {
  MONTH,
  NEXT,
  PREV,
  PARIS,
  REIMS,
  MARTINIQUE,
  SERVICE,
  CITIES,
  EVENTS,
  WEDDING,
  CONCERT,
} from './constants';
import { ArrowLeft, ArrowRight, InfoIcon, WarningIcon } from './icons';
import {
  Login,
  EditUser,
  Lists,
  EditList,
  EditTeams,
  Teams,
  EditEvent,
} from './components';

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
  const [displayToast, setDisplayToast] = useState('hide');
  const [message, setMessage] = useState('');
  const [messageTitle, setMessageTitle] = useState('');
  const [toastIcon, setToastIcon] = useState(<></>);
  const [toastColor, setToastColor] = useState('');
  const [citySelected, setCity] = useState(PARIS);
  const [eventSelected, setEvent] = useState(SERVICE);
  const [eventNameSelected, setEventName] = useState('...');
  const [showNewEvent, setShowNewEvent] = useState(false);

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
      city: citySelected,
      event: eventSelected,
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
    if (eventSelected !== SERVICE && dataTeams?.team) {
      const sortTeams = dataTeams.team
        .map((x, y) => x)
        .sort((x, y) => x.sunday - y.sunday);
      setEventName(sortTeams[0]?.eventName);
      setSundaysInMonth([sortTeams[0]?.day]);
    } else {
      setSundaysInMonth(getSundaysInMonth(month, year));
    }

    if (dataUsers && dataTeams) {
      const { md, bass, guitar, keyboard, drum } = getStatus(dataUsers.users);
      setMd(md);
      setBass(bass);
      setGuitar(guitar);
      setKeyboard(keyboard);
      setDrum(drum);
      const sortTeams = dataTeams.team
        .map((x, y) => x)
        .sort((x, y) => x.sunday - y.sunday);
      setTeamsMonth(sortTeams);
    }
  }, [dataUsers, month, year, dataTeams]);

  useEffect(() => {
    if (dataTeams?.team) {
      const sortTeams = dataTeams.team
        .map((x, y) => x)
        .sort((x, y) => x.sunday - y.sunday);

      const selectedEvent = sortTeams.filter(
        ({ eventName }) => eventName === eventNameSelected
      );
      setSundaysInMonth([selectedEvent[0]?.day]);
    }
  }, [eventNameSelected]);

  const handleAdmin = (status) => {
    setIsAdmin(status);
  };

  const handleCities = (e) => {
    e.preventDefault();
    setCity(e.target.value);
  };

  const handleEvents = (e) => {
    e.preventDefault();
    setEvent(e.target.value);
  };
  const handleEventsName = (e) => {
    setEventName(e.target.value);
  };

  if (loadingUsers || loadingTeams || !sundaysInMonth.length || !teamsMonth) {
    return (
      <div className='d-flex justify-content-center align-items-center m-5'>
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className='p-3 bg-light'>
      <nav className='navbar navbar-light'>
        <div className='container-fluid'>
          <span className='navbar-brand mb-0 h1'>Sunday team</span>
          <form className='row g-3 float-end'>
            <Login handleIsAdmin={handleAdmin} isLogged={isAdmin} />
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
        <div className='d-flex w-50 justify-center mx-auto'>
          <select
            onChange={(e) => handleCities(e)}
            className='form-select my-3'
            defaultValue={citySelected}
          >
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => handleEvents(e)}
            className='form-select my-3'
            defaultValue={eventSelected}
          >
            {EVENTS.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {(eventSelected === WEDDING || eventSelected === CONCERT) && (
            <select
              onChange={(e) => handleEventsName(e)}
              className='form-select my-3'
              defaultValue={eventNameSelected}
            >
              {teamsMonth.map(({ eventName, id }) => (
                <option key={id} value={eventName}>
                  {eventName}
                </option>
              ))}
            </select>
          )}
        </div>
        {eventSelected !== SERVICE && isAdmin && (
          <button
            className='btn btn-outline-secondary'
            type='button'
            id='button-addon1'
            onClick={() => setShowNewEvent(!showNewEvent)}
          >
            Add a new event
          </button>
        )}
        {eventSelected !== SERVICE && isAdmin && showNewEvent && (
          <EditEvent
            teamsMonth={teamsMonth}
            md={md}
            keyboard={keyboard}
            bass={bass}
            guitar={guitar}
            drum={drum}
            city={citySelected}
            event={eventSelected}
            callToast={callToast}
          />
        )}
        <div className='card my-5'>
          <div className='card-header bg-secondary text-white'>
            {isAdmin ? ' Modify team' : 'Team'}
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
                {isAdmin && (
                  <>
                    <th style={{ width: '5%' }}>Save</th>
                    <th style={{ width: '5%' }}>Delete</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {sundaysInMonth.map((sunday, idx) => {
                const preSelected = getSelected(teamsMonth, String(sunday));
                return (
                  <tr key={`${sunday}-${idx}`} className=''>
                    {sunday && (
                      <th scope='row align-middle'>{`${sunday} ${MONTH[month]}`}</th>
                    )}
                    {isAdmin ? (
                      <EditTeams
                        md={md}
                        keyboard={keyboard}
                        bass={bass}
                        guitar={guitar}
                        drum={drum}
                        teamsMonth={teamsMonth}
                        callToast={callToast}
                        year={year}
                        month={month}
                        city={citySelected}
                        event={eventSelected}
                        day={String(sunday)}
                        preSelected={preSelected}
                        sundaysInMonth={sundaysInMonth}
                        idx={idx}
                        modify
                      />
                    ) : (
                      <Teams
                        md={md}
                        keyboard={keyboard}
                        bass={bass}
                        guitar={guitar}
                        drum={drum}
                        preSelected={preSelected}
                      />
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {teamsMonth && !isAdmin && (
          <>
            <p className='fs-1 text-center'>SetLists</p>
            <Lists
              teamsMonth={teamsMonth}
              year={year}
              month={month}
              city={citySelected}
              event={eventSelected}
              sundaysInMonth={sundaysInMonth}
              eventName={eventNameSelected}
            />
          </>
        )}
        {teamsMonth && isAdmin && (
          <EditList
            teamsMonth={teamsMonth}
            callToast={callToast}
            year={year}
            month={month}
            city={citySelected}
            event={eventSelected}
            sundaysInMonth={sundaysInMonth}
            eventName={eventNameSelected}
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
