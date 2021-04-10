import { useMutation } from '@apollo/client';
import { AddUser, UpdateUser, DeleteUser } from '../components';
import { ADD_USER, UPDATE_USER, DELETE_USER } from '../graphql/mutations';
import { InfoIcon, WarningIcon } from '../icons';

export const EditUser = ({
  callToast,
  users,
  refetchTeams,
  refetchUsers,
}) => {
  const [addUser, { error: errorAddUser }] = useMutation(ADD_USER, {
    awaitRefetchQueries: true,
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    awaitRefetchQueries: true,
  });

  const [deleteUser] = useMutation(DELETE_USER, {
    awaitRefetchQueries: true,
  });

  const handleNewUser = (newUser) => {
    const { name, roleId, isDmId, isAdminId } = newUser;
    if (!name || !roleId) {
      callToast({
        text: `name or role missing`,
        title: 'Empty field',
        icon: <WarningIcon />,
        color: 'bg-warning',
      });

      return;
    } else {
      addUser({
        variables: {
          name,
          roleId,
          isDmId,
          isAdminId,
        },
      });
      refetchTeams();
      refetchUsers();
      callToast({
        text: `${name} has been added as new menbers`,
        title: 'New User',
        icon: <InfoIcon />,
        color: 'bg-success',
      });
      if (errorAddUser) {
        callToast({
          text: `adding user failed`,
          title: 'Error',
          icon: <WarningIcon />,
          color: 'bg-danger',
        });
        return;
      }
    }
  };

  const handleUpdateUser = (mofifiedUser) => {
    const { id, name, roleId, isDmId, isAdminId } = mofifiedUser;
    if (!id || !name || !roleId) {
      callToast({
        text: `name or role missing`,
        title: 'Empty field',
        icon: <WarningIcon />,
        color: 'bg-warning',
      });
      return;
    }
    updateUser({
      variables: {
        id,
        name,
        roleId,
        isDmId,
        isAdminId,
      },
    });
    refetchTeams();
    refetchUsers();
    callToast({
      text: `${name}'s profil has been updated`,
      title: 'Update User',
      icon: <InfoIcon />,
      color: 'bg-success',
    });
  };
  const handleDeleteUser = (deleteUserId) => {
    if (!deleteUserId) {
      callToast({
        text: `id missing`,
        title: 'Can not find a ID',
        icon: <WarningIcon />,
        color: 'bg-warning',
      });
      return;
    }
    deleteUser({
      variables: {
        id: deleteUserId,
      },
    });
    refetchTeams();
    refetchUsers();
    callToast({
      text: `profil deleted`,
      title: 'Delete User',
      icon: <InfoIcon />,
      color: 'bg-success',
    });
  };
  return (
    <div className='d-flex justify-content-around mt-5 p-3'>
      <AddUser handleNewUser={handleNewUser} />
      <UpdateUser users={users} handleUpdateUser={handleUpdateUser} />
      <DeleteUser users={users} handleDeleteUser={handleDeleteUser} />
    </div>
  );
};
export default EditUser;
