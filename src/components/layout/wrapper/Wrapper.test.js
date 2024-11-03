import { render, screen } from '@testing-library/react';
import React from 'react';

import Wrapper from './Wrapper';

describe('Wrapper Component', () => {
    test('renders children correctly', () => {
        render(
            <Wrapper>
                <p>Test Child</p>
            </Wrapper>,
        );

        const childElement = screen.getByText(/test child/i);
        expect(childElement).toBeInTheDocument();
    });

    test('applies correct class name', () => {
        const { container } = render(
            <Wrapper>
                <p>Test Child</p>
            </Wrapper>,
        );

        expect(container.firstChild).toHaveClass('mainDiv');
    });
});
