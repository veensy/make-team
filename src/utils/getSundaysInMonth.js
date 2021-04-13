export const getSundaysInMonth = ( month, year ) => {
  const dayInMonth = (month, year) => new Date(year, month, 0).getDate();
  const getTotalDaysInMonth = dayInMonth(month, year);
  let sundays = [];
  for (var i = 1; i <= getTotalDaysInMonth; i++) {
    var newDate = new Date(year, month, i);
    if (newDate.getDay() === 0) {
      sundays.push(i);
    }
  }
  return sundays;
};
export default getSundaysInMonth