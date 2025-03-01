import React, { useState, useEffect } from 'react';
import { FaRegStar } from 'react-icons/fa';
import Comments from '../components/comments/Comments';
import { useParams } from 'react-router-dom';
import useUserStore from '../store/userStore';
import Button from '../components/common/Button';
import { supabase } from '../api/client';

const ProductDetail = () => {
  // State
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // 로그인한 유저 정보
  const currentUser = useUserStore((state) => state.user);
  const isLogin = useUserStore((state) => state.isLogin);
  const { id } = useParams(); // url에서 상품 id 가져오기

  // DB에서 데이터 가져오기
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        setProducts(data);
      } catch (error) {
        console.error('제품 데이터 로드 에러', error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase.from('users').select('*');
        if (error) throw error;
        setUsers(data);
      } catch (error) {
        console.log('사용자 데이터 로드 에러', error);
      }
    };
    fetchProducts();
    fetchUsers();
  }, []);

  // 현재 상품 찾기
  const product = products.find((item) => item.id === +id);

  if (!product) {
    return (
      <p className="text-center text-title-sm"> 상품을 찾을 수 없습니다.</p>
    );
  }

  // 판매자 정보 찾기
  const seller = users.find((user) => user.user_id === product.user_id);

  console.log('seller>>>', seller);
  // 로그인 유저가 상품의 작성자인지 확인
  const isOwner = isLogin && currentUser?.id === product.user_id;

  console.log('isOwner>>>', isOwner);

  // 상품 판매 완료 처리
  const handleCheckAsSold = async () => {
    if (
      !window.confirm(
        '완료 처리하면 번복이 불가합니다. 상품을 판매완료 처리 하시겠습니까?',
      )
    )
      return;

    try {
      const { error } = await supabase
        .from('products')
        .update({ soldout: true })
        .eq('id', product.id);

      if (error) throw error;

      // 상태 업데이트
      setProducts((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, soldout: true } : item,
        ),
      );
    } catch (error) {
      console.log('판매완료 처리 에러', error.message);
    }
  };

  return (
    <div>
      <div className="flex gap-12 p-8 mx-auto bg-white max-w-7xl">
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
          <div className="flex flex-col w-[630px]">
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

            <hr className="border-t-1 border-light-gray" />

            {/* 상품 설명 */}
            <div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  상품 설명
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            </div>

            {/* 지도 */}
            <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg">
              <div className="w-[400px] h-[250px] rounded-lg bg-gray">
                KKO MAP
              </div>
              <p className="text-sm text-deep-gray">
                서울특별시 강남구 테헤란로 44길 8
              </p>
            </div>

            {/* 판매글 작성자에게만 보이는 판매완료 버튼 */}
            {isOwner && (
              <Button
                type="button"
                onClick={
                  isOwner && !product.soldout ? handleCheckAsSold : undefined
                }
                size="large"
                variant={isOwner && !product.soldout ? 'outline' : 'disabled'}
                disabled={!isOwner || product.soldout}
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
