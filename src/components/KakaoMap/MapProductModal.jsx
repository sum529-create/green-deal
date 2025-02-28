import { CustomOverlayMap } from 'react-kakao-maps-sdk';
import { Link } from 'react-router-dom';

const MapProductModal = ({ product, productInfo }) => {
  return (
    <div>
      {productInfo && productInfo.id === product.id && (
        <CustomOverlayMap
          position={product.location}
          yAnchor={1.4}
          clickable={true}
        >
          <Link
            to={`/product/detail/${product.id}`}
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backgroundColor: '#fff',
              border: '2px solid rgb(85 204 201)',
              borderRadius: '15px',
              color: '#000',
              textAlign: 'center',
              minWidth: '120px',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
              {product.name}
            </div>
            <div style={{ color: '#666', marginBottom: '5px' }}>
              {Number(product.price).toLocaleString()}원
            </div>
            <div style={{ fontSize: '12px', color: '#888' }}>
              {product.users.name}{' '}
              {new Date(product.createdAt)
                .toISOString()
                .slice(2, 10)
                .replace(/-/g, '.')}
            </div>
          </Link>
        </CustomOverlayMap>
      )}
    </div>
  );
};

export default MapProductModal;
