import { render, screen } from '@testing-library/react';
import { Card } from '../src/components/Card/Card';

describe('Card Component', () => {
  it('should render name and description', () => {
    const name = 'Pinkie Pie';
    const description = 'Pink pony';

    render(<Card name={name} description={description} />);

    expect(screen.getByText(new RegExp(name, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(description, 'i'))).toBeInTheDocument();
  });
});
