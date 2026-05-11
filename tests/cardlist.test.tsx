import { render, screen } from '@testing-library/react';
import { CardList } from '../src/components/CardList/CardList';
import { mockSearchData } from './test-utils/mocks';
import userEvent from '@testing-library/user-event';

describe('CardList Component', () => {
  it('renders cards', () => {
    render(<CardList items={mockSearchData} isLoading={false} error="" />);

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
    render(<CardList items={mockSearchData} isLoading={true} error="" />);

    expect(
      screen.getByRole('generic', { name: /loader/i })
    ).toBeInTheDocument();
  });

  it('hides loading', () => {
    render(<CardList items={mockSearchData} isLoading={false} error="" />);

    expect(screen.queryByRole('generic', { name: /loader/i })).toBeNull();
  });

  it('renders error', () => {
    const error = 'I`m an error!';

    render(<CardList items={mockSearchData} isLoading={false} error={error} />);

    expect(screen.getByText(new RegExp(error, 'i'))).toBeInTheDocument();
  });

  it('error button throws error', async () => {
    render(<CardList items={mockSearchData} isLoading={false} error="" />);

    const button = screen.getByRole('button', { name: /Im an error button!/i });

    await expect(userEvent.click(button)).rejects.toThrow('mew im an error');
  });
});
