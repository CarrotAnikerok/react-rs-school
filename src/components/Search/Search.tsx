import { useEffect, type ReactNode, type SubmitEvent } from 'react';
import './Search.css';
import { useLocalStorage } from '../../customHooks';

type SearchProps = {
  children?: ReactNode;
  onSearch: (query?: string) => void;
};

export function Search({ onSearch }: SearchProps) {
  const [searchValue, setSearchValue] = useLocalStorage('searchValue');

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = (formData.get('query')?.toString() || '').trim();
    setSearchValue(value);

    if (value === searchValue) {
      return;
    }

    onSearch(value.replaceAll(' ', '_') || 'all');
  };

  useEffect(() => {
    onSearch(searchValue.replaceAll(' ', '_') || 'all');
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">Search the pony!</label>
      <div className="input-group">
        <input
          id="search"
          name="query"
          type="search"
          placeholder="rarity"
          defaultValue={searchValue}
        ></input>
        <button type="submit">Search</button>
      </div>
    </form>
  );
}
