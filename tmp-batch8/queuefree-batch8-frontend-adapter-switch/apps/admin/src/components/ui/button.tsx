import Link from 'next/link';
import * as React from 'react';
import { cn } from '@/lib/utils';

const styles = {
  primary: 'border-transparent bg-brand text-white hover:bg-blue-700',
  secondary: 'border-border bg-white text-slate-900 hover:bg-slate-50',
  ghost: 'border-transparent bg-transparent text-slate-700 hover:bg-slate-100'
} as const;

type ButtonVariant = keyof typeof styles;

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = 'primary',
  className,
  children
}: BaseProps & { href: string }): React.ReactElement {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-colors',
        styles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Button({
  type = 'button',
  variant = 'primary',
  className,
  children,
  ...props
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
