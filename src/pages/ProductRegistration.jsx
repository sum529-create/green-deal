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
    resetProduct,
  } = useProductRegistration(onSuccess, productId);

  const { data: productData, error: productError } =
    useGetProductDetail(productId);

  useEffect(() => {
    if (!productId) resetProduct();
    else if (productId) {
      if (productData) {
        handleProductChange(productData);
      }

      if (productError) {
        alert('상품 정보를 불러오는 데 실패했습니다.');
        console.error(productError);
      }
    }
  }, [productId, productData, productError]);

  return (
    <div className="flex flex-wrap items-center content-start justify-center h-screen max-h-[calc(100vh_-_60px)] relative mt-[60px]">
      <div className="flex items-center justify-around w-full h-full max-w-screen-xl p-8 mx-auto my-0 ">
        <div className="flex sm:gap-4 md:gap-8 lg:gap-[138px]">
          {/* 좌측 - 이미지 등록 영역 */}
          <div className="w-[25rem] h-[36.25rem] p-[3.125rem] bg-light-gray mt-[30px]">
            {/* 이미지 영역 */}
            <ProductImageUpload
              onChangeImage={handleImageChange}
              productId={productId}
              productImg={product?.img}
            />
          </div>

          {/* 우측 - 폼 영역 */}
          <div>
            <ProductForm
              product={product}
              onChangeProduct={handleProductChange}
              onSubmit={handleSubmit}
              productId={productId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRegistration;
