import { useState, useEffect } from 'react';
import { MONTH } from '../constants';
import { isValidDate, getDaysInMonth } from '../utils';

export const DatePicker = ({
  selectedDate,
  currentDay,
  currentMonth,
  currentYear,
}) => {
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [daysNumber, setDaysNumber] = useState(31);
  const [error, setError] = useState(false);

  const DAYS = Array.from('d'.repeat(daysNumber));
  const MONTHS = Array.from('m'.repeat(12));
  const YEARS = Array.from('y'.repeat(5));

  useEffect(() => {
    const newDays = getDaysInMonth(selectedMonth, selectedYear);

    setDaysNumber(newDays);

    const isValid = isValidDate(selectedDay, selectedMonth, selectedYear);

    if (isValid) {
      selectedDate({
        day: selectedDay,
        month: selectedMonth,
        year: selectedYear,
      });
      setError(false);
    } else {
      setError(true);
    }
  }, [selectedMonth, selectedYear, selectedDay]);

  const handleDay = (day) => {
    setSelectedDay(Number(day));
  };

  const handleMonth = (month) => {
    setSelectedMonth(Number(month));
  };

  const handleYear = (year) => {
    setSelectedYear(Number(year));
  };

  const daySelectClass = `form-select my-3  ${error ? 'is-invalid' : ''}`;
  return (
    <>
      <div className='d-flex w-25 justify-content-center mx-auto'>
        <select
          onChange={(e) => handleDay(e.target.value)}
          className={daySelectClass}
          defaultValue={String(selectedDay)}
          id='day'
        >
          {DAYS.map((day, idx) => (
            <option key={`${day}-${idx}`} value={idx + 1}>
              {idx + 1}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => handleMonth(e.target.value)}
          className='form-select my-3 text-truncate'
          defaultValue={String(selectedMonth)}
        >
          {MONTHS.map((month, idx) => (
            <option key={`${month}-${idx}`} value={idx}>
              {MONTH[idx]}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => handleYear(e.target.value)}
          className='form-select my-3'
          defaultValue={String(selectedYear)}
        >
          {YEARS.map((year, idx) => (
            <option key={`${year}-${idx}`} value={selectedYear + 1}>
              {selectedYear + idx}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <div id='day' className='invalid-feedback text-center'>
          invalid day selected
        </div>
      )}
    </>
  );
};
export default DatePicker;
