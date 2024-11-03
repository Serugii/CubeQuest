import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { onValue } from 'firebase/database';
import React from 'react';

import ProfilePage from './profilePage';

jest.mock('firebase/database', () => ({
    onValue: jest.fn(),
}));

describe('ProfilePage Component', () => {
    const mockOnLogout = jest.fn();
    const mockNavigate = jest.fn();
    const userId = 'testUserId';
    const userData = { username: 'Test User', email: 'test@example.com' };

    beforeEach(() => {
        localStorage.setItem('userId', userId);

        onValue.mockImplementation((reference, callback) => {
            callback({ val: () => userData });
        });

        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(<ProfilePage onLogout={mockOnLogout} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.removeItem('userId');
    });

    test('renders user data', () => {
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test User');
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });

    test('calls onLogout and navigates to login on logout', () => {
        const logoutButton = screen.getByRole('button', { name: /вийти/i });
        fireEvent.click(logoutButton);

        expect(mockOnLogout).toHaveBeenCalled();
        expect(localStorage.getItem('userId')).toBeNull();
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});
