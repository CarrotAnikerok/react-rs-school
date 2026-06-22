import Link from 'next/link';
import './Navigation.css';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';
import { useTranslations } from 'next-intl';

type LayoutProps = {
  style: string;
};

export function Navigation({ style }: LayoutProps) {
  const t = useTranslations('HomePage');
  return (
    <>
      <nav>
        <Link href="/" className={style}>
          {t('home')}
        </Link>
        <Link href="/about" className={style}>
          {t('about')}
        </Link>
        <ThemeSwitch></ThemeSwitch>
        <LanguageSwitch></LanguageSwitch>
      </nav>
    </>
  );
}
