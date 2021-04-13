import { ROLES, BASS, GUITAR, KEYBOARD, DRUM, MD } from '../constants';

export const Teams = ({ md, keyboard, bass, guitar, drum, preSelected }) => {
  const roles = {
    md,
    keyboard,
    bass,
    guitar,
    drum,
  };
  const {
    md: selectedMd,
    bass: selectedBass,
    keyboard: selectedKey,
    drum: selectedDrum,
    guitar: selectedGuitar,
    teamId,
  } = preSelected;

  const preSelection = (role) => {
    switch (role) {
      case MD:
        return selectedMd;
      case KEYBOARD:
        return selectedKey;
      case BASS:
        return selectedBass;
      case GUITAR:
        return selectedGuitar;
      case DRUM:
        return selectedDrum;
      default:
        break;
    }
  };
  return (
    <>
      {ROLES.map((role) => (
        <td key={role}>
          {roles[role.toLowerCase()]
            .filter((name) => name === preSelection(role))
            .map((name) => (
              <p key={name} className='m-0'>{name}</p>
            ))}
        </td>
      ))}
    </>
  );
};
export default Teams;
