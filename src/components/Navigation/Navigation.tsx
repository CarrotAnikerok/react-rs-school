import Link from 'next/link';
import './Navigation.css';

type LayoutProps = {
  style: string;
};

export function Navigation({ style }: LayoutProps) {
  return (
    <>
      <nav>
        <Link href="/" className={style}>
          Home
        </Link>
        <Link href="/about" className={style}>
          About page
        </Link>
      </nav>
    </>
  );
}
