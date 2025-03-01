import React from 'react';
import { Link } from 'react-router-dom';
import { useUserData } from '../../hooks/useUserQuery';

const Nav = () => {
  const { data: user, isPending } = useUserData();

  console.log(user);

  return (
    <nav className="fixed top-0 flex items-center justify-between w-full h-[60px] bg-deep-mint px-7 text-white text-lg shadow-sm">
      <Link to="/product">
        <img src="/public/Logo.jpeg" className="h-14" />
      </Link>
      <div>
        {isPending ? (
          <span>guest</span>
        ) : user ? (
          <Link to="/mypage">{user.name}</Link>
        ) : (
          <Link to="/signin">로그인</Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
