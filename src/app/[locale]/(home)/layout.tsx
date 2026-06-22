'use client';

import './Home.css';
import { useCallback, useRef } from 'react';
import { setQuery } from '../../../lib/features/home/homeSlice';
import { useGetItemListQuery } from '../../../services/pony';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Search } from '../../../components/Search/Search';
import { Pagination } from '../../../components/Pagination/Pagination';
import { ErrorBoundary } from '../../../components/ErrorBoundary/ErrorBoundary';
import { CardList } from '../../../components/CardList/CardList';

export default function Home({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  const { currentQuery } = useAppSelector((state) => state.home);

  const limit = useRef<number>(10);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
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
        const params = new URLSearchParams(searchParams);
        params.set('page', String(1));
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    },
    [currentQuery, dispatch]
  );

  const changePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    router.push(`/?${newParams.toString()}`, { scroll: false });
  };

  const { itemId } = useParams();
  const isDetailsOpen = !!itemId;

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
      <div className="details">{children}</div>
    </div>
  );
}
