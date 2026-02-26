// @Packages
import Skeleton from 'react-loading-skeleton';


const FiltersSkeletons = () => {
    return Array.from({ length: 3 }).map((_, index) => (
        <div key={`filter-skeleton-${index}`} style={{ marginBottom: '16px' }}>
            <Skeleton height={24} width="60%" style={{ marginBottom: '8px' }} />
            <Skeleton height={2} style={{ marginBottom: '12px' }} />
            <Skeleton count={4} height={20} style={{ marginBottom: '8px' }} />
        </div>
    ));
};

export default FiltersSkeletons;

