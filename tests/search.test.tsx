import { render, screen } from '@testing-library/react';
import { Search } from '../src/components/Search/Search';
import userEvent from '@testing-library/user-event';

describe('Search Component', () => {
  const mockSearch = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('Integration', () => {
    it('initial onSearch call', () => {
      render(<Search onSearch={mockSearch} />);

      expect(mockSearch).toHaveBeenCalledWith('all');
    });
  });

  describe('Rendering', () => {
    it('renders search input', () => {
      render(<Search onSearch={mockSearch}></Search>);

      expect(
        screen.getByRole('searchbox', { name: /search the pony!/i })
      ).toBeInTheDocument();
    });

    it('renders search button', () => {
      render(<Search onSearch={mockSearch}></Search>);

      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument();
    });

    it('displays saved search from localStorage', () => {
      const search = 'rainbow dash';
      localStorage.setItem('searchValue', JSON.stringify(search));

      render(<Search onSearch={mockSearch}></Search>);
      const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {
        name: /search the pony!/i,
      });

      expect(searchbox.value).toBe(search);
    });

    it('shows empty input if no saved search from localStorage', () => {
      render(<Search onSearch={mockSearch}></Search>);
      const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {
        name: /search the pony!/i,
      });

      expect(searchbox.value).toBe('');
    });
  });

  describe('User Interaction', () => {
    it('updates input value when user types', async () => {
      const typeText = 'rarity';

      render(<Search onSearch={mockSearch}></Search>);
      const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {
        name: /search the pony!/i,
      });
      await user.type(searchbox, typeText);

      expect(searchbox.value).toBe(typeText);
    });

    it('not sends search submit on submit button click if input doesn`t change', async () => {
      render(<Search onSearch={mockSearch}></Search>);
      mockSearch.mockClear();

      await user.click(screen.getByRole('button', { name: /search/i }));

      expect(mockSearch).not.toHaveBeenCalled();
    });

    it('call search on search button click with changed argument', async () => {
      const typeText = 'fluttershy';

      render(<Search onSearch={mockSearch}></Search>);
      const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {
        name: /search the pony!/i,
      });
      const button = screen.getByRole('button', { name: /search/i });
      await user.type(searchbox, typeText);
      await user.click(button);

      expect(mockSearch).toHaveBeenCalledWith(typeText);
    });

    it('trims value from search after submit', async () => {
      const typeText = '  pinkie  ';

      render(<Search onSearch={mockSearch}></Search>);
      const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {
        name: /search the pony!/i,
      });
      const button = screen.getByRole('button', { name: /search/i });
      await user.type(searchbox, typeText);
      await user.click(button);

      expect(mockSearch).toHaveBeenCalledWith(typeText.trim());
    });
  });

  describe('Local Storage', () => {
    it('triggers search callback with parameters from localStorage on load', async () => {
      const search = 'pinkie';
      localStorage.setItem('searchValue', JSON.stringify(search));

      render(<Search onSearch={mockSearch}></Search>);

      expect(mockSearch).toHaveBeenCalledWith(search);
    });

    it('saves search term to localStorage when search button is clicked', async () => {
      const typeText = 'fluttershy';

      render(<Search onSearch={mockSearch}></Search>);
      const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {
        name: /search the pony!/i,
      });
      const button = screen.getByRole('button', { name: /search/i });
      await user.type(searchbox, typeText);
      await user.click(button);

      expect(localStorage.getItem('searchValue')).toBe(JSON.stringify(typeText));
    });

    it('overwrites existing localStorage value when new search is performed', async () => {
      const search = 'rainbow dash';
      localStorage.setItem('searchValue', JSON.stringify(search));

      render(<Search onSearch={mockSearch}></Search>);
      const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {
        name: /search the pony!/i,
      });
      const button = screen.getByRole('button', { name: /search/i });
      await user.clear(searchbox);
      await user.click(button);

      expect(localStorage.getItem('searchValue')).toBe(JSON.stringify(''));

      await user.type(searchbox, search);
      await user.click(button);

      expect(localStorage.getItem('searchValue')).toBe(JSON.stringify(search));
    });
  });
});
