const HighlightText = ({ children }) => {
  return (
    <span className="relative inline-block mr-1">
      <span className="absolute bottom-0 left-0 right-0 top-auto bg-point-color2 h-3/5"></span>
      <span className="relative">{children}</span>
    </span>
  );
};

export default HighlightText;
