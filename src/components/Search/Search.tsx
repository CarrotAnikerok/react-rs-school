import { useEffect, useState, type ReactNode, type SubmitEvent } from 'react';
import './Search.css';

type SearchProps = {
    children?: ReactNode;
    onSearch: (query?: string) => void;
};

export function Search({ onSearch }: SearchProps) {
    const [searchValue, setSearchValue] = useState<string>(localStorage.getItem('searchValue') || '');

    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const value = formData.get('query')?.toString() || '';
        setSearchValue(value.trim());
    };

    useEffect(() => {
        onSearch(searchValue.replaceAll(' ', '_') || 'all');
        localStorage.setItem('searchValue', searchValue);
    }, [searchValue, onSearch])

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
