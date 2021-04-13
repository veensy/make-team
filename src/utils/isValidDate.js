import { getDaysInMonth } from './getDaysInMonth';
export const isValidDate = (d, m, y) => {
  return m >= 0 && m < 12 && d > 0 && d <= getDaysInMonth(m, y);
};

export default isValidDate;
