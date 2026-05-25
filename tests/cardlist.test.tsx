import { screen } from '@testing-library/react';
import { CardList } from '../src/components/CardList/CardList';
import { mockSearchData } from './test-utils/mocks';
import userEvent from '@testing-library/user-event';
import { renderWithReduxAndRouter } from './test-utils/utils';

describe('CardList Component', () => {
  it('renders cards', () => {
    renderWithReduxAndRouter(<CardList />, {
      preloadedState: {
        list: mockSearchData,
        isLoading: false,
        error: '',
      },
    });

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
    renderWithReduxAndRouter(<CardList />, {
      preloadedState: {
        list: [],
        isLoading: true,
        error: '',
      },
    });

    expect(
      screen.getByRole('generic', { name: /loader/i })
    ).toBeInTheDocument();
  });

  it('hides loading', () => {
    renderWithReduxAndRouter(<CardList />);

    expect(screen.queryByRole('generic', { name: /loader/i })).toBeNull();
  });

  it('renders error', () => {
    const errorText = 'I`m an error!';

    renderWithReduxAndRouter(<CardList />, {
      preloadedState: {
        list: [],
        isLoading: false,
        error: errorText, // Передаем нашу строку ошибки
      },
    });

    expect(screen.getByText(new RegExp(errorText, 'i'))).toBeInTheDocument();
  });

  it('error button throws error', async () => {
    renderWithReduxAndRouter(<CardList />);

    const button = screen.getByRole('button', { name: /Im an error button!/i });

    await expect(userEvent.click(button)).rejects.toThrow('mew im an error');
  });
});
