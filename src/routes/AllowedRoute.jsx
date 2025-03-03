import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { useEffect } from 'react';
import { getUserLocation } from '../utils/getUserLocation';

const AllowedRoute = ({ children }) => {
  const { pathname } = useLocation();

  const isLocationAllowed = useUserStore((state) => state.isLocationAllowed);
  const setLocationAllowed = useUserStore((state) => state.setLocationAllowed);
  useEffect(() => {
    getUserLocation()
      .then(() => {
        setLocationAllowed(true);
      })
      .catch(() => {
        setLocationAllowed(false);
      });
  }, [isLocationAllowed]);

  if (pathname === '/product') {
    return isLocationAllowed === false ? (
      <div className="flex-grow full min-h-[400px]">
        <h1 className="flex items-center justify-center h-full text-2xl ">
          위치 정보가 필요한 서비스입니다.
        </h1>
      </div>
    ) : (
      <div className="flex-grow full min-h-[400px] rounded-lg overflow-hidden border border-light-gray m-10">{children}</div>
    );
  }
  return isLocationAllowed ? <Outlet /> : <Navigate to="/product" />;
};

export default AllowedRoute;
