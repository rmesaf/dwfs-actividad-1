import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useDebounce from 'shared/hooks/useDebounce';
import './styles.scss';

function SearchInput() {
    const [value, setValue] = useState('');
    const debouncedValue = useDebounce(value, 5000);
    const navigate = useNavigate();

    useEffect(() => {
        if (debouncedValue.trim() !== '') {
            navigate(`/search-results?q=${debouncedValue}`);
        }
    }, [debouncedValue, navigate]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className="search-input">
            <input
                type="text"
                placeholder="Buscar libros por título..."
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}

export default SearchInput;
