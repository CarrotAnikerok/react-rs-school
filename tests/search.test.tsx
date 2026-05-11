import { render, screen } from '@testing-library/react';
import { Search } from '../src/components/Search/Search';
import userEvent from '@testing-library/user-event';

describe('Search Component', () => {
    const mockSearch = vi.fn();
    const user = userEvent.setup();

    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    })

    describe('Rendering', () => {
      it('renders search input', () => {
          render(<Search onSearch={mockSearch}></Search>);

          expect(screen.getByRole('searchbox', {name: /search the pony!/i})).toBeInTheDocument();
      }) 

      it('renders search button', () => {
          render(<Search onSearch={mockSearch}></Search>);

          expect(screen.getByRole('button', {name: /search/i})).toBeInTheDocument();
      })

      it('displays saved search from localStorage', () => {
        const search = 'rainbow dash';
        localStorage.setItem('searchValue', search);

        render(<Search onSearch={mockSearch}></Search>);
        const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {name: /search the pony!/i});

        expect(searchbox.value).toBe(search)
      })

      it('shows empty input if no saved search from localStorage', () => {
        render(<Search onSearch={mockSearch}></Search>);
        const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {name: /search the pony!/i});

        expect(searchbox.value).toBe('');
      })
    });

    describe('User Interaction', () => {
        it('updates input value when user types', async () => {
            const typeText = 'rarity';

            render(<Search onSearch={mockSearch}></Search>);
            const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {name: /search the pony!/i});
            await user.type(searchbox, typeText);

            expect(searchbox.value).toBe(typeText);
        });

        it('saves search term to localStorage when search button is clicked', async () => {
            const typeText = 'fluttershy';

            render(<Search onSearch={mockSearch}></Search>);
            const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {name: /search the pony!/i});
            const button = screen.getByRole('button', {name: /search/i});
            await user.type(searchbox, typeText);
            await user.click(button);
        
            expect(localStorage.getItem('searchValue')).toBe(typeText);
        });

        it('trims value from search', async () => {
            const typeText = '  pinkie pie  ';

            render(<Search onSearch={mockSearch}></Search>);
            const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {name: /search the pony!/i});
            const button = screen.getByRole('button', {name: /search/i});
            await user.type(searchbox, typeText);
            await user.click(button);
        
            expect(localStorage.getItem('searchValue')).toBe(typeText.trim());
        });

        it('triggers search callback with correct parameters on load', async () => {
            const search = 'pinkie';
            localStorage.setItem('searchValue', search);

            render(<Search onSearch={mockSearch}></Search>);

            expect(mockSearch).toHaveBeenCalledWith(search);
        })
    })

    describe.todo('Local Storage', () => {
        it('overwrites existing localStorage value when new search is performed', async () => {
            const search = 'rainbow dash';
            localStorage.setItem('searchValue', search);

            render(<Search onSearch={mockSearch}></Search>);
            const searchbox = screen.getByRole<HTMLInputElement>('searchbox', {name: /search the pony!/i});
            const button = screen.getByRole('button', {name: /search/i});
            await user.clear(searchbox);
            await user.click(button);

            expect(localStorage.getItem('searchValue')).toBe('');

            await user.type(searchbox, search);
            await user.click(button);

            expect(localStorage.getItem('searchValue')).toBe(search);
        })
    })
});
