// Packages
import React from 'react';

// App
import Cart from 'features/cart/components/Cart';
import Container from 'shared/components/Container';
import Link from 'shared/components/Link';
import SearchInput from 'features/catalog/components/SearchInput';


// styles
import './styles.scss';

export default function Header() {
    return (
        <header className='app-header'>
            <Container className='app-header__container'>
                <Link href="/catalog" className='app-header__logo'>RDP</Link>
                <SearchInput className="app-header__search"/>
                <div className='app-header__cart'>
                    <Cart />
                </div>
            </Container>
        </header>
    );
};