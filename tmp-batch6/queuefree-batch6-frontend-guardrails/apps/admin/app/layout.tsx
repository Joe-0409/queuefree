import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { adminAppEnv } from '@/lib/env';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(adminAppEnv.adminBaseUrl),
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
