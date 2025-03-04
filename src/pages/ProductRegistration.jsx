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
      navigate('/products');
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
    <div className="flex flex-wrap items-center content-start justify-center max-h-[calc(100vh_-_60px)] relative mt-[60px] overflow-x-hidden">
      <div className="flex items-start justify-center w-full max-w-screen-xl p-4 mx-auto my-0 xl:pt-[140px] sm:p-6 lg:p-8">
        <div className="flex flex-col w-full gap-8 lg:gap-[138px] xl:flex-row">
          {/* 좌측 - 이미지 등록 영역 */}
          <div className="w-full xl:w-[25rem] h-auto xl:h-[36.25rem] p-4 sm:p-[3.125rem] bg-light-gray mt-4 sm:mt-[30px] mx-auto">
            {/* 이미지 영역 */}
            <ProductImageUpload
              onChangeImage={handleImageChange}
              productId={productId}
              productImg={product?.img}
            />
          </div>

          {/* 우측 - 폼 영역 */}
          <div className="w-full mt-8 xl:flex-1 xl:mt-0">
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
