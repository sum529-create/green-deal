import React from 'react';
import { useState } from 'react';
import Button from '../common/Button';
import { useEffect } from 'react';
import ProductMapModal from './ProductMapModal';
import Label from '../ui/Label';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_QUALITY,
  PRODUCT_REFUND,
} from '../../constants/productConstants';

const ProductForm = ({ product, onChangeProduct, onSubmit }) => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const { name, price, quality, refund, category, description } = product;

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue;
    if (name === 'price') {
      newValue = Number(value.replace(/[^\d]/g, ''));
    } else if (name === 'refund') {
      newValue = JSON.parse(value.toLowerCase());
    } else {
      newValue = value;
    }

    onChangeProduct({
      [name]: newValue,
    });
  };

  useEffect(() => {
    console.log('변경된 location:', product.location);
  }, [product.location]);

  // 위치 추가 모달 열기
  const openLocationModal = () => {
    setIsLocationModalOpen(true);
    onChangeProduct({
      location: JSON.stringify({ lat: 33.450701, lng: 126.570667 }),
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 필수 필드 검증
    if (!name.trim()) {
      alert('판매 물품을 입력하세요');
      return;
    }
    if (!price) {
      alert('판매 금액을 입력하세요');
      return;
    }
    if (!quality) {
      alert('물품 상태를 선택하세요');
      return;
    }
    if (refund === '') {
      alert('교환 가능 여부를 선택하세요');
      return;
    }
    if (!category) {
      alert('카테고리를 선택하세요');
      return;
    }
    if (!description.trim()) {
      alert('상품 설명을 입력하세요');
      return;
    }

    onSubmit();
  };

  const handleSelectLocation = (location) => {
    console.log(location);
  };
  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* 판매물품 */}
        <div>
          <Label>판매 물품</Label>
          <Input
            type="text"
            value={name}
            name="name"
            onChange={handleChange}
            placeholder="제목"
          />
        </div>

        {/* 판매금액 */}
        <div>
          <Label>판매 금액</Label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              ₩
            </span>
            <Input
              type="text"
              value={price}
              name="price"
              inputMode="numeric"
              onChange={handleChange}
              placeholder="판매금액"
              className="pl-7"
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
              {PRODUCT_REFUND.map((refunc) => (
                <option
                  value={Object.values(refunc)}
                  key={Object.values(refunc)}
                >
                  {Object.keys(refunc)}
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
          />
        </div>

        {/* 거래위치 */}
        <div className="flex items-center justify-between">
          <Label>거래 위치</Label>
          <Button onClick={openLocationModal} variant="outline" size="medium">
            추가
          </Button>
        </div>

        {/* 등록 버튼 */}
        <div className="flex justify-center pt-4">
          <Button type="submit" size="large">
            상품 등록
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
