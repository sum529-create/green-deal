import React from 'react';
import KakaoMap from '../KakaoMap/KakaoMap';
import { MODE } from '../../constants/constants';

const ProductLocation = ({ address, isAddressLoading, location }) => {
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
          <KakaoMap productLocation={location} mode={MODE.DETAILLOCATION} />
        </div>
      </div>
    </>
  );
};

export default ProductLocation;
