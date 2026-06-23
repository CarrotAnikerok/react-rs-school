import { NextIntlClientProvider } from 'next-intl';
import '../index.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pony',
  description: 'It`s an app about pony!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
