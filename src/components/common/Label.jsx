const Label = ({ children, className }) => {
  return (
    <label
      className={`block mb-3 text-lg font-medium leading-none text-deep-gray ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
