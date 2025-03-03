import ProductImageUpload from '../components/product/ProductImageUpload';
import ProductForm from '../components/product/ProductForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useProductRegistration } from '../hooks/useProductRegistration';
import { useEffect } from 'react';
import { useGetProductDetail } from '../hooks/useProduct';

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
    <div className="flex flex-wrap content-start min-h-screen">
      <div className="flex flex-row w-full h-full max-w-screen-xl p-8 mx-auto my-0 items-center gap-[1rem]">
        {/* 좌측 - 이미지 등록 영역 */}
        <div className="w-[25rem] h-[36.25rem] p-[3.125rem] bg-light-gray">
          {/* 이미지 영역 */}
          <ProductImageUpload
            onChangeImage={handleImageChange}
            productId={productId}
            productImg={product?.img}
          />
        </div>

        {/* 우측 - 폼 영역 */}
        <div className="flex-1 p-6">
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
