import React from 'react';
import KakaoMap from '../KakaoMap/KakaoMap';

const ProductLocation = ({ address, isAddressLoading }) => {
  return (
    <>
      <div className="px-[20px] lg:px-[30px] py-[20px]  text-deep-gray">
        <h3 className="font-semibold text-title-sm mb-[20px]">거래 위치</h3>
        <p className="text-text-md mb-[20px]">
          {isAddressLoading
            ? '주소 변환 중...'
            : address || '주소를 찾을 수 없습니다.'}
        </p>
        <div className="w-full h-[300px] rounded-lg overflow-hidden border-[1px] border-light-gray">
          {/* ??? 수정 전 ??? */}
          <KakaoMap />
        </div>
      </div>
    </>
  );
};

export default ProductLocation;
