import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary-hover shadow-md hover:shadow-lg',
        gradient: 'gradient-primary gradient-primary-hover text-white shadow-md hover:shadow-lg',
        telegram:
          'bg-telegram text-telegram-foreground hover:bg-telegram-hover shadow-md hover:shadow-lg',
        outline:
          'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary-hover shadow-md hover:shadow-lg',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline gradient-text',
      },
      size: {
        default: 'h-10 py-2 px-4 rounded-xl',
        sm: 'h-9 px-3 rounded-lg text-sm',
        lg: 'h-12 px-8 rounded-2xl text-lg',
        icon: 'h-10 w-10 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, keyof VariantProps<typeof buttonVariants>>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : motion.button;
    const motionProps = asChild
      ? {}
      : {
          whileTap: { scale: 0.98 },
          whileHover: { scale: 1.02 },
        };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...motionProps}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
