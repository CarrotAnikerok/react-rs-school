import { render, screen } from '@testing-library/react';
import Portal from '../components/Portal/Portal';

describe('Portal Component', () => {
  it('renders children inside document.body', () => {
    const portalText = 'Portal';
    const { container } = render(
      <Portal>
        <div data-testid="portal-child">{portalText}</div>
      </Portal>
    );

    const childElement = screen.getByText(portalText);
    expect(childElement).toBeInTheDocument();

    expect(document.body).toContainElement(childElement);
    expect(container).not.toContainElement(childElement);
  });
});
