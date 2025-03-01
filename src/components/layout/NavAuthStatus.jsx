import { Link } from 'react-router-dom';
import UserProfile from '../common/UserProfile';

const NavAuthStatus = ({ isLoading, userData }) => {
  if (isLoading) {
    return (
      <UserProfile/>
    );
  }

  return userData ? (
    <UserProfile userData={userData} />
  ) : (
    <div className='flex gap-2'>
      <Link to="/signin">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default NavAuthStatus;
