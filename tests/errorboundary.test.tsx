import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../src/components/ErrorBoundary/ErrorBoundary';
import { CardList } from '../src/components/CardList/CardList';
import { renderWithReduxAndRouter } from './test-utils/utils';

describe('ErrorBoundary Component', () => {
  const defaultCardListProps = {
    list: [],
    isLoading: false,
    error: undefined,
  };

  it('error button throws error', async () => {
    const fallback = 'Something went wrong with ponies';
    renderWithReduxAndRouter(
      <ErrorBoundary fallback={<p className="errorMessage">{fallback}</p>}>
        <CardList {...defaultCardListProps} />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /Im an error button!/i });
    await userEvent.click(button);

    expect(screen.getByText(new RegExp(fallback, 'i'))).toBeInTheDocument();
  });

  it('logs error to console', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const fallback = 'Something went wrong with ponies';
    renderWithReduxAndRouter(
      <ErrorBoundary fallback={<p className="errorMessage">{fallback}</p>}>
        <CardList {...defaultCardListProps} />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /Im an error button!/i });
    await userEvent.click(button);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Error occurred Error: mew im an error')
    );

    consoleSpy.mockRestore();
  });
});
