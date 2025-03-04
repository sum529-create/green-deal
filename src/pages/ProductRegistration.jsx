import ProductImageUpload from '../components/product/ProductImageUpload';
import ProductForm from '../components/product/ProductForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  useGetProductDetail,
  useProductRegistration,
} from '../hooks/useProduct';

const ProductRegistration = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const productId = searchParams.get('productId');

  const onSuccess = (data) => {
    if (data) {
      if (productId) {
        alert('상품이 수정되었습니다.');
      } else {
        alert('상품이 등록되었습니다.');
      }
      navigate('/product');
    }
  };

  const {
    product,
    error,
    handleImageChange,
    handleProductChange,
    handleSubmit,
  } = useProductRegistration(onSuccess, productId);

  const { data: productData, error: productError } =
    useGetProductDetail(productId);

  useEffect(() => {
    if (productData) {
      handleProductChange(productData);
    }

    if (productError) {
      alert('상품 정보를 불러오는 데 실패했습니다.');
      console.error(productError);
    }
  }, [productData, productError]);

  return (
    <div className="flex flex-wrap items-center content-start justify-center h-screen">
      <div className="flex flex-row items-center justify-around w-full h-full max-w-screen-xl p-8 mx-auto my-0">
        {/* 좌측 - 이미지 등록 영역 */}
        <div className="w-[25rem] h-[36.25rem] ml-5 p-[3.125rem] bg-light-gray">
          {/* 이미지 영역 */}
          <ProductImageUpload
            onChangeImage={handleImageChange}
            productId={productId}
            productImg={product?.img}
          />
        </div>

        {/* 우측 - 폼 영역 */}
        <div className="mr-5">
          <ProductForm
            product={product}
            onChangeProduct={handleProductChange}
            onSubmit={handleSubmit}
            productId={productId}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductRegistration;
