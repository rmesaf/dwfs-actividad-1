// App
import Button from 'shared/components/Button';

// Styles
import './styles.scss';

const QuantitySelector = ({ numOrder, onChange }) => {
    const handleDecrement = e => {
        e.preventDefault();
        if (numOrder > 0) {
            onChange(numOrder - 1);
        }
    };

    const handleIncrement = () => {
        onChange(numOrder + 1);
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value) && value >= 0) {
            onChange(value);
        }
    };

    return (
        <div className="quantity-control">
            <Button className="quantity-control__button" onClick={e => handleDecrement(e)} aria-label="Decrement">
                -
            </Button>
            <input
                className="quantity-control__number"
                type="number"
                value={numOrder}
                onChange={handleInputChange}
                min="0"
            />
            <Button className="quantity-control__button" onClick={e => handleIncrement(e)} aria-label="Increment">
                +
            </Button>
        </div>
    );
};

export default QuantitySelector;