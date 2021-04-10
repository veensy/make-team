import { AddList } from './AddList';
import { UpdateList } from './UpdateList';
import { DeleteList } from './DeleteList'

export const EditList = ({
  teamsMonth,
  callToast,
  year,
  month,
}) => {
  return (
    <div className='d-flex overflow-auto  flex-row my-5'>
      <AddList
        teamsMonth={teamsMonth}
        callToast={callToast}
        year={year}
        month={month}
      />
      <UpdateList
        teamsMonth={teamsMonth}
        callToast={callToast}
        year={year}
        month={month}
      />
      <DeleteList
        teamsMonth={teamsMonth}
        callToast={callToast}
        year={year}
        month={month}
      />
    </div>
  );
};
export default EditList;
