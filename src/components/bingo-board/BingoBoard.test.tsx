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

  /* test activeness of bingo square */

  /* make sure middle square is ALWAYS in the matrix */

  /* test left diagona bingo */

  /* test right diagonal bingo */

  /* test horizontal bingo */

  /* test vertical bingo */

  /* test for multiple bingos */

  /* visual reward test */
});