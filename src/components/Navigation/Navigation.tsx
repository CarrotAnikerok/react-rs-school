import { NavLink, type NavLinkRenderProps } from 'react-router';
import './Navigation.css';

type LayoutProps = {
  style: (props: NavLinkRenderProps) => string;
};

export function Navigation({ style }: LayoutProps) {
  return (
    <>
      <nav>
        <NavLink to="/home" className={style}>
          Home
        </NavLink>
        <NavLink to="/about" className={style}>
          About page
        </NavLink>
      </nav>
    </>
  );
}
