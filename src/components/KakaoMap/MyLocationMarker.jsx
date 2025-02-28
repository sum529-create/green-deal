import { MapMarker } from 'react-kakao-maps-sdk';

const MyLocationMarker = ({ location }) => {
  return (
    <div>
      <MapMarker
        position={location} // ip 기반으로 현재 내 위치 지정
        image={{
          src: 'https://cdn-static.zep.us/static/assets/baked-avartar-images/10-35-3-253.png', // 프로필 사진 들어갈 예정
          size: {
            width: 39,
            height: 39,
          },
          options: {
            offset: {
              x: 27,
              y: 69,
            },
          },
        }}
      />
    </div>
  );
};

export default MyLocationMarker;
