import { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { authSignOut } from '../../api/userAuthService';
import { useEffect } from 'react';

const UserArcodian = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // 페이지 이동 시 아코디언 닫히도록 구현
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await authSignOut();
      alert('로그아웃 되었습니다.');
    } catch (error) {
      alert('로그아웃에 실패하였습니다.');
    }
  };

  return (
    <div className="relative flex items-start">
      <button className="text-sm" onClick={() => setIsOpen((prev) => !prev)}>
        {isOpen ? <HiChevronUp size={24} /> : <HiChevronDown size={24} />}
      </button>

      <div
        className={`absolute w-32 mt-2 bg-white border rounded-lg shadow-md left-[-100px] top-[30px] text-black z-10 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <Link to="/mypage" className="block px-4 py-2 hover:bg-gray-100">
          마이페이지
        </Link>
        <Link
          to="/product/registration"
          className="block px-4 py-2 hover:bg-gray-100"
        >
          상품 등록
        </Link>
        <button
          className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default UserArcodian;
