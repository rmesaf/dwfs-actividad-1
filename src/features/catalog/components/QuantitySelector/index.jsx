// Packages
import React from 'react';

// App
import Button from 'shared/components/Button';

// Styles
import './styles.scss';

const QuantitySelector = ({ numOrder, onChange }) => {
    const handleDecrement = () => {
        if (numOrder > 0) {
            onChange(numOrder - 1);
        }
    };

    const handleIncrement = () => {
        onChange(numOrder + 1);
    };

    return (
        <div className="quantity-control">
            <Button className="quantity-control__button" onClick={handleDecrement} aria-label="Decrement">
                -
            </Button>
            <span className="quantity-control__number">{numOrder}</span>
            <Button className="quantity-control__button" onClick={handleIncrement} aria-label="Increment">
                +
            </Button>
        </div>
    );
};

export default QuantitySelector;