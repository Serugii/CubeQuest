import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

describe('Header Component', () => {
    const setUp = (isLoggedIn = false) => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Header isLoggedIn={isLoggedIn} />
            </MemoryRouter>,
        );
    };

    test('renders navigation links', () => {
        setUp();

        expect(screen.getByText('Головна')).toBeInTheDocument();
        expect(screen.getByText('Челенджі')).toBeInTheDocument();
        expect(screen.getByText('Навчання')).toBeInTheDocument();
        expect(screen.getByText('Про нас')).toBeInTheDocument();
        expect(screen.getByText('Увійти/Зареєструватись')).toBeInTheDocument();
    });

    test('navigates to login when clicking on login link', () => {
        setUp();

        const loginLink = screen.getByText('Увійти/Зареєструватись');
        fireEvent.click(loginLink);

        expect(window.location.pathname).toBe('/login');
    });

    test('navigates to profile when clicking on profile link when logged in', () => {
        setUp(true);

        const profileLink = screen.getByText('Профіль');
        fireEvent.click(profileLink);

        expect(window.location.pathname).toBe('/profile');
    });

    test('navigates to /play when clicking on challenges link when logged in', () => {
        setUp(true);

        const challengesLink = screen.getByText('Челенджі');
        fireEvent.click(challengesLink);

        expect(window.location.pathname).toBe('/play');
    });

    test('applies active class to active nav link', () => {
        setUp();

        window.history.pushState({}, 'Test page', '/challenges');

        const challengesLink = screen.getByText('Челенджі');
        expect(challengesLink.parentNode).toHaveClass('active');
    });
});
