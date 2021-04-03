import { NEXT, PREV } from '../constants';

export const changeDate = ({ step, month, year ,date}) => {
  let newYear;
  let newMonth;
  let newDate;
  if (step === NEXT) {
    if (month === 11) {
      newYear = year + 1;
      newMonth = 0;
    } else {
      newMonth= month + 1;
      newYear= year
    }
  }
  if (step === PREV) {
    if (month === 0) {
      newYear = year - 1;
      newMonth = 11;
    } else {
      newMonth = month - 1;
      newYear= year
    }
  }

  return { newMonth, newYear,newDate };
};
export default changeDate;
