import React, { useState, useEffect } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { getUserLocation } from '../../utils/getUserLocation';

const KakaoMap = ({ level, mode }) => {
  const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 });

  useEffect(() => {
    getUserLocation()
      .then((coords) => setLocation(coords))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="w-full h-full">
      <Map
        center={location}
        level={level}
        style={{ width: '100%', height: '100%' }}
      >
        {mode === 'productList' && (
          <div>
            <MapMarker position={location}>
              <div>아이폰 팔아요</div>
            </MapMarker>
          </div>
        )}
      </Map>
    </div>
  );
};

export default KakaoMap;
