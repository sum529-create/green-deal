import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import React, { useEffect, useState, Fragment } from 'react';
import Button from '../common/Button';
import KakaoMap from '../KakaoMap/KakaoMap';
import Input from '../common/Input';

const LOAD_ADDRESS_STYLES = 'text-text-sm text-deep-gray';

const ProductMapModal = ({ isOpen, onClose, onSelectLocation }) => {
  const [address, setAddress] = useState('');
  const [sendAddress, setSendAddress] = useState(''); // 검색할 주소
  const [addressArr, setAddressArr] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [roadAddress, lotAddress] = addressArr;

  // 카카오맵 스크립트 로드 및 초기화
  useEffect(() => {
    if (!isOpen) return;

    return () => {
      // 모달이 닫힐 때 상태 초기화
      setAddressArr([]);
      setSelectedLocation(null);
    };
  }, [isOpen]);

  // 지도 클릭 이벤트 핸들러
  const handleLocationSelect = (location, address) => {
    setAddressArr(address);
    setSelectedLocation(location);
    onSelectLocation(location, address[0] || address[1]);
  };

  // 주소 검색 함수
  const searchAddress = () => {
    if (!address.trim()) return;

    setSendAddress(address);
  };

  // 위치 선택 취소
  const cancelLocation = () => {
    setSelectedLocation(null);
    setAddress('');
    onSelectLocation({ lat: null, lng: null }, '');
    onClose();
  };

  // 위치 선택 완료
  const confirmLocation = () => {
    setSendAddress('');
    onClose();
  };

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
                    <Input
                      type="text"
                      placeholder="도로명 주소를 입력하세요"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && searchAddress()}
                    />
                    <Button onClick={searchAddress}>검색</Button>
                  </div>
                </div>

                {/* 카카오맵 */}
                <div className="w-full mb-4 border border-gray h-80 rounded-xl">
                  <KakaoMap
                    level={3}
                    mode={'locationPicker'}
                    onLocationSelect={handleLocationSelect}
                    sendAddress={sendAddress}
                  />
                </div>

                {/* 선택된 위치 */}
                {selectedLocation && (
                  <div className="p-4 mb-4 bg-light-mint bg-opacity-20 rounded-xl">
                    <h3 className="mb-1 font-medium text-text-md text-deep-gray">
                      선택한 위치
                    </h3>
                    <p className={LOAD_ADDRESS_STYLES}>
                      <span className="font-semibold">도로명 주소</span>:{' '}
                      {roadAddress || '주소 정보 없음'}
                    </p>
                    <p className={LOAD_ADDRESS_STYLES}>
                      <span className="font-semibold">지번 주소</span>:{' '}
                      {lotAddress || '주소 정보 없음'}
                    </p>
                  </div>
                )}

                {/* 하단 버튼 */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={cancelLocation}>
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
