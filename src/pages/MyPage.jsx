import { useState } from 'react';
import ProfileSection from '../components/mypage/ProfileSection';
import useUserStore from '../store/userStore';
import TabNav from '../components/mypage/TabNav';
import MypageProductList from '../components/mypage/MypageProductList';

const MyPage = () => {
  const user = useUserStore((state) => state.user);
  const [currentTab, setCurrentTab] = useState('selling');

  return (
    <div className="flex items-start justify-center min-h-screen mt-32">
      <section className="flex flex-col items-center justify-center gap-10 min-w-[400px] min-h-[830px] bg-light-gray rounded-md">
        <ProfileSection user={user} />
        <TabNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
      </section>

      <section className="pl-20 min-w-[800px] min-h-screen">
        <h1 className="min-w-full p-0 font-bold text-title-lg text-darkmint">
          {currentTab === 'selling'
            ? '판매 중인 물품'
            : currentTab === 'sold'
              ? '판매 완료'
              : '찜한 상품'}
        </h1>
        <MypageProductList currentTab={currentTab} user={user} />
      </section>
    </div>
  );
};

export default MyPage;
