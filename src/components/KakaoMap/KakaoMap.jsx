import React, { useState, useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';
import { getUserLocation } from '../../utils/getUserLocation';

const KakaoMap = ({ level }) => {
  const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 });

  useEffect(() => {
    getUserLocation()
      .then((coords) => setLocation(coords))
      .catch((error) => console.error(error));
  }, []);

  return (
    <Map
      center={location}
      level={level}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default KakaoMap;
