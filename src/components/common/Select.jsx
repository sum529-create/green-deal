import React from 'react';

const Select = ({
  value = '',
  name = '',
  onChange = () => {},
  children = null,
  className = '',
}) => {
  const SELECT_DEFAULT_STYLE =
    'appearance-none py-2 px-4 leading-[30px] border-2 border-[#BEBEBE] text-lg text-[#BEBEBE] w-full rounded-[10px] focus:outline-none focus:ring-1 focus:ring-graish-green';
  return (
    <div className="relative">
      <select
        value={value}
        name={name}
        onChange={onChange}
        className={`${SELECT_DEFAULT_STYLE} ${className}`}
      >
        <option value="">선택해주세요</option>
        {children}
      </select>
      <div className="absolute inset-y-0 right-[15px] flex items-center pointer-events-none">
        <svg
          width="15"
          height="15"
          viewBox="0 0 10 6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.572268 1C0.572268 0.447715 1.01998 0 1.57227 0H8.42773C8.98001 0 9.42773 0.447715 9.42773 1C9.42773 1.21 9.3614 1.39 9.25 1.54L5.86 6.05C5.68 6.29 5.36 6.42 5 6.42C4.64 6.42 4.32 6.29 4.14 6.05L0.75 1.54C0.63726 1.39 0.572268 1.21 0.572268 1Z"
            fill="#BEBEBE"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
