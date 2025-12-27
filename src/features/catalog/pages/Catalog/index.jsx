// Packages
import React, { useState } from 'react';
import { toast } from 'sonner';

// App
import Button from 'shared/components/Button';
import HeartButton from "features/catalog/components/HeartButton/index.jsx";
import Container from 'shared/components/Container';
import Link from "shared/components/Link";
import useCatalog from 'features/catalog/hooks/useCatalog.js';
import useCart from 'features/cart/hooks/useCart';
import quantitySelector from "features/catalog/components/QuantitySelector/index.jsx";

// Styles
import './styles.scss'
import Icon from "shared/components/Icon/index.jsx";
import QuantitySelector from "features/catalog/components/QuantitySelector/index.jsx";

function CatalogPage() {
    const { books, isLoading, error } = useCatalog({ query: 'subject:fiction' });
    const { addItem, items, updateQuantity, isInCart } = useCart();

    const [favorites, setFavorites] = useState(
        books.reduce((acc, book) => {
            acc[book.id] = book.isFavorite || false;
            return acc;
        }, {})
    );

    const toggleFavorite = (bookId) => {
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [bookId]: !prevFavorites[bookId],
        }));
    };

    const handleOnAddItemClick = (e, book) => {
        e.preventDefault();
        addItem({ ...book, quantity: 1 });
        toast.success(`Added "${book.title}" to cart!`);
    }

    const handleQuantityChange = (bookId, newQuantity) => {
        updateQuantity(bookId, newQuantity);
    };

    const isInCartAndHasQuantity = (bookId) => {
        return isInCart(bookId) && items.some(item => item.id === bookId && item.quantity > 0);
    };

    if (isLoading) return <p>Cargando catálogo...</p>;
    if (error) return <p>Error: {String(error.message)}</p>;

    return (
        <Container className="catalog">
            <h1>Welcome to page: Catalog!</h1>
            <div className="catalog__links">
                <Link to="/search-results">Go to Search Results</Link>
                <Link to="/checkout">Go to Checkout</Link>
                {items.map(item => (
                    <p key={item.id}>In cart: {item.title} (Quantity: {item.quantity})</p>
                ))}
            </div>
            <ul className="catalog__list">
                {books.map((book) => (
                    <li className="catalog__list__item" key={book.id}>
                        <img src={book.thumbnail} alt={book.title} />
                        <Link className="catalog__list__item-link" to={`/product/${book.id}`}>
                            <h2>{book.title}</h2>
                        </Link>
                        <p>Authors: {book.authors.join(", ")}</p>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '10px',
                                width: '100%',
                            }}
                        >
                            <span>${book.price}</span>
                            <HeartButton
                                isFavorite={favorites[book.id]}
                                toggleFavorite={() => toggleFavorite(book.id)}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px',
                                }}
                            >
                                <Icon
                                    name="star-full"
                                    size={20}
                                    color="#2D5A54"
                                />
                                <span>{book.points}</span>
                            </div>
                        </div>
                        {isInCartAndHasQuantity(book.id) ? (
                            <QuantitySelector
                                numOrder={items.find(item => item.id === book.id)?.quantity || 1}
                                onChange={(newQuantity) => handleQuantityChange(book.id, newQuantity)}
                            />
                        ) : (
                            <Button onClick={e => handleOnAddItemClick(e, book)}>
                                Agregar al carrito
                            </Button>
                        )}
                    </li>
                ))}
            </ul>
        </Container>
    )
}

export default CatalogPage
