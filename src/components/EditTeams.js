import { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, GET_TEAMS_MONTH } from '../graphql/queries';
import { ADD_TEAM, UPDATE_TEAM, DELETE_TEAM } from '../graphql/mutations';
import { ROLES, BASS, GUITAR, KEYBOARD, DRUM, MD,SERVICE } from '../constants';
import { TrashIcon, InfoIcon, WarningIcon } from '../icons';

export const EditTeams = ({
  teamsMonth,
  callToast,
  year,
  month,
  city,
  event,
  eventName,
  day,
  md,
  keyboard,
  bass,
  guitar,
  drum,
  preSelected,
  sundaysInMonth,
  idx,
  modify
}) => {
  const [valuesToSubmit, setValuesToSubmit] = useState([{}]);
  const [addTeam, { error: errorAddTeam }] = useMutation(ADD_TEAM, {
    refetchQueries: [
      {
        query: GET_USERS,
      },
      {
        query: GET_TEAMS_MONTH,
        variables: {
          year: String(year),
          month: String(month),
          city,
          event,
          eventName,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const [updateTeam, { error: errorUpdateTeam }] = useMutation(UPDATE_TEAM, {
    refetchQueries: [
      {
        query: GET_USERS,
      },
      {
        query: GET_TEAMS_MONTH,
        variables: {
          year: String(year),
          month: String(month),
          city,
          event,
          eventName,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const [deleteTeam, { error: errorDeleteTeam }] = useMutation(DELETE_TEAM, {
    refetchQueries: [
      {
        query: GET_USERS,
      },
      {
        query: GET_TEAMS_MONTH,
        variables: {
          year: String(year),
          month: String(month),
          city,
          event,
          eventName,
        },
      },
    ],
    awaitRefetchQueries: true,
  });

  const {
    md: selectedMd,
    bass: selectedBass,
    keyboard: selectedKey,
    drum: selectedDrum,
    guitar: selectedGuitar,
    teamId,
  } = preSelected;

  useEffect(() => {
    let buildValuesToSubmit = [];
    if (teamsMonth.length) {
      teamsMonth.forEach(({ day, id, md, keyboard, bass, guitar, drum }) => {
        buildValuesToSubmit.push({
          day,
          id,
          md,
          keyboard,
          bass,
          guitar,
          drum,
        });
      });
      setValuesToSubmit(buildValuesToSubmit);
    } else {
      if (sundaysInMonth) {
        sundaysInMonth.forEach((sunday) => {
          buildValuesToSubmit.push({ day: String(sunday) });
          setValuesToSubmit(buildValuesToSubmit);
        });
      }
    }
  }, [teamsMonth, sundaysInMonth]);

  const roles = {
    md,
    keyboard,
    bass,
    guitar,
    drum,
  };

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

  const saveTeam = ({ day, idx }) => {
    const { bass, md, keyboard, guitar, drum, id } =
      valuesToSubmit[idx] || valuesToSubmit;

    if (teamId) {
      updateTeam({
        variables: {
          id,
          md,
          keyboard,
          bass,
          drum,
          guitar,
          city,
          event,
          year:String(year),
          month:String(month),
          day:String(day),
        },
      });
    } else {
      addTeam({
        variables: {
          year: String(year),
          month: String(month),
          day: String(day),
          city,
          event,
          md,
          keyboard,
          bass,
          drum,
          guitar,
          eventName,
        },
      });
    }
    if (errorUpdateTeam && !errorAddTeam) {
      callToast({
        text: `adding menbers to team failed`,
        title: 'Error',
        icon: <WarningIcon />,
        color: 'bg-danger',
      });
    } else {
      callToast({
        text: `new players has been added`,
        title: 'New Players',
        icon: <InfoIcon />,
        color: 'bg-success',
      });
    }
  };

  const delTeam = ({ day, idx }) => {
    const { id } = valuesToSubmit[idx];
    deleteTeam({ variables: { id } });
  };

  const handleChange = ({ name, role }) => {
    valuesToSubmit[idx] = {
      ...valuesToSubmit[idx],
      [role.toLowerCase()]: name,
    };
  };

  return (
    <>
      {ROLES.map((role) => (
        <td key={role}>
          <select
            className='form-select'
            aria-label='Default select example'
            onChange={(e) => handleChange({ name: e.target.value, role })}
          >
            {!preSelection(role) && <option>...</option>}
            {roles[role.toLowerCase()].map((name) => {
              return (
                <option
                  key={name}
                  value={name}
                  selected={name === preSelection(role)}
                >
                  {name}
                </option>
              );
            })}
          </select>
        </td>
      ))}
      <td>
        <button
          onClick={() => saveTeam({ day, idx })}
          type='button'
          className='btn btn-outline-secondary'
        >
          save
        </button>
      </td>
     {((event === SERVICE)|| modify )&& <td>
        <button
          onClick={() => delTeam({ day, idx })}
          type='button'
          className='btn btn-outline-secondary'
        >
          <TrashIcon />
        </button>
      </td>}
    </>
  );
};
export default EditTeams;
