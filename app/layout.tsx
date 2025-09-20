import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export const metadata = {
  title: {
    default: 'Acme Dashboard',
    template: '%s | Acme Dashboard',
  },
  description: 'An example dashboard built with Next.js App Router.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
