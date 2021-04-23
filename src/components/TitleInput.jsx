import React, { useEffect, useRef, useState } from 'react';

const TitleInput = ({ placeholder, renameCallback }) => {
  const [newTitle, setNewTitle] = useState(placeholder);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleOnBlur = (e) => {
    renameCallback(placeholder);
  };

  const handleOnChange = (e) => {
    setNewTitle(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      renameCallback(newTitle);
    }
    if (e.key === 'Escape') {
      inputRef.current.blur();
    }
  };

  const inputRef = useRef();

  return (
    <input
      className='column-item-title-input' // prettier ignore
      defaultValue={placeholder}
      onBlur={handleOnBlur}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      ref={inputRef}
      type='text'
    ></input>
  );
};

export default TitleInput;
