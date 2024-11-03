import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { app } from '../../../firebaseConfig';
import Login from './loginPage';

jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
}));

const mockToggleLogin = jest.fn();

describe('Login Component', () => {
    beforeEach(() => {
        render(
            <Router>
                <Login toggleLogin={mockToggleLogin} />
            </Router>,
        );
    });

    test('renders login form correctly', () => {
        expect(screen.getByText(/вхід в обліковий запис/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/адреса електронної пошти/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument();
        expect(screen.getByText(/зареєструватись/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /авторизуватися/i })).toBeInTheDocument();
    });

    test('handles login successfully', async () => {
        const email = 'test@example.com';
        const password = 'password123';

        const mockSignIn = jest.fn().mockResolvedValueOnce({
            user: {
                accessToken: 'mockAccessToken',
                uid: 'mockUserId',
            },
        });

        getAuth.mockReturnValue(app);
        signInWithEmailAndPassword.mockImplementation(mockSignIn);

        fireEvent.change(screen.getByLabelText(/адреса електронної пошти/i), { target: { value: email } });
        fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: password } });
        fireEvent.click(screen.getByRole('button', { name: /авторизуватися/i }));

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith(app, email, password);
            expect(localStorage.getItem('token')).toBe('mockAccessToken');
            expect(localStorage.getItem('userId')).toBe('mockUserId');
            expect(mockToggleLogin).toHaveBeenCalledWith(true);
        });
    });

    test('handles login error', async () => {
        const mockErrorMessage = 'Неправильний email або пароль';
        const mockSignIn = jest.fn().mockRejectedValueOnce(new Error(mockErrorMessage));

        getAuth.mockReturnValue(app);
        signInWithEmailAndPassword.mockImplementation(mockSignIn);

        fireEvent.change(screen.getByLabelText(/адреса електронної пошти/i), {
            target: { value: 'wrong@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/пароль/i), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /авторизуватися/i }));

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalled();
            expect(screen.getByText(/неправильний email або пароль/i)).toBeInTheDocument();
        });
    });
});
