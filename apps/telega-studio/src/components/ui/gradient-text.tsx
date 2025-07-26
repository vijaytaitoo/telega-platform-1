import * as React from 'react';
import { cn } from '@/lib/utils';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

const GradientText = React.forwardRef<HTMLSpanElement, GradientTextProps>(
  ({ className, as: Component = 'span', children, ...props }, ref) => {
    return React.createElement(
      Component,
      {
        className: cn('gradient-text', className),
        ref,
        ...props,
      },
      children,
    );
  },
);

GradientText.displayName = 'GradientText';

export { GradientText };
