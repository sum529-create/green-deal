import React from 'react';
import KakaoMap from '../KakaoMap/KakaoMap';

const ProductLocation = ({ address, isAddressLoading }) => {
  return (
    <div className="flex flex-col items-center rounded-lg">
      <div className="flex flex-col space-y-2">
        <div className="w-[400px] h-[250px] rounded-lg">
          {/* ??? 수정 전 ??? */}
          <KakaoMap />
        </div>
        <p className="text-text-md-sm text-deep-gray">
          {isAddressLoading
            ? '주소 변환 중...'
            : address || '주소를 찾을 수 없습니다.'}
        </p>
      </div>
    </div>
  );
};

export default ProductLocation;
