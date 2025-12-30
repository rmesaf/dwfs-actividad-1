// Packages
import { useState } from 'react';
import cn from 'classnames';
// App
import { useNavigate } from 'react-router-dom';

import './styles.scss';

function SearchInput({ className }) {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && value.trim() !== '') {
            navigate(`/search-results?q=${value.trim()}`);
            setValue('');
        }
    };

    return (
        <div className={cn("search-input", className)}>
            <input
                type="text"
                placeholder="Buscar libros por título..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
}

export default SearchInput;
