import { MapMarker } from 'react-kakao-maps-sdk';
import MapProductModal from './MapProductModal';

const MapProductMarker = ({ productList, productInfo, setProductInfo }) => {
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
