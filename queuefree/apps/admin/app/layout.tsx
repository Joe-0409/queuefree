import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

const adminBaseUrl = process.env.NEXT_PUBLIC_ADMIN_BASE_URL ?? 'http://localhost:3001';

export const metadata: Metadata = {
  metadataBase: new URL(adminBaseUrl),
  title: {
    default: 'QueueFree Admin',
    template: '%s | QueueFree Admin'
  },
  description: 'QueueFree admin skeleton for operations, finance, risk, governance, and audit modules.'
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en-PH">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
