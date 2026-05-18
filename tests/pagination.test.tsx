import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { Pagination } from '../src/components/Pagination/Pagination';

describe('Pagination Component', () => {
  it('renders correctly on the first page', () => {
    const mockChangePage = vi.fn();

    render(
      <Pagination currentPage={1} changePage={mockChangePage} hasMore={true} />
    );

    expect(screen.getByText('Page 1')).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: /back/i });
    expect(backButton).toBeDisabled();

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).not.toBeDisabled();
  });

  it('calls changePage with incremented page when Next is clicked', async () => {
    const mockChangePage = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination currentPage={2} changePage={mockChangePage} hasMore={true} />
    );

    const nextButton = screen.getByRole('button', { name: /next/i });
    await user.click(nextButton);

    expect(mockChangePage).toHaveBeenCalledTimes(1);
    expect(mockChangePage).toHaveBeenCalledWith(3);
  });

  it('calls changePage with decremented page when Back is clicked', async () => {
    const mockChangePage = vi.fn();
    const user = userEvent.setup();

    render(
      <Pagination currentPage={3} changePage={mockChangePage} hasMore={true} />
    );

    const backButton = screen.getByRole('button', { name: /back/i });
    await user.click(backButton);

    expect(mockChangePage).toHaveBeenCalledTimes(1);
    expect(mockChangePage).toHaveBeenCalledWith(2);
  });

  it('fully covers all interactive branches and click handlers', async () => {
    const mockChangePage = vi.fn();
    const user = userEvent.setup();

    const { rerender } = render(
      <Pagination currentPage={2} changePage={mockChangePage} hasMore={true} />
    );

    const backButton = screen.getByRole('button', { name: /back/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    await user.click(backButton);
    expect(mockChangePage).toHaveBeenLastCalledWith(1);

    await user.click(nextButton);
    expect(mockChangePage).toHaveBeenLastCalledWith(3);

    rerender(
      <Pagination currentPage={1} changePage={mockChangePage} hasMore={false} />
    );

    const disabledBack = screen.getByRole('button', { name: /back/i });
    const disabledNext = screen.getByRole('button', { name: /next/i });

    expect(disabledBack).toBeDisabled();
    expect(disabledNext).toBeDisabled();

    await user.click(disabledBack);
    await user.click(disabledNext);

    expect(mockChangePage).toHaveBeenCalledTimes(2);
  });
});
