import { useCallback, useEffect, useRef, useState } from 'react';
import { CardList } from '../components/CardList/CardList';
import { ErrorBoundary } from '../components/ErrorBoundary/ErrorBoundary';
import { Search } from '../components/Search/Search';
import { Outlet, useMatch, useNavigate, useSearchParams } from 'react-router';
import { Pagination } from '../components/Pagination/Pagination';
import './Home.css';

const getErrorMessage = (status: number) => {
  const category = Math.floor(status / 100);

  if (category === 5) {
    return `Sorry, server error :( ${status}`;
  } else if (category === 4) {
    return `Sorry, client error :( ${status})`;
  }

  return `Sorry, some weird error has occurred :( ${status})`;
};

export function Home() {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const limit = useRef<number>(10);
  const navigate = useNavigate();

  const [currentQuery, setCurrentQuery] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const loadData = useCallback(async (page: number, query: string = 'all') => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://ponyapi.net/v1/character/${query}?limit=${limit.current}&offset=${(page - 1) * limit.current}`
      );

      if (!response.ok) {
        setList([]);
        setIsLoading(false);
        setError(getErrorMessage(response.status));
        return;
      }

      const data = await response.json();
      setList(data.data);
      setIsLoading(false);
      setError('');
    } catch {
      setList([]);
      setIsLoading(false);
      setError('Error of access or network :(');
    }
  }, []);

  useEffect(() => {
    loadData(currentPage, currentQuery);
  }, [currentQuery, currentPage, loadData]);

  const handleSearch = useCallback(
    (query: string = 'all') => {
      setCurrentQuery((prevQuery) => {
        if (prevQuery !== query) {
          setSearchParams((prev) => {
            prev.set('page', '1');
            return prev;
          });
        }
        return query;
      });
    },
    [setSearchParams]
  );

  const changePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    navigate(`/?${newParams.toString()}`);
  };

  const isDetailsOpen = !!useMatch('/:itemId');

  return (
    <div className={`home ${isDetailsOpen ? 'has-details' : ''}`}>
      <div className="list-part">
        <Search onSearch={handleSearch}></Search>
        {!isLoading && !error && list.length > 0 ? (
          <Pagination
            currentPage={currentPage}
            changePage={changePage}
            hasMore={list.length === limit.current}
          ></Pagination>
        ) : null}
        <ErrorBoundary
          fallback={
            <p className="errorMessage">Something went wrong with ponies :(</p>
          }
        >
          <CardList items={list} isLoading={isLoading} error={error}></CardList>
        </ErrorBoundary>
      </div>
      <div className="details">
        <Outlet context={list} />
      </div>
    </div>
  );
}
