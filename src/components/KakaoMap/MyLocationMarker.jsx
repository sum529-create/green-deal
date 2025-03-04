import { MapMarker } from 'react-kakao-maps-sdk';
import { useUserData } from '../../hooks/useUserQuery';
import useUserStore from '../../store/userStore';

const MyLocationMarker = ({ location }) => {
  const user = useUserStore((state) => state.user);
  const { data } = useUserData(user?.user_metadata.sub);

  return (
    <div>
      <MapMarker
        position={location}
        image={{
          src: data?.profile_img || '/profile_default.png',
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
