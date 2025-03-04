import React from 'react';

const TextArea = ({
  value = '',
  name = '',
  onChange = () => {},
  placeholder = '',
  className = '',
}) => {
  const TEXT_AREA_DEFAULT_STYLE =
    'w-full h-24 p-2 border rounded-[10px] resize-none border-gray focus:outline-none focus:ring-1 focus:ring-graish-green';
  return (
    <textarea
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={`${TEXT_AREA_DEFAULT_STYLE} ${className}`}
    ></textarea>
  );
};

export default TextArea;
