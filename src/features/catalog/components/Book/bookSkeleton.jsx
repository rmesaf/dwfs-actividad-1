import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import cn from 'classnames';
import '../Book/styles.scss';

function BookSkeleton({ className = '' }) {
    return (
        <li className={cn("book", className)}>
            <SkeletonTheme baseColor="#d9d9d9" highlightColor="#ececec">
                <div className="book__link" style={{ pointerEvents: 'none' }}>
                    <div className='book__img'>
                        <Skeleton height={200} />
                    </div>
                    <h2 className='book__title' style={{ marginBottom: '8px' }}>
                        <Skeleton count={2} />
                    </h2>
                    <p>
                        <Skeleton width="60%" />
                    </p>
                    <div className="book__info" style={{ marginTop: '16px', paddingBottom: '16px' }}>
                        <span>
                            <Skeleton width={40} />
                        </span>
                        <div className="book__info-rating">
                            <Skeleton width={40} />
                        </div>
                    </div>
                </div>
                <div className='book__actions'>
                    <div style={{ width: '100%', pointerEvents: 'none' }}>
                        <Skeleton height={40} borderRadius={8} />
                    </div>
                </div>
            </SkeletonTheme>
        </li>
    );
}

export default BookSkeleton;
