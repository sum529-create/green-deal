import React from 'react';
import { useState } from 'react';
import Button from '../common/Button';
import { PRODUCT_CATEGORIES } from '../../constants/constants';

const ProductForm = ({ product, onChangeProduct, onSubmit }) => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const {
    title,
    price,
    condition,
    exchangeable,
    category,
    description,
    location,
  } = product;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === 'price' ? e.target.value.replace(/[^\d]/g, '') : value;
    onChangeProduct({
      [name]: newValue,
    });
  };

  // 위치 추가 모달 열기
  const openLocationModal = () => {
    setIsLocationModalOpen(true);
  };

  // 폼 제출 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    // 필수 필드 검증
    if (!title.trim()) {
      alert('판매 물품명을 입력하세요');
      return;
    }
    if (!price) {
      alert('판매 금액을 입력하세요');
      return;
    }
    if (!condition) {
      alert('물품 상태를 선택하세요');
      return;
    }
    if (!exchangeable) {
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
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* 판매물품 */}
      <div>
        <label className="block mb-1 text-lg font-medium text-deep-gray">
          판매 물품
        </label>
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleChange}
          placeholder="제목"
          className="w-full p-2 border rounded-[10px] border-gray focus:outline-none focus:ring-1 focus:ring-graish-green"
        />
      </div>

      {/* 판매금액 */}
      <div>
        <label className="block mb-1 text-lg font-medium text-deep-gray">
          판매 금액
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            ₩
          </span>
          <input
            type="text"
            value={price}
            name="price"
            inputMode="numeric"
            onChange={handleChange}
            placeholder="판매금액"
            className="w-full p-2 border rounded-[10px] border-gray pl-7 focus:outline-none focus:ring-1 focus:ring-graish-green"
          />
        </div>
      </div>

      <div className="flex gap-4">
        {/* 물품상태 */}
        <div className="flex-1">
          <label className="block mb-1 text-lg font-medium text-deep-gray">
            물품 상태
          </label>
          <select
            value={condition}
            name="condition"
            onChange={handleChange}
            className="w-full p-2 border rounded-[10px] border-gray focus:outline-none focus:ring-1 focus:ring-graish-green"
          >
            <option value="">선택해주세요</option>
            <option value="mint">최상</option>
            <option value="excellent">상</option>
            <option value="good">중상</option>
            <option value="fair">보통</option>
            <option value="average">중하</option>
            <option value="poor">하</option>
            <option value="bad">최하</option>
          </select>
        </div>

        {/* 교환 가능 여부 */}
        <div className="flex-1">
          <label className="block mb-1 text-lg font-medium text-deep-gray">
            교환 가능 여부
          </label>
          <select
            value={exchangeable}
            name="exchangeable"
            onChange={handleChange}
            className="w-full p-2 border rounded-[10px] border-gray focus:outline-none focus:ring-1 focus:ring-graish-green"
          >
            <option value="">선택하세요</option>
            <option value="yes">교환 가능</option>
            <option value="no">교환 불가능</option>
          </select>
        </div>
      </div>

      {/* 카테고리 */}
      <div>
        <label className="block mb-1 text-lg font-medium text-deep-gray">
          카테 고리
        </label>
        <select
          value={category}
          name="category"
          onChange={handleChange}
          className="w-full p-2 border rounded-[10px] border-gray focus:outline-none focus:ring-1 focus:ring-graish-green"
        >
          <option value="">선택하세요</option>
          {PRODUCT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* 상품 설명 */}
      <div>
        <label className="block mb-1 text-lg font-medium text-deep-gray">
          상품 설명
        </label>
        <textarea
          value={description}
          name="description"
          onChange={handleChange}
          placeholder="상품에 대한 설명을 입력하세요"
          className="w-full h-24 p-2 border rounded-[10px] resize-none border-gray focus:outline-none focus:ring-1 focus:ring-graish-green"
        ></textarea>
      </div>

      {/* 거래위치 */}
      <div className="flex items-center justify-between">
        <label className="block mb-1 text-lg font-medium text-deep-gray">
          거래 위치
        </label>
        <Button onClick={openLocationModal} variant="outline" size="medium">
          추가
        </Button>

        {location && (
          <span className="ml-3 text-sm text-gray-600">{location}</span>
        )}
      </div>

      {/* 등록 버튼 */}
      <div className="flex justify-center pt-4">
        <Button type="submit" size="large">
          상품 등록
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
