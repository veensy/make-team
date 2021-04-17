import { useState } from 'react';
import { Inputs } from './Inputs';

export const ListInputs = ({ saveSetList,disabled }) => {
  const [inputList, setInputList] = useState({ title: '', link: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const list = { ...inputList };
    list[name] = value;
    setInputList(list);
  };

  return (
    <Inputs
      title={inputList?.title}
      link={inputList?.link}
      handleChange={handleChange}
      saveSetList={() => saveSetList(inputList)}
      disabled={disabled}
    />
  );
};
export default ListInputs;
