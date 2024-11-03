import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import NotFound from './NotFound';

describe('NotFound Component', () => {
    test('renders 404 error message', () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>,
        );

        expect(screen.getByText('404')).toBeInTheDocument();
        expect(screen.getByText(/сторінка не знайдена/i)).toBeInTheDocument();
        expect(
            screen.getByText(/на жаль, сторінка, яку ви шукаєте, не існує або була переміщена./i),
        ).toBeInTheDocument();
    });

    test('renders link to go back to home', () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>,
        );

        const homeLink = screen.getByRole('link', { name: /повернутися на головну/i });
        expect(homeLink).toBeInTheDocument();
        expect(homeLink).toHaveAttribute('href', '/');
    });
});
