import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthData, useUserData } from '../../hooks/useUserQuery';
import NavAuthStatus from './NavAuthStatus';


const Nav = () => {
  const { data: authData } = useAuthData();
  const { data: userData, isPending } = useUserData(authData?.sub);

  return (
    <nav className="fixed top-0 flex items-center justify-between w-full h-[60px] bg-deep-mint px-7 text-white text-base font-light shadow-sm">
      <Link to="/product">
        <img src="/public/Logo.jpeg" className="h-14" />
      </Link>
      <NavAuthStatus isPending={isPending} userData={userData} />
    </nav>
  );
};

export default Nav;
