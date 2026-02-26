// App
import Book from 'features/catalog/components/Book';
import BookSkeleton from 'features/catalog/components/Book/bookSkeleton';
import Button from 'shared/components/Button';
import cn from 'classnames';

// Styles
import './styles.scss';

const BookList = ({
    className = '',
    books = [],
    loadMore = () => { },
    isLoading = false,
}) => {
    // Determine how many skeletons to show (e.g. 5 default)
    const renderSkeletons = () => {
        return Array.from({ length: 6 }).map((_, index) => (
            <BookSkeleton key={`skeleton-${index}`} className="book-list__item" />
        ));
    };

    return (
        <div className={cn("book-list", className)}>
            <ul className="book-list__items">
                {books?.map((book) => (
                    <Book className="book-list__item" key={book.id} book={book} />
                ))}
                {isLoading && renderSkeletons()}
            </ul>
            {books?.length > 0 && !isLoading && (
                <div className="book-list__load-more-wrapper">
                    <Button className="book-list__load-more" onClick={loadMore}>Cargar más</Button>
                </div>
            )}
        </div>
    )
}

export default BookList;