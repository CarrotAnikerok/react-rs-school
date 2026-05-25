import { Link, useParams, useSearchParams } from 'react-router';
import { Loader } from '../Loader/Loader';
import './ItemDetails.css';
import { useAppSelector } from '../../app/hooks';
import type { ponyData } from '../../features/home/homeSlice';

export function ItemDetails() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { itemId } = useParams<{ itemId: string }>();

  const { list, isLoading } = useAppSelector((state) => state.home);

  if (isLoading) {
    return <Loader></Loader>;
  }

  const item: ponyData | undefined = list.find(
    (element) => element.id.toString() === itemId
  );

  if (!item) {
    throw new Response('Not Found', { status: 404 });
  }

  return (
    <div>
      <Link to={`/?page=${page}`} className="exit">
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
      <img src={item.image[0]} />
    </div>
  );
}
