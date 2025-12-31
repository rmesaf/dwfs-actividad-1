// Packages
import { useNavigate, useSearchParams } from 'react-router-dom';

// App
import Book from 'features/catalog/components/Book';
import Container from 'shared/components/Container';
import EmptyState from 'shared/components/EmptyState';
import Icon from 'shared/components/Icon'
import Link from 'shared/components/Link';
import { useCatalog } from 'features/catalog/hooks/useCatalog';

// Styles
import './styles.scss';

function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('q') || '';

    const { data, isLoading, error } = useCatalog({ query: `intitle:${query}` });

    const showEmptyState = data?.items?.length === 0;

    const handleGoBackClick = () => {
        navigate(-1);
    }

    if (isLoading) return <p>Cargando resultados...</p>;
    if (error) return <p>Error: {String(error.message)}</p>;

    if (showEmptyState) {
        return (
            <EmptyState
                subtitle="Intenta con otro título o revisa si lo escribiste correctamente."
                title="No hemos encontrado el libro solicitado"
            />
        );
    }

    return (
        <Container className="search-results">
            <Link className='product-detail__goBack' onClick={handleGoBackClick} variant='link'>
                <Icon className='product-detail__goBack-icon' name='chevron'/> Volver
            </Link>
            <div className='search-results__text'>
                <h1>RESULTADOS DE BÚSQUEDA:</h1>
                <p>
                    Encontramos <strong>{data?.totalItems}</strong> para la búsqueda: <strong>{query}</strong>
                </p>
            </div>
            <ul className="search-results__list">
                {data?.items.map(book => (
                    <Book className="search-results__list-item" key={book.id} book={book} />
                ))}
            </ul>
        </Container>
    );
}

export default SearchResultsPage;
