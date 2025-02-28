import React, { useState } from 'react';
import { FaRegStar } from 'react-icons/fa';
import Comments from '../components/comments/Comments';
import { useParams } from 'react-router-dom';
import useUserStore from '../store/userStore';
import Button from '../components/common/Button';

const ProductDetail = () => {
  // 상품테이블 더미데이터
  const [productLists, setProductLists] = useState([
    {
      id: 1,
      createdAt: '2024-02-27T12:34:56.789Z',
      name: '아이폰11',
      category: '디지털기기',
      price: '10000',
      quality: '최상',
      refund: false,
      location: { lat: 33.450701, lng: 126.570667 },
      description: '싸다 싸! 신발보다 싸!',
      img: 'https://alephksa.com/cdn/shop/files/iPhone_14_Blue_PDP_Image_Position-1A__WWEN_0853ab85-adc4-47fb-8955-43df09cca9f1.jpg?v=1688733593&width=2048',
      user_id: 20250229084522,
      soldout: false,
      updated_at: '',
    },
    {
      id: 2,
      createdAt: '2024-02-28T12:34:56.789Z',
      name: '축구공',
      category: '스포츠/레저',
      price: '100000',
      quality: '중상',
      refund: false,
      location: { lat: 33.250701, lng: 126.270667 },
      description: '사용감 살짝 있습니다!',
      img: 'https://cdn-static.zep.us/static/assets/baked-avartar-images/2-25-11-73.png',
      user_id: 20250228074523,
      soldout: true,
      updated_at: '2024-02-29T12:34:56.789Z',
    },
    {
      id: 3,
      createdAt: '2024-02-27T12:38:56.789Z',
      name: '맥북 Air',
      category: '디지털기기',
      price: '1000000',
      quality: '최상',
      refund: false,
      location: { lat: 33.550701, lng: 126.670667 },
      description: '개봉만 했습니다.',
      img: 'https://cdn-static.zep.us/static/assets/baked-avartar-images/10-539-44-430.png',
      user_id: 20250227074521,
      soldout: true,
      updated_at: '',
    },
  ]);

  // 유저정보 테이블 더미데이터
  const [users] = useState([
    {
      id: 11,
      created_at: '2025-02-27 07:45:22.595391+00',
      user_id: 20250227074521,
      email: 'test4@spartan.com',
      name: '연진이',
      profile_img:
        'https://cdn-static.zep.us/static/assets/baked-avartar-images/10-539-44-430.png',
    },
    {
      id: 12,
      created_at: '2025-02-28 07:45:22.595391+00',
      user_id: 20250228074523,
      email: 'test5@sparta.com',
      name: '오토바이있음',
      profile_img:
        'https://cdn-static.zep.us/static/assets/baked-avartar-images/7-361-52-630.png',
    },
    {
      id: 13,
      created_at: '2025-02-29 08:45:22.595391+00',
      user_id: 20250229084522,
      email: 'test6@sparta.com',
      name: 'MBTI공쥬',
      profile_img:
        'https://cdn-static.zep.us/static/assets/baked-avartar-images/1-529-65-73.png',
    },
  ]);

  // 현재 로그인 한 유저정보 넣을 자리
  // const currentUser = useUserStore((state) => state.user); // Zustand에서 로그인한 유저 정보 가져오기
  // const isOwner = currentUser?.user_id === product.user_id; // 로그인 유저가 상품의 작성자인지 확인

  //
  const { id } = useParams(); // 패스파라미터 id 가져오기
  const product = productLists.find((item) => item.id === +id);
  // 판매자 정보 가져오기
  const seller = users.find((user) => user.user_id === product.user_id);

  //
  // 예시 로그인 유저, 테스트용
  const currentTestUser = users.find(
    (user) => +user.user_id === Number(20250229084522),
  );
  //
  // 예시 게시글 작성자 확인 , 테스트용
  const isTestOwner = currentTestUser?.user_id === product.user_id;
  console.log('isTestOwner>>>', isTestOwner);

  if (!product) {
    return (
      <p className="text-center text-title-sm"> 상품을 찾을 수 없습니다.</p>
    );
  }

  // 상품 판매 완료 처리 >> db 연동 필요
  const handleCheckAsSold = () => {
    setProductLists((prev) =>
      prev.map((item) =>
        item.id === product.id ? { ...item, soldout: true } : item,
      ),
    );
  };

  return (
    <div>
      <div className="flex max-w-5xl gap-12 p-8 mx-auto bg-white">
        {/* 상품 이미지 */}
        <div className="flex items-center justify-center p-6 w-[580px] h-[730px] bg-light-gray">
          <img
            src={product.img}
            alt={product.name}
            className="object-cover w-full bg-gray-200 rounded-lg"
          />
        </div>

        {/* 상품 정보 */}
        <div className="w-[630]">
          <div className="flex flex-col pace-y-6">
            {/* 상품명, 판매여부 & 찜하기 */}
            <div className="flex justify-between p-4">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold">{product.name}</h2>
                <span
                  className={`flex items-center justify-center mx-4 px-3 text-caption min-w-[80px] rounded-full ${product.soldout ? 'bg-gray text-deep-gray' : 'bg-deep-mint text-white'}`}
                >
                  {product.soldout ? '판매 완료' : '판매중'}
                </span>
              </div>
              <FaRegStar className="text-2xl text-gray-500 cursor-pointer hover:text-yellow-400" />
            </div>

            {/* 상품 가격*/}
            <p className="pl-4 text-lg font-semibold text-deep-mint">
              {Number(product.price).toLocaleString()}원
            </p>
            <div className="flex items-center gap-4"></div>
          </div>

          <hr className="border-t-1 border-light-gray" />

          {/* 판매자 정보 */}
          <div className="flex items-center gap-3">
            <img
              src={seller?.profile_img}
              alt={seller?.name}
              className="w-10 h-10 bg-gray-300 rounded-full"
            />
            <span className="text-gray-700">{seller?.name}</span>
          </div>

          <hr className="border-t-1 border-light-gray" />

          {/* 상품 상세 정보 */}
          <div className="flex gap-8">
            <div className="p-4 space-y-2 bg-gray-100 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">상품정보</h3>
              <p className="text-sm">
                <strong>상태 :</strong> {product.quality}
              </p>
              <p className="text-sm">
                <strong>교환 :</strong> {product.refund ? '가능' : '불가능'}
              </p>
              <p className="text-sm">
                <strong>카테고리:</strong> {product.category}
              </p>
            </div>

            {/* 지도 */}
            <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg">
              <div className="w-full h-32 rounded-lg bg-deep-gray">KKO MAP</div>
              <p className="text-sm text-gray-600">
                서울특별시 강남구 테헤란로 44길 8
              </p>
            </div>
          </div>

          <hr className="border-t-1 border-light-gray" />

          {/* 상품 설명 */}
          <div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">상품 설명</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* 판매글 작성자에게만 보이는 판매완료 버튼 */}
            {isTestOwner && (
              <Button
                type="button"
                onClick={
                  isTestOwner && !product.soldout
                    ? handleCheckAsSold
                    : undefined
                }
                size="large"
                variant={
                  isTestOwner && !product.soldout ? 'outline' : 'disabled'
                }
                disabled={!isTestOwner || product.soldout}
              >
                {product.soldout ? '거래종료' : '판매완료'}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* 댓글 컴포넌트 영역 */}
      <Comments users={users} />
    </div>
  );
};

export default ProductDetail;
