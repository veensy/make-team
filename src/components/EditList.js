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
    <div className='d-flex overflow-auto  flex-row my-5'>
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
  );
};
export default EditList;
