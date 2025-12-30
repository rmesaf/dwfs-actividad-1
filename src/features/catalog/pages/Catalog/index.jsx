
// App
import Book from 'features/catalog/components/Book';
import Container from 'shared/components/Container';
import { useCatalog } from 'features/catalog/hooks/useCatalog';

// Styles
import './styles.scss'

function CatalogPage() {
    const { books, isLoading, error } = useCatalog({ query: 'subject:fiction' });
    
    if (isLoading) return <p>Cargando catálogo...</p>;
    if (error) return <p>Error: {String(error.message)}</p>;

    return (
        <Container className="catalog">
            <h1>Destacados</h1>
            <ul className="catalog__list">
                {books.map((book) => (
                    <Book className="catalog__list-item" key={book.id} book={book} />
                ))}
            </ul>
        </Container>
    )
}

export default CatalogPage
