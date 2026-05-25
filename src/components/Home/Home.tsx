import { useCallback, useEffect, useRef } from 'react';
import { CardList } from '../CardList/CardList';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import { Search } from '../Search/Search';
import {
  Outlet,
  useMatch,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router';
import { Pagination } from '../Pagination/Pagination';
import './Home.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchData, setQuery } from '../../features/home/homeSlice';
import { NotFound } from '../NotFound/NotFound';

export function Home() {
  const dispatch = useAppDispatch();

  const { list, isLoading, error, currentQuery } = useAppSelector(
    (state) => state.home
  );

  const limit = useRef<number>(10);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    dispatch(
      fetchData({
        page: currentPage,
        query: currentQuery,
        limit: limit.current,
      })
    );
  }, [currentQuery, currentPage, dispatch]);

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

  const { itemId } = useParams<{ itemId: string }>();
  const isItemExist = list.some((element) => element.id.toString() === itemId);

  if (!isLoading && list.length > 0 && itemId && !isItemExist) {
    return <NotFound />;
  }

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
          <CardList></CardList>
        </ErrorBoundary>
      </div>
      <div className="details">
        <Outlet />
      </div>
    </div>
  );
}
