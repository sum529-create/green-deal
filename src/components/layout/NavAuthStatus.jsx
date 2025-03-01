import { Link } from 'react-router-dom';
import UserProfile from '../common/UserProfile';

const NavAuthStatus = ({ isPending, userData }) => {
  if (isPending) {
    return (
      <UserProfile/>
    );
  }

  return userData ? (
    <UserProfile userData={userData} />
  ) : (
    <div>
      <Link to="/signin">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default NavAuthStatus;
