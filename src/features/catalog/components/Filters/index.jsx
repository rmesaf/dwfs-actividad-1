// App
import Button from 'shared/components/Button';

// Own
import './styles.scss';
import { normalizeAggregations } from "./helpers";
import FilterAsYouType from './FilterAsYouType';
import FilterInputText from './FilterInputText';
import FiltersSkeletons from './filtersSkeleton';
import MultiSelectButton from "./MultiSelectButton";

function Filters({
    aggregations,
    filters,
    onApplyFilters,
    onFiltersChange,
    onResetFilters,
    isLoading = false,
}) {
    const normalizedAggregations = normalizeAggregations(aggregations);
    const hasAggregations = normalizedAggregations.length > 0;
    const showContent = !isLoading && hasAggregations;

    return (
        <div className="filters">
            {isLoading ? <FiltersSkeletons /> : null}
            {showContent ? (
                <>
                    <FilterInputText
                        label="Búsqueda por título"
                        name="title"
                        placeholder="Buscar libros por título..."
                        value={filters.title || ''}
                        onChange={(val) => {
                            onFiltersChange('title', val);
                        }}
                    />
                    <FilterAsYouType
                        label="Búsqueda por descripción"
                        name="description"
                        placeholder="Buscar libros por descripción..."
                        value={filters.description || ''}
                        onChange={(val) => {
                            onFiltersChange('description', val);
                        }}
                    />
                </>
            ) : null}
            {showContent ? normalizedAggregations.map((aggregation, index) => (
                <>
                    <MultiSelectButton
                        key={index}
                        selectedOptions={filters[aggregation.name] || []}
                        onChange={onFiltersChange}
                        {...aggregation}
                    />
                </>
            )) : null}
            {showContent ? (
                <div className="filters__actions">
                    <Button className='filters__actions-item' style={isLoading ? { pointerEvents: 'none', opacity: 0.7 } : {}} onClick={onApplyFilters}>Filtrar</Button>
                    <Button className='filters__actions-item' style={isLoading ? { pointerEvents: 'none', opacity: 0.7 } : {}} onClick={onResetFilters} variant='outline'>Limpiar</Button>
                </div>
            ) : null}
        </div>
    )
}

export default Filters;