import { render, screen } from '@testing-library/react';
import Modal from '../components/Modal/Modal';
import userEvent from '@testing-library/user-event';

describe('Modal Component', () => {
  const mockClose = vi.fn();

  it('modal renders', () => {
    const text = 'Hello, i`m text';
    render(
      <Modal isOpen={true} close={mockClose}>
        {text}
      </Modal>
    );

    expect(screen.getByRole('dialog', { name: /modal/i })).toBeInTheDocument();
    expect(screen.getByText(text)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i }));
  });

  it('close modal', async () => {
    render(<Modal isOpen={true} close={mockClose}></Modal>);
    const closeButton = screen.getByRole('button', { name: /close/i });
    const user = userEvent.setup();

    await user.click(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });

  describe('accessibility features', async () => {
    it('modal close on outside click', async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} close={mockClose}>
          <div role="heading">Modal Content</div>
        </Modal>
      );
      const modalContent = screen.getByRole('heading');
      const modalOverlay = modalContent.parentElement!;
      await user.click(modalOverlay);

      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    it('modal close on ESC', async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} close={mockClose}>
          <div>Modal Content</div>
        </Modal>
      );

      await user.keyboard('{Escape}');
      expect(mockClose).toHaveBeenCalled();
    });

    it('handle tab', async () => {
      const user = userEvent.setup();
      render(
        <Modal isOpen={true} close={mockClose}>
          <input data-testid="first-input" placeholder="First" />
          <button data-testid="last-button">Last</button>
        </Modal>
      );
      const closeButton = screen.getByRole('button', { name: /close/i });
      const firstInput = screen.getByTestId('first-input');
      const lastButton = screen.getByTestId('last-button');

      closeButton.focus();
      expect(document.activeElement).toBe(closeButton);

      await user.keyboard('{Shift>}{Tab}{/Shift}');
      expect(document.activeElement).toBe(lastButton);

      lastButton.focus();
      await user.keyboard('{Tab}');
      expect(document.activeElement).toBe(closeButton);

      await user.keyboard('{Tab}');
      expect(document.activeElement).toBe(firstInput);
    });
  });
});
