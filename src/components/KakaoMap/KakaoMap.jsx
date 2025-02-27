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
        <MapMarker
          position={location} // ip 기반으로 현재 내 위치 지정
          image={{
            src: 'null', // 프로필 사진 들어갈 예정
            size: {
              width: 34,
              height: 39,
            },
            options: {
              offset: {
                x: 27,
                y: 69,
              },
            },
          }}
        ></MapMarker>
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
                      border: '2px solid rgb(85 204 201)',
                      borderRadius: '15px',
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
