import React, { useState, useEffect } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { getUserLocation } from '../../utils/getUserLocation';
import { DUMMY_LISTS } from '../../constants/DUMMY_LISTS';

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
            {DUMMY_LISTS.map((product) => {
              return (
                <MapMarker
                  key={product.id}
                  position={product.location}
                ></MapMarker>
              );
            })}
          </div>
        )}
      </Map>
    </div>
  );
};

export default KakaoMap;
