import { AddList } from './AddList';
import { UpdateList } from './UpdateList';
import { DeleteList } from './DeleteList'

export const EditList = ({
  teamsMonth,
  callToast,
  year,
  month,
  city,
  event,
  sundaysInMonth,
  eventName
}) => {
  return (
    <div className='d-flex my-5  justify-content-center mx-auto '>
      <div className='d-inline-flex flex-column gap-3'>
      <AddList
        teamsMonth={teamsMonth}
        callToast={callToast}
        year={year}
        month={month}
        city={city}
        event={event}
        sundaysInMonth={sundaysInMonth}
        eventName={eventName}
      />
      <UpdateList
        teamsMonth={teamsMonth}
        callToast={callToast}
        year={year}
        month={month}
        city={city}
        event={event}
        sundaysInMonth={sundaysInMonth}
        eventName={eventName}
      />
      <DeleteList
        teamsMonth={teamsMonth}
        callToast={callToast}
        year={year}
        month={month}
        city={city}
        event={event}
        sundaysInMonth={sundaysInMonth}
        eventName={eventName}
      />
      </div>
    </div>
  );
};
export default EditList;
