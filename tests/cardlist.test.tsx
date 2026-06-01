import { screen } from '@testing-library/react';
import { CardList } from '../src/components/CardList/CardList';
import { mockSearchData } from './test-utils/mocks';
import userEvent from '@testing-library/user-event';
import { renderWithReduxAndRouter } from './test-utils/utils';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

describe('CardList Component', () => {
  const defaultProps = {
    list: [],
    isLoading: false,
    error: undefined,
  };

  it('renders cards', () => {
    renderWithReduxAndRouter(<CardList {...defaultProps} list={mockSearchData} />);

    expect(
      screen.getByText(new RegExp(mockSearchData[0].name, 'i'))
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(mockSearchData[0].occupation, 'i'))
    ).toBeInTheDocument();
    expect(screen.getAllByTestId('card-name').length).toBe(
      mockSearchData.length
    );
  });

  it('renders loading', () => {
    renderWithReduxAndRouter(<CardList {...defaultProps} isLoading={true} />);

    expect(
      screen.getByRole('generic', { name: /loader/i })
    ).toBeInTheDocument();
  });

  it('hides loading', () => {
    renderWithReduxAndRouter(<CardList {...defaultProps} />);

    expect(screen.queryByRole('generic', { name: /loader/i })).toBeNull();
  });

  it('renders error', () => {
    const mockError: FetchBaseQueryError = {
      status: 404,
      data: { message: 'Not Found' },
    };

    renderWithReduxAndRouter(<CardList {...defaultProps} error={mockError} />);

    expect(screen.getByText(new RegExp(/sorry, client error/i, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('error button throws error', async () => {
    renderWithReduxAndRouter(<CardList {...defaultProps} />);

    const button = screen.getByRole('button', { name: /Im an error button!/i });

    await expect(userEvent.click(button)).rejects.toThrow('mew im an error');
  });
});
