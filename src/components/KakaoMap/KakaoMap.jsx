import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { getUserLocation } from '../../utils/getUserLocation';
import { useRef } from 'react';
import MyLocationMarker from './MyLocationMarker';
import MapProductMarker from './MapProductMarker';
import { MODE } from '../../constants/constants';

const KakaoMap = ({
  level,
  mode,
  productList,
  selectedProduct,
  onLocationSelect,
  sendAddress,
}) => {
  const [location, setLocation] = useState({ lat: null, lng: null }); // 유저의 중심 위치를 위한 상태
  const [productInfo, setProductInfo] = useState(null);
  const [center, setCenter] = useState(location); // 지도의 중심 위치를 위한 상태

  const geocoder = useRef(null);

  // 지오코더 초기화
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      geocoder.current = new window.kakao.maps.services.Geocoder();
    }
  }, []);

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

  useEffect(() => {
    if (!sendAddress) return;
    geocoder.current.addressSearch(sendAddress, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = {
          lat: result[0].y,
          lng: result[0].x,
        };
        setLocation(coords);
        setCenter(coords);

        searchDetailAddrFromCoords(coords, (result2, status2) => {
          if (status2 === window.kakao.maps.services.Status.OK) {
            const detailAddr = [
              result2[0].road_address?.address_name,
              result2[0].address?.address_name,
            ];
            onLocationSelect(coords, detailAddr);
          }
        });
      }
    });
  }, [sendAddress]);

  function searchDetailAddrFromCoords(coords, callback) {
    if (coords === null) return;

    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.current.coord2Address(
      coords?.getLng?.() ?? coords.lng,
      coords?.getLat?.() ?? coords.lat,
      callback,
    );
  }

  // productList: MapProductModal 닫기 기능
  // locationPicker: 위치 선택 모드에서 지도 클릭 시 위치 선택
  const handleClickMap = (_, mouseEvent) => {
    if (mode === 'productList') {
      setProductInfo(null);
    } else if (mode === 'locationPicker') {
      // 위치 선택 모드에서는 클릭한 위치 좌표를 상위 컴포넌트로 전달
      const latlng = mouseEvent.latLng;
      const newLocation = {
        lat: latlng.getLat(),
        lng: latlng.getLng(),
      };

      searchDetailAddrFromCoords(latlng, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const detailAddr = [
            result[0].road_address?.address_name,
            result[0].address?.address_name,
          ];
          if (onLocationSelect) {
            onLocationSelect(newLocation, detailAddr);
          }
          setLocation(newLocation);
          setCenter(newLocation);
        }
      });
    }
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
        {mode === 'locationPicker' && <MapMarker position={location} />}
      </Map>
    </div>
  );
};

export default KakaoMap;
