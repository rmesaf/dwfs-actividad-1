// Packages
import cn from 'classnames'
import { toast } from 'sonner';

// App
import { formatCurrency } from 'shared/utils/formatCurrency';
import { useCart } from 'features/cart/hooks/useCart';
import Button from 'shared/components/Button';
import HeartButton from "features/catalog/components/HeartButton";
import Icon from "shared/components/Icon";
import Link from "shared/components/Link";
import QuantitySelector from "features/catalog/components/QuantitySelector";
import TrashButton from 'features/catalog/components/TrashButton';

// Styles
import './styles.scss';

function Book ({
    className = '',
    book,
}) {
    const { addItem, removeItem, items, updateQuantity, isInCart } = useCart();

    const handleOnAddItemClick = (e, book) => {
        e.preventDefault();
        addItem({ ...book, quantity: 1 });
        toast.success(`Added "${book.title}" to cart!`);
    }

    const handleOnDeleteItemClick = (bookId) => {
        removeItem(bookId);
        toast.success(`Removed item from cart!`);
    }

    const handleQuantityChange = (bookId, newQuantity) => {
        updateQuantity(bookId, newQuantity);
    };

    const isInCartAndHasQuantity = (bookId) => {
        return isInCart(bookId) && items.some(item => item.id === bookId && item.quantity > 0);
    };
    return (
        <li className={cn("book", className)}>
            <Link className="book__link" to={`/product/${book?.id}`}>
                <div className='book__img'>
                    <img src={book?.thumbnail} alt={book?.title} />
                </div>
                <h2 className='book__title'>{book?.title}</h2>
                <p>{book?.authors.join(", ")}</p>
                <div className="book__info">
                    <span>{formatCurrency(book?.price)}</span>
                    <HeartButton
                        isFavorite={book?.isFavorite}
                        toggleFavorite={() => {}}
                    />
                    <div className="book__info-rating">
                        <span>{book?.ratings}</span>
                        <Icon
                            name="star-full"
                            size={30}
                            color="#2D5A54"
                        />
                    </div>
                </div>
                <div className='book__actions'>
                    {isInCartAndHasQuantity(book?.id) ? (
                        <>
                            <QuantitySelector
                                numOrder={items.find(item => item.id === book?.id)?.quantity || 1}
                                onChange={(newQuantity) => handleQuantityChange(book?.id, newQuantity)}
                            />
                            <TrashButton className='book__action-delete' deleteItem={() => handleOnDeleteItemClick(book?.id)} />
                        </>
                    ) : (
                        <Button className='book__action-add' onClick={e => handleOnAddItemClick(e, book)}>
                            Agregar al carrito
                        </Button>
                    )}
                </div>
            </Link>
        </li>
    )
}

export default Book;