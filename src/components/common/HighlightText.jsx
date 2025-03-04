const HighlightText = ({ children }) => {
  return (
    <span className="relative inline-block mr-1 before:content-[''] before:absolute before:bottom-0 before:left-0 before:right-0 before:h-3/5 before:bg-point-color2">
      <span className="relative">{children}</span>
    </span>
  );
};

export default HighlightText;
