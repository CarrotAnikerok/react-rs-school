import {
  Link,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router';
import { Loader } from '../Loader/Loader';
import './ItemDetails.css';

type data = {
  id: number;
  name: string;
  occupation: string;
  sex: string;
  residence: string;
  kind: string[];
  image: string[];
};

type ContextType = data[];

export function ItemDetails() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const { itemId } = useParams<{ itemId: string }>();

  const items = useOutletContext<ContextType>();

  const item = items.find((element) => element.id.toString() === itemId);

  if (!item) {
    return <Loader></Loader>;
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
