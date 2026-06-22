import { ThemeSwitch } from '../../components/ThemeSwitch/ThemeSwitch';
import { Navigation } from '../../components/Navigation/Navigation';
import Providers from '../../components/Providers/Providers';
import LanguageSwitch from '../../components/LanguageSwitch/LanguageSwitch';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Providers>
        <ThemeSwitch></ThemeSwitch>
        <Navigation style="isActive"></Navigation>
        <LanguageSwitch></LanguageSwitch>
        <main>{children}</main>
    </Providers>
    </>
  );
}
