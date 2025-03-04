import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const MapProductModal = ({ product, productInfo }) => {
  return (
    <div>
      {productInfo && productInfo.id === product.id && (
        <CustomOverlayMap
          position={product.location}
          yAnchor={1.4}
          clickable={true}
        >
          <Link
            to={`/product/detail/${product.id}`}
            className="pointer-events-auto flex flex-col items-center justify-center p-5 bg-white border-4 border-[#55CCC9] rounded-xl text-black text-center min-w-[150px] max-w-[200px] w-auto transition-transform duration-200 ease-in-out hover:scale-110"
          >
            {/* 상품명 - 띄어쓰기 단위로 줄바꿈, 최대 너비 초과 시 강제 줄바꿈 */}
            <div className="w-full mb-1 font-bold text-center break-words whitespace-normal">
              {product.name}
            </div>

            {/* 가격 */}
            <div className="mb-1 text-gray-600">
              {Number(product.price).toLocaleString()}원
            </div>

            {/* 사용자명 & 날짜 - 간격 조정 */}
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
