import { type ReactNode } from 'react';

type CardProps = {
    children?: ReactNode;
    name: string;
    description: string;
};

export function Card({ name, description }: CardProps) {
    return <>
        <div data-testid="card-name"> {name} </div>
        <div> {description} </div>
    </>
}
