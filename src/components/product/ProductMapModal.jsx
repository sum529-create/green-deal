import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import React, { useEffect, useState, useRef, Fragment } from 'react';
import Button from '../common/Button';

const ProductMapModal = ({ isOpen, onClose, onSelectLocation }) => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [address, setAddress] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);

  // 카카오맵 스크립트 로드 및 초기화
  useEffect(() => {
    if (!isOpen) return;

    // 이미 스크립트가 로드되어 있는지 확인
    if (window.kakao && window.kakao.maps) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은_API_키&libraries=services&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        initializeMap();
      });
    };

    return () => {
      // 모달이 닫힐 때 상태 초기화
      setAddress('');
      setSelectedLocation(null);
    };
  }, [isOpen]);

  // 지도 초기화
  const initializeMap = () => {
    if (!mapContainer.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 서울 시청
      level: 3,
    };

    const mapInstance = new window.kakao.maps.Map(
      mapContainer.current,
      options,
    );
    setMap(mapInstance);

    // 지도 클릭 이벤트 등록
    window.kakao.maps.event.addListener(mapInstance, 'click', (mouseEvent) => {
      handleMapClick(mouseEvent);
    });
  };

  // 지도 클릭 이벤트 핸들러
  const handleMapClick = (mouseEvent) => {};

  // 주소 검색 함수
  const searchAddress = () => {};

  // 위치 선택 완료
  const confirmLocation = () => {};

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* 배경 오버레이 */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </TransitionChild>

        {/* 모달 */}
        <div
          className="fixed inset-0 overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-center min-h-full p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md p-6 overflow-hidden transition-all transform bg-white shadow-xl rounded-2xl">
                <DialogTitle
                  as="h3"
                  className="mb-4 font-medium text-center text-title-sm text-deep-gray"
                >
                  위치 검색
                </DialogTitle>

                {/* 검색창 */}
                <div className="mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="주소를 입력하세요"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="flex-1 px-3 py-2 border rounded-lg border-gray focus:outline-none focus:ring-2 focus:ring-mint text-text-md"
                      onKeyDown={(e) => e.key === 'Enter' && searchAddress()}
                    />
                    <Button onClick={searchAddress}>검색</Button>
                  </div>
                </div>

                {/* 카카오맵 */}
                <div
                  ref={mapContainer}
                  className="w-full mb-4 border border-gray h-80 rounded-xl"
                ></div>

                {/* 선택된 위치 */}
                {selectedLocation && (
                  <div className="p-4 mb-4 bg-light-mint bg-opacity-20 rounded-xl">
                    <h3 className="mb-1 font-medium text-text-md text-deep-gray">
                      선택한 위치
                    </h3>
                    <p className="text-text-sm text-deep-gray">
                      {selectedLocation.address}
                    </p>
                  </div>
                )}

                {/* 하단 버튼 */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={onClose}>
                    취소
                  </Button>
                  <Button
                    onClick={confirmLocation}
                    disabled={!selectedLocation}
                    variant={!selectedLocation ? 'disabled' : 'primary'}
                  >
                    선택 완료
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ProductMapModal;
