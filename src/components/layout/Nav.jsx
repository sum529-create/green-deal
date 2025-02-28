import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="fixed top-0 flex items-center justify-between w-full h-[60px] bg-white px-7 text-mint text-lg shadow-sm">
      <Link to="/product">??마켓</Link>
      <div>
        <Link to="/signin">로그인</Link>
      </div>
    </nav>
  );
};

export default Nav;
