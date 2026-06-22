import Image from 'next/image';
import { fetchPonyById } from '../../../../../services/pony';
import './ItemDetails.css';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

type DetailsPageProps = {
  params: Promise<{ itemId: string; locale: string }>;
  searchParams: Promise<{ page?: string; query?: string }>; 
};

export default async function ItemDetails({ params, searchParams }: DetailsPageProps) {
  const { itemId, locale }  = await params;
  const resolvedSearchParams = await searchParams;
  let data;
  let error;

  try {
      const response = await fetchPonyById(itemId);
      data = response?.data || [];
    } catch (err) {
      error = err;
      console.log(err);
    }

  const page = resolvedSearchParams.page || '1';
  const query = resolvedSearchParams.query || '';

  const t = await getTranslations('Item');

  if (error || !data || data.length === 0) {
    notFound();
  }

  const item = data[0];

  const queryString = query 
    ? `?page=${page}&query=${encodeURIComponent(query)}` 
    : `?page=${page}`;
    
  // Ссылка ведет на главную текущего языка: например, /en?page=1
  const backUrl = `/${locale}${queryString}`;
  

  return (
    <div>
      <a href={backUrl} className="exit">
        ✖
      </a>
      <h2>{item.name}</h2>
      <div className="info">
        <b>{t('description')}</b>
        <p>{item.occupation}</p>
        <b>{t('gender')}</b>
        <p>{item.sex}</p>
        <b>{t('residence')}</b>
        <p>{item.residence}</p>
        <b>{t('kind')}</b>
        <p>{item.kind.join(', ')}</p>
      </div>
      <div className="image-container">
        <Image 
        src={item.image[0]}
        alt={item.name}
        fill
        sizes="(max-width: 768px) 100vw, 600px"
        priority
      />
      </div>
    </div>
  );
}
