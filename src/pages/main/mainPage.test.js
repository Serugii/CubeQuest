import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Main from './mainPage';

describe('Main Component', () => {
    test('renders welcome message and buttons when user is logged in', () => {
        render(
            <MemoryRouter>
                <Main isLoggedIn={true} />
            </MemoryRouter>,
        );

        expect(screen.getByText(/ласкаво просимо в світ головоломок та пригод!/i)).toBeInTheDocument();

        const startButton = screen.getByRole('link', { name: /розпочати/i });
        expect(startButton).toHaveAttribute('href', '/play');

        const moreInfoButton = screen.getByRole('link', { name: /дізнатись більше/i });
        expect(moreInfoButton).toHaveAttribute('href', '/about');
    });

    test('renders welcome message and login button when user is not logged in', () => {
        render(
            <MemoryRouter>
                <Main isLoggedIn={false} />
            </MemoryRouter>,
        );

        expect(screen.getByText(/ласкаво просимо в світ головоломок та пригод!/i)).toBeInTheDocument();

        const startButton = screen.getByRole('link', { name: /розпочати/i });
        expect(startButton).toHaveAttribute('href', '/login');

        const moreInfoButton = screen.getByRole('link', { name: /дізнатись більше/i });
        expect(moreInfoButton).toHaveAttribute('href', '/about');
    });

    test('renders CubeQuest description', () => {
        render(
            <MemoryRouter>
                <Main isLoggedIn={false} />
            </MemoryRouter>,
        );

        expect(screen.getByText(/що таке cubequest?/i)).toBeInTheDocument();
        expect(
            screen.getByText(/cubequest – це інтерактивна платформа для навчання складання кубиків рубика/i),
        ).toBeInTheDocument();
    });
});
