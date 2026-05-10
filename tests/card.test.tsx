import { render, screen } from '@testing-library/react';
import { Card } from '../src/components/Card/Card';


describe('Card', () => {
  it('Card renders name and description', () => {
    const name = 'Pinkie Pie';
    const description = 'Pink pony';
    render(<Card name={name} description={description}/>);
    screen.debug();

    // i guess generic role should be right?
    // not very good practice, better change for GetRole
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
