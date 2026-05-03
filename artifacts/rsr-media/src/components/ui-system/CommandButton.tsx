import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'wouter';

interface CommandButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'accent';
  href?: string;
  external?: boolean;
  'data-testid'?: string;
}

export const CommandButton = React.forwardRef<HTMLButtonElement, CommandButtonProps>(
  ({ className, variant = 'primary', href, external, children, ...props }, ref) => {
    const baseClass = "relative inline-flex items-center justify-center font-serif font-bold tracking-widest uppercase h-12 px-8 text-sm transition-all corner-bracket";
    
    const variants = {
      primary: "bg-primary/10 text-primary border border-primary/50 hover:bg-primary hover:text-primary-foreground hover:glow-primary",
      outline: "bg-transparent text-foreground border border-border hover:border-foreground",
      accent: "bg-accent/10 text-accent border border-accent/50 hover:bg-accent hover:text-accent-foreground hover:glow-accent"
    };

    const combinedClass = cn(baseClass, variants[variant], className);

    if (href) {
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className={combinedClass} data-testid={props['data-testid']}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={combinedClass} data-testid={props['data-testid']}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClass} {...props}>
        {children}
      </button>
    );
  }
);
CommandButton.displayName = "CommandButton";
