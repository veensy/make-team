import { YES, BASS, GUITAR, KEYBOARD, DRUM } from '../constants';

export const getStatus = (users) => {
  let md = [];
  let admin = [];
  let bass = [];
  let guitar = [];
  let keyboard = [];
  let drum = [];
  Object.keys(users).forEach((key) => {
    if (users[key].isDm.status === YES) {
      md.push(users[key].name);
    }

    if (users[key].isAdmin.status === YES) {
      admin.push(users[key].name);
    }

    switch (users[key].role.role) {
      case BASS:
        bass.push(users[key].name);
        break;
      case GUITAR:
        guitar.push(users[key].name);
        break;
      case KEYBOARD:
        keyboard.push(users[key].name);
        break;
      case DRUM:
        drum.push(users[key].name);
        break;
      default:
          return 'unknow role';
    }
  });

  return { md, admin, bass, guitar, keyboard, drum };
};
export default getStatus;
