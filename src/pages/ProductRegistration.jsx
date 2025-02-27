import React, { useState } from 'react';
import ProductImageUpload from '../components/product/ProductImageUpload';
import ProductForm from '../components/product/ProductForm';

const ProductRegistration = () => {
  // 상태 관리
  const [product, setProduct] = useState({
    title: '',
    price: '',
    condition: '',
    exchangeable: '',
    category: '',
    description: '',
    location: '',
    image: null,
  });

  const {
    title,
    price,
    condition,
    exchangeable,
    category,
    description,
    location,
    image,
  } = product;

  const handleImageChange = (newImg) => {
    setProduct((value) => ({
      ...value,
      image: newImg,
    }));
  };
  const handleProductChange = (product) => {
    setProduct((value) => ({
      ...value,
      ...product,
    }));
  };

  const handleSubmit = () => {
    console.log('제품 등록 데이터:', {
      title,
      price,
      condition,
      exchangeable,
      category,
      description,
      location,
      image,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-row">
        {/* 좌측 - 이미지 등록 영역 */}
        <div className="w-1/3 p-[3.125rem] bg-light-gray">
          {/* 이미지 영역 */}
          <ProductImageUpload
            image={product.image}
            onChangeImage={handleImageChange}
          />
        </div>

        {/* 우측 - 폼 영역 */}
        <div className="w-2/3 p-6">
          <ProductForm
            product={product}
            onChangeProduct={handleProductChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      {/* 위치 선택 모달은 실제 구현 시 추가됩니다 */}
    </div>
  );
};

export default ProductRegistration;
