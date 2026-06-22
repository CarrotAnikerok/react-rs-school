import Link from 'next/link';
import './About.css';
import { useTranslations } from 'next-intl';

export default function About() {
    const github = 'CarrotAnikerok';
    const discord = 'carrotanikerok';

    const t = useTranslations('About');

    return (
        <div className="about">
            <p>{t('hello')}</p>
            <p>{t('github')}: {github}</p>
            <p>{t('discord')}: {discord}</p>
            <p>
              <Link href="https://rs.school/courses/reactjs">{t('from')}!</Link>
            </p>
        </div>
    );
}
