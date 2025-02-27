import React, { useState, useEffect } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { getUserLocation } from '../../utils/getUserLocation';

const KakaoMap = ({ level, mode, productList }) => {
  const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 });
  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
    getUserLocation()
      .then((coords) => setLocation(coords))
      .catch((error) => console.error(error));
  }, []);

  const handleClickProduct = (product) => {
    setProductInfo(product);
  };

  return (
    <div className="w-full h-full">
      <Map
        center={location}
        level={level}
        style={{ width: '100%', height: '100%' }}
      >
        {mode === 'productList' &&
          productList.map((product) => (
            <div key={product.id}>
              <MapMarker
                position={product.location}
                onClick={() => handleClickProduct(product)}
              />

              {productInfo && productInfo.id === product.id && (
                <CustomOverlayMap position={product.location} yAnchor={1.7}>
                  <div
                    style={{
                      padding: '42px',
                      backgroundColor: '#fff',
                      border: '1px solid black',
                      color: '#000',
                    }}
                  >
                    {product.product_description}
                  </div>
                </CustomOverlayMap>
              )}
            </div>
          ))}
      </Map>
    </div>
  );
};

export default KakaoMap;
