import { CustomOverlayMap } from 'react-kakao-maps-sdk';

const MyLocationMarker = ({ location }) => {
  return (
    <CustomOverlayMap position={location}>
      <div
        style={{
          width: '20px',
          height: '20px',
          backgroundColor: '#DD0025',
          borderRadius: '50%',
          border: '2px solid white',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)',
        }}
      />
    </CustomOverlayMap>
  );
};

export default MyLocationMarker;
