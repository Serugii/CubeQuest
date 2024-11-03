import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Challenge from './challengePage';

describe('Challenge Component', () => {
    test('renders challenge page with correct content', () => {
        render(
            <MemoryRouter>
                <Challenge />
            </MemoryRouter>,
        );

        expect(screen.getByText(/випробуй свої навички у челенджах!/i)).toBeInTheDocument();
        expect(screen.getByText(/швидкісне складання кубика на час/i)).toBeInTheDocument();
        expect(screen.getByText(/чи можеш ти скласти кубик рубика швидше за всіх?/i)).toBeInTheDocument();
    });

    test('renders navigation link to start challenge', () => {
        render(
            <MemoryRouter>
                <Challenge />
            </MemoryRouter>,
        );

        const startChallengeLink = screen.getByRole('link', { name: /почати челендж/i });
        expect(startChallengeLink).toBeInTheDocument();
        expect(startChallengeLink).toHaveAttribute('href', '/play');
    });
});
