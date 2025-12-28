// Packages
import React from 'react';
import { useSearchParams } from 'react-router-dom';

// App
import Container from 'shared/components/Container';
import Link from 'shared/components/Link';
import useCatalog from 'features/catalog/hooks/useCatalog';

// Styles
import './styles.scss';

function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const { books, isLoading, error } = useCatalog({ query: 'subject:fiction' });

    if (isLoading) return <p>Cargando resultados...</p>;
    if (error) return <p>Error: {String(error.message)}</p>;

    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Container className="search-results">
            <h1>Resultados de búsqueda</h1>

            <p>
                Buscando: <strong>{query}</strong>
            </p>

            <Link to="/catalog">← Volver al catálogo</Link>

            {filteredBooks.length === 0 ? (
                <p>No se encontraron libros.</p>
            ) : (
                <ul className="search-results__list">
                    {filteredBooks.map((book) => (
                        <li key={book.id} className="search-results__item">
                            <h2>{book.title}</h2>
                            <p>Authors: {book.authors.join(', ')}</p>
                            <p>Price: ${book.price}</p>
                            <Link to={`/product/${book.id}`}>
                                Ver detalle
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </Container>
    );
}

export default SearchResultsPage;
