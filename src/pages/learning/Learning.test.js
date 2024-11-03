import { render, screen } from '@testing-library/react';
import React from 'react';

import Learning from './learningPage';

test('renders Learning page with heading and images', () => {
    render(<Learning />);

    expect(screen.getByRole('heading', { name: /як зібрати кубик рубіка/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /як зібрати кубик рубіка. найшвидший/i })).toBeInTheDocument();

    const images = [
        'Image-1',
        'Image-2',
        'Image-3',
        'Image-4',
        'Image-5',
        'Image-6',
        'Image-7',
        'Image-8',
        'Image-9',
        'Image-10',
        'Image-11',
    ];

    for (const alt of images) {
        expect(screen.getByAltText(alt)).toBeInTheDocument();
    }
});
