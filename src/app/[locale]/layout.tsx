import { Navigation } from '../../components/Navigation/Navigation';
import Providers from '../../components/Providers/Providers';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Providers>
        <Navigation style="isActive"></Navigation>
        <main>{children}</main>
    </Providers>
    </>
  );
}
