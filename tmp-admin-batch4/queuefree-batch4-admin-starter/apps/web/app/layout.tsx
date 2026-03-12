import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LAUNCH_WEBSITE } from '@queuefree/shared';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${LAUNCH_WEBSITE}`),
  title: {
    default: 'QueueFree',
    template: '%s | QueueFree'
  },
  description: 'QueueFree public website for product overview, rules, privacy, terms, account deletion, and contact guidance.',
  openGraph: {
    title: 'QueueFree',
    description: 'Shopping-first public queue promotion with public rules and compliance pages.',
    url: `https://${LAUNCH_WEBSITE}`,
    siteName: 'QueueFree'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en-PH">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
