const Label = ({ children }) => {
  return (
    <label className="block mb-3 text-lg font-medium leading-none text-deep-gray">
      {children}
    </label>
  );
};

export default Label;
