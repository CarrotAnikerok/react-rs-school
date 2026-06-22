import { useTranslations } from 'next-intl';
import './Pagination.css';

type PaginationProps = {
  currentPage: number;
  changePage: (page: number) => void;
  hasMore: boolean;
};

export function Pagination({
  currentPage,
  changePage,
  hasMore,
}: PaginationProps) {
  const handleBack = () => {
    changePage(currentPage - 1);
  };

  const handleNext = () => {
    changePage(currentPage + 1);
  };

  const t = useTranslations('HomePage');

  return (
    <div className="pagination-controls">
      <button disabled={currentPage <= 1} onClick={handleBack}>
        {t('back')}
      </button>

      <span>Page {currentPage}</span>

      <button disabled={!hasMore} onClick={handleNext}>
        {t('next')}
      </button>
    </div>
  );
}
