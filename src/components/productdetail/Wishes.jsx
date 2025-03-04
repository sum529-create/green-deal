import React from 'react';
import useUserStore from '../../store/userStore';
import { FaRegStar, FaStar } from 'react-icons/fa';
import { useAddWish, useGetWishes, useRemoveWish } from '../../hooks/useWish';

const Wishes = ({ productId }) => {
  const currentUser = useUserStore((state) => state.user);

  // 찜 상태 가져오기
  const { data: wishes = [] } = useGetWishes(productId);

  // 로그인한 유저가 찜한 상태인지 확인 / 로그인하지 않은경우 기본 false
  const isWished = currentUser?.id
    ? wishes.some((wish) => wish.user_id === currentUser.id)
    : false;

  // 찜 추가 하기
  const addWishMutation = useAddWish(productId);

  // 찜 취소 하기
  const removeWishMutation = useRemoveWish(productId);

  // 찜하기/해제 토글
  const handleWishToggle = () => {
    if (!currentUser) {
      alert('로그인 후 이용할 수 있습니다.');
      return;
    }

    if (isWished) {
      const wishToRemove = wishes.find(
        (wish) => wish.user_id === currentUser.id,
      );
      removeWishMutation.mutate(wishToRemove.id);
    } else {
      addWishMutation.mutate({ productId, userId: currentUser.id });
    }
  };

  return (
    <button onClick={handleWishToggle}>
      {!isWished ? (
        <FaRegStar
          style={{
            fill: '#55CCC9',
          }}
          className="text-2xl cursor-pointer hover:scale-125"
        />
      ) : (
        <FaStar className="text-2xl cursor-pointer text-mint hover:scale-125" />
      )}
    </button>
  );
};

export default Wishes;
