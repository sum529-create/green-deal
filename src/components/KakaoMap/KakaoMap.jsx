import React, { useState, useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { getUserLocation } from '../../utils/getUserLocation';

const KakaoMap = ({ width, height }) => {
  const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 });

  useEffect(() => {
    getUserLocation()
      .then((coords) => setLocation(coords))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Map
      center={location}
      className="w-full h-full"
      style={{ width, height }}
      level={3}
    />
  );
};

export default KakaoMap;
