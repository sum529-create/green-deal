import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { getUserLocation } from '../../utils/getUserLocation';
import { useRef } from 'react';
import MyLocationMarker from './MyLocationMarker';
import MapProductMarker from './MapProductMarker';
import { MODE } from '../../constants/constants';

const KakaoMap = ({ level, mode, productList, selectedProduct }) => {
  const [location, setLocation] = useState({ lat: null, lng: null }); // 유저의 중심 위치를 위한 상태
  const [productInfo, setProductInfo] = useState(null);
  const [center, setCenter] = useState(location); // 지도의 중심 위치를 위한 상태

  useEffect(() => {
    getUserLocation()
      .then((coords) => {
        setLocation({ lat: 37.5568, lng: 126.9237 });
        setCenter({ lat: 37.5568, lng: 126.9237 });
      }) // 더미 데이터 확인을 위한 위도 경도 설정입니다. 추후에 coords로 변경 예정
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      const foundProduct = productList.find(
        (product) => product.id === selectedProduct,
      );
      if (foundProduct) {
        setCenter(foundProduct.location); // 지도 중심을 해당 위치로 이동
      }
      setProductInfo(foundProduct || null);
    }
  }, [selectedProduct, productList]);

  // MapProductModal 닫기 기능
  const handleClickMap = () => {
    setProductInfo(null);
  };

  return (
    <div className="w-full h-full">
      <Map
        center={center}
        level={level}
        style={{ width: '100%', height: '100%' }}
        onClick={handleClickMap}
      >
        {mode === MODE.PRODUCTLIST && (
          <>
            <MyLocationMarker location={location} />
            <MapProductMarker
              productList={productList}
              productInfo={productInfo}
              setProductInfo={setProductInfo}
            />
          </>
        )}
      </Map>
    </div>
  );
};

export default KakaoMap;
