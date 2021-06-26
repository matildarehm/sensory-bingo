import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BingoBoard from './BingoBoard';

describe('<BingoBoard />', () => {
  test('it should mount', () => {

    render(<BingoBoard />);
    const bingoBoard = screen.getByTestId('BingoBoard');
    expect(bingoBoard).toBeInTheDocument();

  });
});