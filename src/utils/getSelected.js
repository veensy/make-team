export const getSelected = (team, currentSunday, role) => {
  const selected = team.filter(({ sunday }) => {
    return sunday === currentSunday;
  });
  if (selected[0]?.[role]) {
    return { name: selected[0][role], id: selected[0].id };
  }
  return;
};
export default getSelected;
