import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSubmit } from '../../hooks/create';

afterEach(() => {
  cleanup();
  useSubmit.setState({ submissions: [] });
});
