// Packages
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

// App
import Button from 'shared/components/Button';
import Container from 'shared/components/Container';
import EmptyState from 'shared/components/EmptyState';
import Icon from 'shared/components/Icon'
import Link from 'shared/components/Link';
import QuantitySelector from "features/catalog/components/QuantitySelector";
import { formatCurrency } from 'shared/utils/formatCurrency';
import { useCatalog } from 'features/catalog/hooks/useCatalog.js';
import { useCart } from 'features/cart/hooks/useCart';

// Styles
import './styles.scss';

function ProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    addItem,
    isInCart,
    items,
    removeItem,
    updateQuantity,
  } = useCart();

  const { data, isLoading, error } = useCatalog({ query: `isbn:${productId}` });

  const handleOnAddItemClick = book => {
    addItem({ ...book, quantity: 1 });
    toast.success(`Added "${book.title}" to cart!`);
  };

  const handleGoBackClick = () => {
    navigate(-1);
  }

  const handleRemoveItem = id => {
    removeItem(id)
  }

  const handleQuantityChange = (bookId, newQuantity) => {
    updateQuantity(bookId, newQuantity);
  };

  if (isLoading) return <p>Cargando libro...</p>;
  if (error) return <p>Error: {String(error.message)}</p>;

  const book = data?.items[0];

  if (!book) {
    return (
      <Container className="product">
        <Link className='product-detail__goBack' onClick={handleGoBackClick} variant='link'>
          <Icon className='product-detail__goBack-icon' name='chevron' /> Volver
        </Link>
        <EmptyState
          link='/catalog'
          subtitle='Intenta con otro ejemplar o intentalo más tarde'
          title='Algo salió mal'
        />
      </Container>
    );
  }

  return (
    <Container className="product">
      <div className="product-detail">
        <Link className='product-detail__goBack' onClick={handleGoBackClick} variant='link'>
          <Icon className='product-detail__goBack-icon' name='chevron' /> Volver
        </Link>

        <section className="product-detail__main">
          <div className="product-detail__image">
            {book.thumbnail && (<img src={book.thumbnail} alt={book.title} />)}
          </div>

          <div className="product-detail__info">
            <p className="product-detail__category">
              <Icon className='' name='tag' />
              {book.categories?.join(', ')}
            </p>
            <h1 className="product-detail__title">{book.title}</h1>
            <p className="product-detail__author">{book.authors?.join(', ')}</p>

            <div className="product-detail__price-row">
              <p className="product-detail__price">{formatCurrency(book.price)}</p>
            </div>
            {book.description && (
              <div className='product-detail__description'>
                <p className="product-detail__description-title">Sinopsis:</p>
                <p className="product-detail__description-text">
                  {book.description}
                </p>
              </div>
            )}


            <div className="product-detail__actions">
              {isInCart(book.id) ? (
                <>
                  <div className="quantity-selector">
                    <QuantitySelector
                      numOrder={items.find(item => item.id === book?.id)?.quantity || 1}
                      onChange={(newQuantity) => handleQuantityChange(book?.id, newQuantity)}
                    />
                  </div>
                  <Button onClick={() => handleRemoveItem(book.id)}>
                    <Icon className='' name='trash' />
                  </Button>
                </>
              ) : (
                <Button onClick={() => handleOnAddItemClick(book)}>Añadir al carrito</Button>
              )}
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}

export default ProductPage;