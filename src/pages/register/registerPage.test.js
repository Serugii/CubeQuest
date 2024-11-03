import '@testing-library/jest-dom'; // Виправлено імпорт

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React from 'react';

import Register from './registerPage';

jest.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: jest.fn(),
    getAuth: jest.fn(),
}));

describe('Register Component', () => {
    const mockToggleLogin = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(<Register toggleLogin={mockToggleLogin} />);
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    test('renders the registration form', () => {
        expect(screen.getByLabelText(/ім'я користувача/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/адреса електронної пошти/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/підтвердьте пароль/i)).toBeInTheDocument();
    });

    test('validates password match', async () => {
        fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/підтвердьте пароль/i), { target: { value: 'differentPassword' } });

        fireEvent.click(screen.getByRole('button', { name: /зареєструватись/i }));

        await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Паролі не співпадають!'));
    });

    test('calls createUserWithEmailAndPassword on submit', async () => {
        createUserWithEmailAndPassword.mockResolvedValue({
            user: {
                accessToken: 'testToken',
                uid: 'testUserId',
            },
        });

        fireEvent.change(screen.getByLabelText(/ім'я користувача/i), { target: { value: 'TestUser' } });
        fireEvent.change(screen.getByLabelText(/адреса електронної пошти/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/підтвердьте пароль/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /зареєструватись/i }));

        await waitFor(() => {
            expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(getAuth(), 'test@example.com', 'password123');
            expect(localStorage.getItem('token')).toBe('testToken');
            expect(localStorage.getItem('userId')).toBe('testUserId');
            expect(mockToggleLogin).toHaveBeenCalledWith(true);
            expect(mockNavigate).toHaveBeenCalledWith('/profile');
            expect(window.alert).toHaveBeenCalledWith('Користувача успішно зареєстровано!');
        });
    });

    test('handles registration error', async () => {
        createUserWithEmailAndPassword.mockRejectedValue(new Error('Registration failed!'));

        fireEvent.change(screen.getByLabelText(/ім'я користувача/i), { target: { value: 'TestUser' } });
        fireEvent.change(screen.getByLabelText(/адреса електронної пошти/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/підтвердьте пароль/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /зареєструватись/i }));

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Помилка: Registration failed!');
        });
    });
});
