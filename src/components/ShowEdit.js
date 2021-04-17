export const ShowEdit = ({ handleEdit,isAdmin }) => {
  return (
    <div className='d-flex justify-content-center gap-2'>
      {isAdmin && (
        <button
          className='btn btn-outline-secondary'
          type='button'
          id='button-addon1'
          onClick={() => handleEdit('team')}
        >
          Edit team
        </button>
      )}
      {isAdmin && (
        <button
          className='btn btn-outline-secondary'
          type='button'
          id='button-addon1'
          onClick={() => handleEdit('setlist')}
        >
          Edit setlist
        </button>
      )}
      {isAdmin && (
        <button
          className='btn btn-outline-secondary'
          type='button'
          id='button-addon1'
          onClick={() => handleEdit('member')}
        >
          Edit Member
        </button>
      )}
    </div>
  );
};
export default ShowEdit;
