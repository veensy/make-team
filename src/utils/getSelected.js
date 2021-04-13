import { ROLES } from '../constants';
export const getSelected = (team, currentDay, role) => {
  const selected = team.filter(({ day }) => {
    return day === currentDay;
  });

  let buildSelection = {};
  ROLES.map((role) => {
    if (selected[0]?.[role.toLowerCase()]) {
      buildSelection = {
        ...buildSelection,
        [role.toLowerCase()]: selected[0][role.toLowerCase()],
        teamId: selected[0]?.id,
      };
    }
  });
  return buildSelection;
};
export default getSelected;
