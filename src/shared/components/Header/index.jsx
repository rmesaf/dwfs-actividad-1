// Packages
import React from 'react';

// App
import Container from 'shared/components/Container';
import BagButton from 'features/cart/components/BagButton';
import SearchInput from 'features/catalog/components/SearchInput';

// styles
import './styles.scss';

export default function Header() {
    return (
        <header className='app-header'>
            <Container className='app-header__container'>
            <span className='app-header__logo'>RDP</span>

            <div className="app-header__search">
                <SearchInput />
            </div>

            <div className='app-header__cart'>
                <BagButton />
            </div>
        </Container>
        </header>
    );
};