import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Link from './Link';

describe('Link component', () => {
    test('renders correctly with given props', () => {
        const { getByText } = render(
            <MemoryRouter>
                <Link to="/about">About</Link>
            </MemoryRouter>,
        );

        expect(getByText('About')).toBeInTheDocument();
    });

    test('has correct class when active', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/about']}>
                <Link to="/about">About</Link>
            </MemoryRouter>,
        );

        const linkElement = getByText('About');

        expect(linkElement).toHaveClass('link active');
    });

    test('has correct class when inactive', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Link to="/about">About</Link>
            </MemoryRouter>,
        );

        const linkElement = getByText('About');

        expect(linkElement).toHaveClass('link');
    });
});
