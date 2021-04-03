export const getSundaysInMonth = ( month, year ) => {
  const dayInMonth = (month, year) => new Date(year, month, 0).getDate();
  const getTotalDaysInMonth = dayInMonth(month, year);
  let sunday = [];
  for (var i = 1; i <= getTotalDaysInMonth; i++) {
    var newDate = new Date(year, month, i);
    if (newDate.getDay() === 0) {
      sunday.push(i);
    }
  }
  return sunday;
};
export default getSundaysInMonth