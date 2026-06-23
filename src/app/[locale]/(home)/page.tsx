import { fetchPonies } from '../../../services/pony';
import { Search } from '../../../components/Search/Search';
import { Pagination } from '../../../components/Pagination/Pagination';
import { ErrorBoundary } from '../../../components/ErrorBoundary/ErrorBoundary';
import { CardList } from '../../../components/CardList/CardList';
import { getTranslations } from 'next-intl/server';

type HomeProps = {
  children: React.ReactNode;
  params: Promise<{ itemId?: string }>;
  searchParams: Promise<{ query?: string; page?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const currentQuery = resolvedSearchParams?.query || 'all';
  const currentPage = parseInt(resolvedSearchParams?.page || '1', 10);
  const t = await getTranslations('HomePage');

  const limit = 10;
  const offset = (currentPage - 1) * limit;

  let list = [];
  let error = null;

  try {
    const response = await fetchPonies({
      query: currentQuery,
      limit,
      offset,
    });
    list = response?.data || [];
  } catch (err) {
    error = err;
  }

  return (
    <>
      <Search />
      {!error && list && list.length > 0 ? (
        <Pagination
          currentPage={currentPage}
          hasMore={list.length === limit}
        ></Pagination>
      ) : null}
      <ErrorBoundary
        fallback={
          <p className="errorMessage">{t('error')}</p>
        }
      >
        <CardList list={list} isLoading={false} error={error}></CardList>
      </ErrorBoundary>
    </>
  );
}
