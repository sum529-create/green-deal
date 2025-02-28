import React, { useState } from 'react';
import ProductImageUpload from '../components/product/ProductImageUpload';
import ProductForm from '../components/product/ProductForm';
import { upsertData } from '../utils/upsertData';
import { INITIAL_ADD_PRODUCT_DATA } from '../constants/constants';
import { supabase } from '../api/client';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

const ProductRegistration = () => {
  // 상태 관리
  const [product, setProduct] = useState(INITIAL_ADD_PRODUCT_DATA);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  async function checkAuth() {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Error fetching user:', error);
    } else {
      console.log('Current user ID:', user?.id);
    }
  }

  checkAuth();

  const handleImageChange = (newImg) => {
    setProduct((value) => ({
      ...value,
      img: newImg,
    }));
  };
  const handleProductChange = (product) => {
    setProduct((value) => ({
      ...value,
      ...product,
    }));
  };

  const handleSubmit = async () => {
    if (!product.location) {
      alert('거래위치를 등록해주세요');
      return;
    }

    try {
      // 이미지 업로드
      const file = product.img;
      const timestamp = Date.now();
      const fileExt = file.name.split('.').pop();
      const fileName = `product_${user.id + timestamp}.${fileExt}`; // 임시 파일명
      const filePath = `products/${fileName}`;

      const { error: uploadStgError } = await supabase.storage
        .from('productsImg')
        .upload(filePath, file, { upsert: true });

      if (uploadStgError) {
        throw new Error('이미지 업로드 실패: ' + uploadStgError.message);
      }

      const imgUrl = `${import.meta.env.VITE_APP_SUPABASE_STORAGE_URL}/${filePath}`;

      // 새 product 객체 생성 (상태 업데이트 없이)
      const updatedProduct = {
        ...product,
        img: imgUrl,
        user_id: user.id,
      };

      // 업데이트된 상품 데이터 업로드
      await upsertData(updatedProduct, 'products');
      console.log('제품 등록 데이터:', updatedProduct);

      handleImageChange(imgUrl);

      // navigate('/products');
    } catch (error) {
      console.error('상품 등록 실패:', error.message);
      alert('상품 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-row">
        {/* 좌측 - 이미지 등록 영역 */}
        <div className="w-1/3 p-[3.125rem] bg-light-gray">
          {/* 이미지 영역 */}
          <ProductImageUpload
            image={product.img}
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
    </div>
  );
};

export default ProductRegistration;
