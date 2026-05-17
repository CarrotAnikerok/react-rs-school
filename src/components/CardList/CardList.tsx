import { useState, type ReactNode } from 'react';
import './CardList.css';
import { Card } from '../Card/Card';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

type data = {
  id: number;
  name: string;
  occupation: string;
};

type CardListProps = {
  children?: ReactNode;
  items: data[];
  isLoading: boolean;
  error: string;
};

export function CardList({ items, isLoading, error }: CardListProps) {
  const [, setThrowError] = useState(null);

  const throwError = () => {
    setThrowError(() => {
      throw new Error('mew im an error');
    });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (error) {
    return <ErrorMessage message={error}></ErrorMessage>;
  }

  return (
    <div>
      <h3>Pony results!</h3>
      <div className="card_grid">
        <div>Name</div>
        <div>Description</div>
        {items.map((element) => {
          return (
            <Card
              key={element.id}
              name={element.name}
              description={element.occupation}
            ></Card>
          );
        })}
      </div>
      <button className="errorButton" onClick={throwError}>
        Im an error button!
      </button>
    </div>
  );
}
