import { forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium',
    'transition-all duration-150 ease-in-out select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-[#047a74] shadow-xs border border-transparent',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/70 border border-border',
        outline:
          'border border-border bg-white text-foreground hover:bg-muted hover:border-primary/40',
        ghost:
          'bg-transparent text-foreground hover:bg-muted border border-transparent',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-transparent shadow-xs',
        link:
          'bg-transparent text-primary underline-offset-4 hover:underline border-none shadow-none p-0 h-auto',
        'outline-primary':
          'border border-primary text-primary bg-white hover:bg-primary/5',
      },
      size: {
        xs:   'h-7 px-2.5 text-xs rounded-md gap-1.5',
        sm:   'h-8 px-3 text-xs rounded-md gap-1.5',
        md:   'h-9 px-4 text-sm rounded-lg',
        lg:   'h-10 px-5 text-sm rounded-lg',
        xl:   'h-11 px-6 text-base rounded-lg',
        icon: 'h-9 w-9 rounded-lg',
        'icon-sm': 'h-7 w-7 rounded-md',
        'icon-lg': 'h-10 w-10 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

const Button = forwardRef(({ className, variant, size, asChild = false, loading = false, children, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          <span className="h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
          {children}
        </>
      ) : children}
    </Comp>
  )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
