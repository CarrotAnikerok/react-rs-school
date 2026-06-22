'use client'

import { type SubmitEvent } from 'react';
import './Search.css';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';

export function Search() {
  const t = useTranslations('HomePage');
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get('query') || '';

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = (formData.get('query')?.toString() || '').trim();
    const formattedValue = value.replaceAll(' ', '_');
    const params = new URLSearchParams(searchParams.toString());

    if (formattedValue) {
      params.set('query', formattedValue);
    } else {
      params.delete('query');
    }

    params.set('page', '1'); 
    router.push(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">{t('title')}</label>
      <div className="input-group">
        <input
          id="search"
          name="query"
          type="search"
          placeholder="rarity"
          defaultValue={currentQuery.replaceAll('_', ' ')}
        ></input>
        <button type="submit">{t('search_button')}</button>
      </div>
    </form>
  );
}
