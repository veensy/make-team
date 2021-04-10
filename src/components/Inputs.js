import { YouTubeIcon, NoteIcon,TrashIcon } from '../icons';

export const Inputs = ({title,link,removeInput,handleChange,idx}) => {
  
    return (
      <>
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
            onChange={e =>handleChange(e,idx)}
          />
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
            onChange={e =>handleChange(e,idx)}
          />
            <button
            className='btn btn-outline-secondary'
            type='button'
            id='button-addon1'
            onClick={()=>removeInput(idx)}
          >
            <TrashIcon />
          </button>

        </div>
      </>
    );
  };
  export default Inputs