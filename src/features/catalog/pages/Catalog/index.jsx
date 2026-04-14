import { useEffect, useState } from 'react';
import axios from 'axios';

// App
import Container from 'shared/components/Container';
import BookList from 'features/catalog/components/BookList';

// Styles
import './styles.scss';
import { DEFAULT_PAGE_SIZE } from './constants';

function CatalogPage() {
    const [page, setPage] = useState(0);
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadMore = () => {
        setIsLoading(true);
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        let ignore = false;
        setTimeout(() => {
            axios.get('/mock.json')
                .then(response => {
                    if (!ignore) {
                        const allBooks = response.data.books || [];
                        const startIndex = page * DEFAULT_PAGE_SIZE;
                        const endIndex = startIndex + DEFAULT_PAGE_SIZE;
                        const pagedBooks = allBooks.slice(startIndex, endIndex);

                        setBooks(prevBooks => {
                            // Validamos no duplicar libros en caso del strict mode de React
                            const newBooks = pagedBooks.filter(b => !prevBooks.some(pb => pb.id === b.id));
                            return [...prevBooks, ...newBooks];
                        });
                        setIsLoading(false);
                    }
                })
                .catch(error => {
                    if (!ignore) {
                        console.error("Error while fetching books", error);
                        setIsLoading(false);
                    }
                });
        }, 800); // Simulando red lenta

        return () => {
            ignore = true;
        };
    }, [page]);

    return (
        <Container className="catalog">
            <h1>CATALOGO</h1>
            <div className='catalog__content'>
                <BookList books={books} loadMore={loadMore} isLoading={isLoading} />
            </div>
        </Container>
    )
}

export default CatalogPage;
