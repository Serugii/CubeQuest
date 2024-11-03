import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import PlayPage from './playPage';

jest.useFakeTimers();

describe('PlayPage component', () => {
    test('stops the timer when the stop button is clicked', () => {
        render(<PlayPage />);

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: /включити таймер/i }));
        });

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        act(() => {
            fireEvent.click(screen.getByRole('button', { name: /зупинити таймер/i }));
        });

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('00:00:02');
    });
});
