// Packages
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

// App
import Button from 'shared/components/Button';
import Container from 'shared/components/Container';
import EmptyState from 'shared/components/EmptyState';
import Icon from 'shared/components/Icon'
import Link from 'shared/components/Link';
import QuantitySelector from "features/catalog/components/QuantitySelector";
import { formatCurrency } from 'shared/utils/formatCurrency';
import { useCart } from 'features/cart/hooks/useCart';

// Styles
import './styles.scss';

function ProductPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { productId } = useParams();
  const navigate = useNavigate();
  const {
    addItem,
    isInCart,
    items,
    removeItem,
    updateQuantity,
  } = useCart();

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    axios.get(`${API_URL}/ms-books-catalogue/books/${productId}`)
      .then(response => {
        setBook(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error while fetching books", error);
        setBook({});
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Cargando libro...</p>;

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
            {book.coverImg && (<img src={book.coverImg} alt={book.title} />)}
          </div>

          <div className="product-detail__info">
            <p className="product-detail__category">
              <Icon className='' name='tag' />
              {book.categories?.map(category => category.description).join(', ')}
            </p>
            <h1 className="product-detail__title">{book.title}</h1>
            <p className="product-detail__author">{book.authors?.map(author => author.name).join(', ')}</p>

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