import { useCallback, useRef, useState } from 'react';
import { Search } from '../Search/Search';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { CardList } from '../CardList/CardList';
import { Navigation } from '../Navigation/Navigation';

const getErrorMessage = (status: number) => {
    const category = Math.floor(status / 100);
    if (category === 5) {
        return `Sorry, server error :( ${status}`;
    } else if (category === 4) {
        return `Sorry, client error :( ${status})`;
    }

    return `Sorry, some weird error has occurred :( ${status})`;
}

export function App() {
    const [list, setList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const limit = useRef<number>(30);

    const handleSearch = useCallback(async (query: string = 'all') => {
        setIsLoading(true);

        try {
            const response = await fetch(
                `https://ponyapi.net/v1/character/${query}?limit=${limit.current}`
            );
    
            if (!response.ok) {
                setList([]);
                setIsLoading(false);
                setError(getErrorMessage(response.status))
                return;
            }

            const data = await response.json();
            setList(data.data);
            setIsLoading(false);
            setError('')
        } catch {
            setList([]);
            setIsLoading(false);
            setError('Error of access or network :(')
        }
    }, []);

    return (
        <>
            <Navigation></Navigation>
            <Search onSearch={handleSearch}></Search>
            <ErrorBoundary
                fallback={
                    <p className="errorMessage">Something went wrong with ponies :(</p>
                }
            >
                <CardList
                    items={list}
                    isLoading={isLoading}
                    error={error}
                ></CardList>
            </ErrorBoundary>
        </>
    );
}
