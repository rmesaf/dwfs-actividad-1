// Packages
import { useState, useEffect } from 'react';

// App
import Divider from 'shared/components/Divider';
import cn from 'classnames';

// Own
import './styles.scss';

function FilterInputText({
    className,
    label,
    name,
    onChange,
    placeholder,
    value: externalValue = '',
}) {
    const [inputValue, setInputValue] = useState(externalValue);


    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            onChange(inputValue);
        }
    };

    useEffect(() => {
        setInputValue(externalValue);
    }, [externalValue]);

    return (
        <div className={cn("filter-input-text", className)}>
            <label
                htmlFor={name}
                className={"filter-input-text__label"}
            >
                {label}
            </label>
            <input
                name={name}
                id={name}
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Divider />
        </div>
    );
}

export default FilterInputText;
