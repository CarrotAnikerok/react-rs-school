import { useState, type ReactNode } from 'react';
import './CardList.css';
import { Card } from '../Card/Card';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Link, useSearchParams } from 'react-router';
import { getErrorMessage, type PonyData } from '../../features/home/homeSlice';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

type CardListProps = {
  children?: ReactNode;
  list: PonyData[];
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
};

export function CardList({ list, isLoading, error }: CardListProps) {
  const [, setThrowError] = useState(null);
  const [searchParams] = useSearchParams();

  const throwError = () => {
    setThrowError(() => {
      throw new Error('mew im an error');
    });
  };

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (error) {
    const textError = getErrorMessage(error);
    return <ErrorMessage message={textError}></ErrorMessage>;
  }

  return (
    <div>
      <h3>Pony results!</h3>
      <div className="card_grid">
        <div>Name</div>
        <div>Description</div>
        {list.map((element) => {
          return (
            <Link
              key={element.id}
              to={`${element.id}?${searchParams.toString()}`}
              style={{
                display: 'contents',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <Card
                key={element.id}
                name={element.name}
                description={element.occupation}
              ></Card>
            </Link>
          );
        })}
      </div>
      <button className="errorButton" onClick={throwError}>
        Im an error button!
      </button>
    </div>
  );
}
