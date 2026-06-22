'use client';

import Image from 'next/image';
import { Loader } from '../../../../components/Loader/Loader';
import { useGetItemDetailsQuery } from '../../../../services/pony';
import './ItemDetails.css';
import Link from 'next/link';
import { notFound, useParams, useSearchParams } from 'next/navigation';

export default function ItemDetails() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { itemId } = useParams<{ itemId: string }>();

  const { data, error, isLoading, isFetching } = useGetItemDetailsQuery(
    { id: itemId || '' },
    { skip: !itemId }
  );

  if (isLoading || isFetching) {
    return <Loader></Loader>;
  }

  if (error || !data || !data.data || data.data.length === 0) {
    notFound();
  }

  const item = data.data[0];

  console.log('data is ' + JSON.stringify(item));
  console.log('kind is ' + JSON.stringify(item.kind));

  return (
    <div>
      <Link href={`/?page=${page}`} className="exit">
        ✖
      </Link>
      <h2>{item.name}</h2>
      <div className="info">
        <b>Description</b>
        <p>{item.occupation}</p>
        <b>Sex</b>
        <p>{item.sex}</p>
        <b>Residence</b>
        <p>{item.residence}</p>
        <b>Kind</b>
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
