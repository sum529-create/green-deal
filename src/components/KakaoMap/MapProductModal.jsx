import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const MapProductModal = ({ product, productInfo }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {productInfo && productInfo.id === product.id && (
        <CustomOverlayMap
          position={product.location}
          xAnchor={isMobile ? -0.4 : undefined}
          yAnchor={isMobile ? undefined : 1.4}
          clickable={true}
        >
          <Link
            to={`/product/detail/${product.id}`}
            className={`pointer-events-auto flex flex-col items-center justify-center p-5 
            border-2 border-[#55CCC9] rounded-xl text-black text-center 
            transition-transform duration-200 ease-in-out hover:scale-110 bg-white
            ${isMobile ? 'p-3 border-2 text-sm min-w-[100px] max-w-[120px]' : 'min-w-[150px] max-w-[200px]'}`}
          >
            {/* 상품명 */}
            <div className="w-full mb-1 font-bold text-center break-words whitespace-normal">
              {product.name}
            </div>

            {/* 가격 */}
            <div className="mb-1 text-gray-600">
              {Number(product.price).toLocaleString()}원
            </div>

            {/* 사용자명 & 날짜 */}
            <div className="flex items-center text-xs text-gray-500 gap-x-4">
              <span className="truncate">{product.user_name}</span>
              <span>{dayjs(product.createdAt).format('YY.MM.DD')}</span>
            </div>
          </Link>
        </CustomOverlayMap>
      )}
    </div>
  );
};

export default MapProductModal;
