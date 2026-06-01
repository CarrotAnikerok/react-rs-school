import { Link, useParams, useSearchParams } from 'react-router';
import { Loader } from '../Loader/Loader';
import './ItemDetails.css';
import { useGetItemDetailsQuery } from '../../services/pony';

export function ItemDetails() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { itemId } = useParams<{ itemId: string }>();

  const { data, error, isLoading, isFetching } = useGetItemDetailsQuery(
    { id: itemId || '' },
    { skip: !itemId }
  );

  if (isLoading || isFetching) {
    return <Loader></Loader>;
  }

  if (error || !data) {
    throw new Response('Not Found', { status: 404 });
  }

  const item = data.data[0];

  console.log('data is ' + JSON.stringify(item));
  console.log('kind is ' + JSON.stringify(item.kind));

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
