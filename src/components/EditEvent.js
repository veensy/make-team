import { useState, useEffect } from 'react';
import { DatePicker } from './DatePicker';
import { EditTeams } from './EditTeams';
import { getSelected } from '../utils';

export const EditEvent = ({
  teamsMonth,
  md,
  keyboard,
  bass,
  guitar,
  drum,
  city,
  event,
  callToast,
}) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const [dateSelected, setDateSelected] = useState('');
  const [eventName, setEventName] = useState('');

  useEffect(() => {
    setDateSelected({
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    });
  }, []);

  const selectedDate = (date) => {
    setDateSelected(date);
  };

  const preSelected = getSelected(teamsMonth, String(dateSelected.day));
  return (
    <div  className='card my-5' >
      <div className='card-header bg-secondary text-white'>Add an event</div>
      <div className='card-body'>
      <DatePicker
        selectedDate={selectedDate}
        currentDay={currentDay}
        currentMonth={currentMonth}
        currentYear={currentYear}
      />
      <div className='form-floating my-2 col-4 mx-auto'>
        <input
          type='text'
          className='form-control'
          id='eventName'
          placeholder='concert'
          onChange={(e) => setEventName(e.target.value)}
        />
        <label htmlFor='eventName'>Event Name</label>
      </div>
      <div className=' mx-auto d-flex justify-content-center my-3'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Md</th>
              <th style={{ width: '10%' }}>Keyboard</th>
              <th style={{ width: '10%' }}>Bass</th>
              <th style={{ width: '10%' }}>Drum</th>
              <th style={{ width: '10%' }}>Guitar</th>
              <th style={{ width: '5%' }}>Save</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <EditTeams
                teamsMonth={teamsMonth}
                md={md}
                keyboard={keyboard}
                bass={bass}
                guitar={guitar}
                drum={drum}
                preSelected={preSelected}
                year={String(dateSelected.year)}
                month={String(dateSelected.month)}
                day={String(dateSelected.day)}
                city={city}
                event={event}
                eventName={eventName}
                callToast={callToast}
              />
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};
export default EditEvent;
