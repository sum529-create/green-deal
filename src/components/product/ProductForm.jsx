import React from 'react';
import Button from '../common/Button';
import ProductMapModal from './ProductMapModal';
import Label from '../common/Label';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_QUALITY,
  PRODUCT_REFUND,
} from '../../constants/productConstants';
import { useProductForm } from '../../hooks/useProductForm';
import { useState, useRef, useEffect } from 'react';
import { useKakaoGeocoder } from '../../hooks/useKakaoGeocoder';

const ProductForm = ({ product, onChangeProduct, onSubmit, productId }) => {
  const FORM_INPUT_STYLE =
    'leading-[32.5px] text-lg border-2 border-[#BEBEBE] placeholder-[#BEBEBE]';
  const TEXT_AREA_STYLE =
    'min-h-[100px] border-2 border-[#BEBEBE] px-4 text-lg placeholder-[#BEBEBE]';
  const { name, price, quality, refund, category, description, location } =
    product;
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const { coordsToAddress } = useKakaoGeocoder();
  const {
    address,
    handleChange,
    handleSubmit,
    setAddress,
    handleSelectLocation,
  } = useProductForm(product, onChangeProduct);

  // 상품 수정 시, 위도경도를 받아 주소로 변환
  useEffect(() => {
    const getUserAddress = async () => {
      try {
        const detailAddr = await coordsToAddress(location);
        const [roadAddress, lotAddress] = detailAddr;

        setAddress(roadAddress || lotAddress);
      } catch (error) {
        alert('주소를 찾을 수 없습니다.');
        console.error(error);
      }
    };
    if (productId && location.lat && location.lng) {
      getUserAddress();
    }
  }, [productId, location]);

  // Input ref들
  const nameInputRef = useRef(null);
  const priceInputRef = useRef(null);

  // 위치 추가 모달 열기
  const openLocationModal = () => {
    setIsLocationModalOpen(true);
  };

  // input focus 이벤트 핸들러
  const autoFocusHandler = () => {
    if (!name) {
      return nameInputRef.current.focus();
    }
    if (!price) {
      return priceInputRef.current.focus();
    }
  };

  return (
    <>
      <form
        className="space-y-5 min-w-[500px] mx-auto my-0"
        onSubmit={(e) => {
          handleSubmit(e);
          autoFocusHandler();
          onSubmit();
        }}
      >
        {/* 판매물품 */}
        <div>
          <Label>판매 물품</Label>
          <Input
            ref={nameInputRef}
            type="text"
            value={name}
            name="name"
            onChange={handleChange}
            placeholder="제목"
            className={`${FORM_INPUT_STYLE} pl-4`}
          />
        </div>

        {/* 판매금액 */}
        <div>
          <Label>판매 금액</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
              ₩
            </span>
            <Input
              ref={priceInputRef}
              type="text"
              value={price}
              name="price"
              inputMode="numeric"
              onChange={handleChange}
              placeholder="판매금액"
              className={`pl-9 ${FORM_INPUT_STYLE}`}
            />
          </div>
        </div>

        <div className="flex gap-4">
          {/* 물품상태 */}
          <div className="flex-1">
            <Label>물품 상태</Label>
            <Select value={quality} name="quality" onChange={handleChange}>
              {PRODUCT_QUALITY.map((quality) => (
                <option value={quality} key={quality}>
                  {quality}
                </option>
              ))}
            </Select>
          </div>

          {/* 교환 가능 여부 */}
          <div className="flex-1">
            <Label>교환 가능 여부</Label>
            <Select value={refund} name="refund" onChange={handleChange}>
              {PRODUCT_REFUND.map((refund) => (
                <option
                  value={Object.values(refund)}
                  key={Object.values(refund)}
                >
                  {Object.keys(refund)}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* 카테고리 */}
        <div>
          <Label>카테 고리</Label>
          <Select value={category} name="category" onChange={handleChange}>
            {PRODUCT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </div>

        {/* 상품 설명 */}
        <div>
          <Label>상품 설명</Label>
          <TextArea
            value={description}
            name="description"
            onChange={handleChange}
            placeholder="상품에 대한 설명을 입력하세요"
            className={TEXT_AREA_STYLE}
          />
        </div>

        {/* 거래위치 */}
        <div className="flex items-center justify-between">
          <Label>거래 위치</Label>
          <span>{address}</span>
          <Button onClick={openLocationModal} variant="outline" size="medium">
            {address ? '변경' : '추가'}
          </Button>
        </div>

        {/* 등록 버튼 */}
        <div className="flex justify-center pt-11">
          <Button type="submit" size="large">
            상품 {productId ? '수정' : '등록'}
          </Button>
        </div>
      </form>
      {/* 거래 위치 추가 모달 */}
      <ProductMapModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelectLocation={handleSelectLocation}
      />
    </>
  );
};

export default ProductForm;
