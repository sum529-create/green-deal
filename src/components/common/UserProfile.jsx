import { Link } from 'react-router-dom';
import { PRODUCT_DEFAULT_IMG } from '../../constants/mypageConstants';

const UserProfile = ({ userData = {} }) => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={userData.profile_img || PRODUCT_DEFAULT_IMG}
        alt="프로필 이미지"
        className="object-cover w-8 h-8 rounded-full bg-light-gray"
      />
      <Link to="/mypage">{userData.name || 'Guest'}</Link>
    </div>
  );
};

export default UserProfile;
