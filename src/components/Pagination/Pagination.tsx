'use client'

import { useTranslations } from 'next-intl';
import './Pagination.css';
import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  currentPage: number;
  hasMore: boolean;
};

export function Pagination({
  currentPage,
  hasMore,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    router.push(`/?${newParams.toString()}`);
  }

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
