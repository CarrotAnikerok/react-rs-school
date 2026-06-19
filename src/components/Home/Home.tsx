import { useCallback, useRef } from 'react';
import { CardList } from '../CardList/CardList';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Search } from '../Search/Search';
import { Outlet, useMatch, useNavigate, useSearchParams } from 'react-router';
import { Pagination } from '../Pagination/Pagination';
import './Home.css';
import { setQuery } from '../../features/home/homeSlice';
import { useGetItemListQuery } from '../../services/pony';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

export function Home() {
  const dispatch = useAppDispatch();

  const { currentQuery } = useAppSelector((state) => state.home);

  const limit = useRef<number>(10);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const offset = (currentPage - 1) * limit.current;
  const { data, error, isLoading, isFetching } = useGetItemListQuery({
    query: currentQuery,
    limit: limit.current,
    offset,
  });

  const handleSearch = useCallback(
    (query: string = 'all') => {
      if (currentQuery !== query) {
        dispatch(setQuery(query));
        setSearchParams((prev) => {
          prev.set('page', '1');
          return prev;
        });
      }
    },
    [setSearchParams, currentQuery, dispatch]
  );

  const changePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    navigate(`/?${newParams.toString()}`);
  };

  const isDetailsOpen = !!useMatch('/:itemId');

  const list = data?.data;

  return (
    <div className={`home ${isDetailsOpen ? 'has-details' : ''}`}>
      <div className="list-part">
        <Search onSearch={handleSearch}></Search>
        {!isLoading && !error && list && list.length > 0 ? (
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
          <CardList
            list={list || []}
            isLoading={isLoading || isFetching}
            error={error}
          ></CardList>
        </ErrorBoundary>
      </div>
      <div className="details">
        <Outlet />
      </div>
    </div>
  );
}
