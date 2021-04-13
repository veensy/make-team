export const getDaysInMonth = (selectedMonth, selectedYear) => {
    return new Date(
      Number(selectedYear),
      Number(selectedMonth + 1),
      0
    ).getDate();
  };
  export default getDaysInMonth