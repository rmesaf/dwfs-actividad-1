// Packages
import cn from 'classnames';
// App
import Button from 'shared/components/Button'
import NoResultsImage from 'assets/images/no-results.svg'

// Styles
import './styles.scss'

function EmptyState({
    className = '',
    onClick,
    subtitle,
    title,
}) {
    return (
        <div className={cn("product-empty-state", className)}>
            <div className="product-empty-state__text">
                <h3 className='product-empty-state__title'>{title}</h3>
                <h4 className='product-empty-state__subtitle'>{subtitle}</h4>
            </div>
            <img className='product-empty-state__image' src={NoResultsImage} alt="no data image" />
            <Button onClick={onClick} className='product-empty-state__cta' href='/catalog'>Ver catálogo</Button>
        </div>
    );
}

export default EmptyState;