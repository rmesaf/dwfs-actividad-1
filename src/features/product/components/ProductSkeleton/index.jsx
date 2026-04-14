import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Icon from 'shared/components/Icon';
import Link from 'shared/components/Link';

import 'react-loading-skeleton/dist/skeleton.css';

function ProductSkeleton() {
  return (
    <SkeletonTheme baseColor="#d9d9d9" highlightColor="#ececec">
      <div className="product-detail">
        <Link className='product-detail__goBack' variant='link' style={{ pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
          <Icon className='product-detail__goBack-icon' name='chevron' /> <Skeleton width={60} style={{ marginLeft: 4 }} />
        </Link>

        <section className="product-detail__main">
          <div className="product-detail__image">
            <div style={{ width: '100%', paddingBottom: '130%', position: 'relative' }}>
                <Skeleton style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 8 }} />
            </div>
          </div>

          <div className="product-detail__info">
            <p className="product-detail__category" style={{ display: 'flex', alignItems: 'center' }}>
              <Icon name='tag' />
              <Skeleton width={120} style={{ marginLeft: 4 }} />
            </p>
            
            <h1 className="product-detail__title">
              <Skeleton width="80%" height={32} />
            </h1>
            
            <p className="product-detail__author">
              <Skeleton width="50%" />
            </p>

            <div className="product-detail__price-row" style={{ marginTop: '0.5rem' }}>
              <Skeleton width={100} height={28} />
            </div>
            
            <div className='product-detail__description'>
              <p className="product-detail__description-title">
                <Skeleton width={80} />
              </p>
              <div className="product-detail__description-text" style={{ marginTop: '0.5rem' }}>
                <Skeleton count={6} />
              </div>
            </div>

            <div className="product-detail__actions">
              <Skeleton width={160} height={44} borderRadius={8} />
            </div>
          </div>
        </section>
      </div>
    </SkeletonTheme>
  );
}

export default ProductSkeleton;
