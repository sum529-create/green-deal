import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { useEffect } from 'react';
import { getUserLocation } from '../utils/getUserLocation';
import Loading from '../components/common/Loading';

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
      <div className="flex-grow full min-h-[300px]">
        <h1 className="flex flex-col items-center justify-center h-full text-2xl ">
          <span>위치 정보가 필요한 서비스입니다.</span>
          <Loading />
        </h1>
      </div>
    ) : (
      <div className="flex-grow full min-h-[300px] rounded-5 md:rounded-[65px] overflow-hidden border border-light-gray">
        {children}
      </div>
    );
  }
  return isLocationAllowed ? <Outlet /> : <Navigate to="/product" />;
};

export default AllowedRoute;
