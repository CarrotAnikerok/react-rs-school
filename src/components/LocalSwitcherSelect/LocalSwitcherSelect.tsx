'use client';

import { useParams } from 'next/navigation';
import type { Locale } from 'next-intl';
import { useTransition, type ChangeEvent, type ReactNode } from 'react';
import { usePathname, useRouter } from '../../i18n/navigations';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    const cleanPathname = pathname.replace(/^\/(ru|en)(\/|$)/, '/');

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        { pathname: cleanPathname, params },
        { locale: nextLocale }
      );

      router.refresh();
    });
  }

  return (
    <label>
      <p style={{ display: 'none' }}>{label}</p>
      <select
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
    </label>
  );
}
