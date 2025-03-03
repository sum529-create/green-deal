import React from 'react';

const Select = ({
  value = '',
  name = '',
  onChange = () => {},
  children = null,
  className = '',
}) => {
  const SELECT_DEFAULT_STYLE =
    'w-full p-2 border rounded-[10px] border-gray focus:outline-none focus:ring-1 focus:ring-graish-green';
  return (
    <select
      value={value}
      name={name}
      onChange={onChange}
      className={`${SELECT_DEFAULT_STYLE} ${className}`}
    >
      <option value="">선택해주세요</option>
      {children}
    </select>
  );
};

export default Select;
