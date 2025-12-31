// Packages
import cn from 'classnames'

// Styles
import "./styles.scss";

const CardBody = ({ className, children}) => {
    return (
        <div className={cn("checkout-card__body", className)}>
            {children}
        </div>
    );
};

export default CardBody;