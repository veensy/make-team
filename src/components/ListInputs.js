import { useState } from 'react';
import { Inputs } from './Inputs';
import { PlusCircleIcon } from '../icons';

export const ListInputs = ({ setlist }) => {
  const [inputList, setInputList] = useState([{ title: '', link: '' }]);

  const addInput = () => {
    setInputList([...inputList, { title: '', link: '' }]);
  };

  const removeInput = (idx) => {
    const newInput = [...inputList];
    newInput.splice(idx, 1);
    setInputList(newInput);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    setlist(list);
  };
  return (
    <>
      {inputList.map(({ title, link }, idx) => (
        <div key={`${idx}-input`}>
          <Inputs
            title={title}
            link={link}
            idx={idx}
            handleChange={handleChange}
            removeInput={removeInput}
          />
        </div>
      ))}
      <button
        className='btn btn-outline-secondary  w-100'
        type='button'
        id='button-addon1'
        onClick={addInput}
      >
        <PlusCircleIcon />
      </button>
    </>
  );
};
export default ListInputs;
