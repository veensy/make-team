import { YouTubeIcon, NoteIcon } from '../icons';

export const Inputs = ({
  title,
  link,
  saveSetList,
  handleChange,
  disabled,
}) => {
  return (
    <>
      <div className='d-flex flex-wrap mb-3'>
        <div className='d-flex flex-wrap'>
          <div className='input-group mb-3'>
            <span className='input-group-text' id='basic-addon1'>
              <NoteIcon />
            </span>
            <input
              type='text'
              className='form-control'
              placeholder='Title'
              aria-label='Title'
              name='title'
              value={title}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className='d-flex flex-wrap'>
          <div className='input-group mb-3'>
            <span className='input-group-text' id='basic-addon1'>
              <YouTubeIcon />
            </span>
            <input
              type='text'
              className='form-control'
              placeholder='Link'
              aria-label='Link'
              name='link'
              value={link}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <button
          onClick={saveSetList}
          type='button'
          className='btn btn-outline-secondary mb-3 mx-sm-0 mx-auto'
          disabled={disabled}
        >
          save
        </button>
      </div>
    </>
  );
};
export default Inputs;
