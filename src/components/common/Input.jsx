import React from 'react';

const Input = ({
  type,
  value,
  name,
  inputMode = '',
  onChange,
  placeholder,
  className,
}) => {
  const INPUT_DEFAULT_STYLE =
    'w-full p-2 border rounded-[10px] border-gray focus:outline-none focus:ring-1 focus:ring-graish-green';

  return (
    <input
      type={type}
      value={value}
      name={name}
      inputMode={inputMode}
      onChange={onChange}
      placeholder={placeholder}
      className={`${INPUT_DEFAULT_STYLE} ${className}`}
    />
  );
};

export default Input;
