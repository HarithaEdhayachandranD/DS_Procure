import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@/utils/cn'

function Avatar({ className, size = 'md', ...props }) {
  const sizes = { xs: 'h-6 w-6', sm: 'h-7 w-7', md: 'h-8 w-8', lg: 'h-10 w-10', xl: 'h-12 w-12', '2xl': 'h-16 w-16' }
  return (
    <AvatarPrimitive.Root
      className={cn('relative flex shrink-0 overflow-hidden rounded-full', sizes[size], className)}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }) {
  return <AvatarPrimitive.Image className={cn('aspect-square h-full w-full object-cover', className)} {...props} />
}

function AvatarFallback({ className, ...props }) {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full',
        'bg-primary/10 text-primary text-xs font-semibold',
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }
