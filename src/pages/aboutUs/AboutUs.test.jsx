import { render } from '@testing-library/react';
import React from 'react';

import AboutUs from './aboutUsPage';
import styles from './styles.css';

describe('AboutUs component', () => {
    test('renders correctly', () => {
        const { getByText, getByAltText } = render(<AboutUs />);

        expect(getByText('Хто ми такі?')).toBeInTheDocument();

        expect(
            getByText(/CubeQuest – це не просто платформа для навчання складанню кубиків Рубика/),
        ).toBeInTheDocument();
        expect(getByText(/Ми прагнемо зробити складання кубиків Рубика доступним для кожного/)).toBeInTheDocument();

        const imgElement = getByAltText('Rubiks Study');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', expect.stringContaining('RubikStudy.jpg'));
    });

    test('has correct classes', () => {
        const { container } = render(<AboutUs />);

        expect(container.firstChild).toHaveClass(styles.mainDiv);

        const imgDiv = container.querySelector(`div.${styles.imgDiv}`);
        expect(imgDiv).toBeInTheDocument();
    });
});
