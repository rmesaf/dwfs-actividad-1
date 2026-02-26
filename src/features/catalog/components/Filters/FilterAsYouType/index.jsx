// Packages
import { useState, useEffect } from 'react';
import cn from 'classnames';

// App
import useDebounce from 'shared/hooks/useDebounce';
import Divider from 'shared/components/Divider';

// Own
import './styles.scss';

function FilterAsYouType({
    className,
    label,
    name,
    onChange,
    placeholder,
    value: externalValue = '',
}) {
    const [inputValue, setInputValue] = useState(externalValue);
    const debouncedValue = useDebounce(inputValue, 500);

    useEffect(() => {
        if (debouncedValue !== externalValue) {
            onChange(debouncedValue);
        }
    }, [debouncedValue]);

    useEffect(() => {
        setInputValue(externalValue);
    }, [externalValue]);

    return (
        <div className={cn("filter-as-you-type", className)}>
            <label
                htmlFor={name}
                className={"filter-as-you-type__label"}
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
            />
            <Divider />
        </div>
    );
}

export default FilterAsYouType;
