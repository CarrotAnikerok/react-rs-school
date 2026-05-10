import { render } from '@testing-library/react';
import App from '../src/components/App/App';


describe('App', () => {
  it('renders headline', () => {
    render(<App />);

    // check if App components renders headline
  });
});