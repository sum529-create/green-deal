import { MapMarker } from 'react-kakao-maps-sdk';
import MapProductModal from './MapProductModal';

const MapProductMarker = ({ productList, productInfo, setProductInfo }) => {
  // 특정 마커 클릭 시 그 제품의 정보를 모달로 전달
  const handleClickProduct = (product) => {
    setProductInfo(product);
  };

  return (
    <div>
      {productList.map((product) => (
        <div key={product.id}>
          <MapMarker
            position={product.location}
            onClick={() => handleClickProduct(product)}
          />
          <MapProductModal product={product} productInfo={productInfo} />
        </div>
      ))}
    </div>
  );
};

export default MapProductMarker;
