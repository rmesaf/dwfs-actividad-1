import { useEffect, useState } from 'react';
import axios from 'axios';

// App
import Container from 'shared/components/Container';
import Filters from 'features/catalog/components/Filters';
import BookList from 'features/catalog/components/BookList';

// Styles
import './styles.scss';
import { formatQueryParams } from './helpers';
import { DEFAULT_PAGE_SIZE } from './constants';

function CatalogPage() {
    const [page, setPage] = useState(0);
    const [appliedFilters, setAppliedFilters] = useState({});
    const [aggregations, setAggregations] = useState({});
    const [books, setBooks] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;
    const [isLoading, setIsLoading] = useState(true);

    const handleFiltersChange = (filterName, value) => {
        setIsLoading(true);
        setAppliedFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
        setPage(0);
        setBooks([]);
    };

    const handleApplyFilters = filters => {
        setIsLoading(true);
        setAppliedFilters(filters);
        setPage(0);
        setBooks([]);
    };

    const handleResetFilters = () => {
        setIsLoading(true);
        setAppliedFilters({});
        setPage(0);
        setBooks([]);
    };

    const loadMore = () => {
        setIsLoading(true);
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        let ignore = false;

        axios.get(`${API_URL}/ms-books-catalogue/books?${formatQueryParams({ ...appliedFilters, page, pageSize: DEFAULT_PAGE_SIZE })}`)
            .then(response => {
                if (!ignore) {
                    setAggregations(response.data.aggs);
                    setBooks(prevBooks => [...prevBooks, ...response.data.books]);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                if (!ignore) {
                    console.error("Error while fetching books", error);
                    setAggregations({});
                    setBooks([]);
                    setIsLoading(false);
                }
            });

        return () => {
            ignore = true;
        };
    }, [appliedFilters, page, API_URL]);

    return (
        <Container className="catalog">
            <h1>CATALOGO</h1>
            <div className='catalog__content'>
                <div className='catalog__agreggates'>
                    <Filters
                        aggregations={aggregations}
                        filters={appliedFilters}
                        onApplyFilters={handleApplyFilters}
                        onFiltersChange={handleFiltersChange}
                        onResetFilters={handleResetFilters}
                        isLoading={isLoading}
                    />
                </div>
                <BookList books={books} loadMore={loadMore} isLoading={isLoading} />
            </div>
        </Container>
    )
}

export default CatalogPage
