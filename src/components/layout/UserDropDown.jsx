import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { authSignOut } from '../../api/userAuthService';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { PRODUCT_DEFAULT_IMG } from '../../constants/mypageConstants';
import useUserStore from '../../store/userStore';

const UserDropDown = ({ userData = {} }) => {
  const clearUser = useUserStore((state) => state.clearUser);

  const handleLogout = async () => {
    try {
      await authSignOut();
      clearUser();
      alert('로그아웃 되었습니다.');
    } catch (error) {
      alert('로그아웃에 실패하였습니다.');
    }
  };

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <MenuButton className="flex items-center gap-2 focus:outline-none">
            <img
              src={userData.profile_img || PRODUCT_DEFAULT_IMG}
              alt="프로필 이미지"
              className="object-cover w-8 h-8 bg-white rounded-full"
            />
            <span className="font-semibold text-text-md">
              {userData.name || '그린딜'}
            </span>
            {open ? <FiChevronUp /> : <FiChevronDown />}
          </MenuButton>
          <MenuItems
            anchor="bottom"
            modal={false}
            className="absolute right-0 z-50 w-32 mt-2 text-sm text-center text-black bg-white rounded-md shadow-lg focus:outline-none"
          >
            <MenuItem>
              <Link
                to="/mypage"
                className="relative block px-4 py-4 after:bg-gray after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-[1px] after:block after:absolute after:bottom-0"
              >
                마이페이지
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/product/registration"
                className="relative block px-4 py-4 after:bg-gray after:left-1/2 after:-translate-x-1/2 after:w-2/3 after:h-[1px] after:block after:absolute after:bottom-0"
              >
                상품 등록
              </Link>
            </MenuItem>
            <MenuItem>
              <button onClick={handleLogout} className="block w-full px-4 py-4">
                로그아웃
              </button>
            </MenuItem>
          </MenuItems>
        </>
      )}
    </Menu>
  );
};

export default UserDropDown;
