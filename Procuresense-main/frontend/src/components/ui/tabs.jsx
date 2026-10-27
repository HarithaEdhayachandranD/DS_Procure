import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/utils/cn'

const Tabs = TabsPrimitive.Root

function TabsList({ className, variant = 'default', ...props }) {
  return (
    <TabsPrimitive.List
      className={cn(
        variant === 'default' && 'inline-flex items-center gap-1 rounded-lg bg-muted p-1',
        variant === 'underline' && 'flex items-center gap-0 border-b border-border',
        variant === 'pills' && 'flex items-center gap-2',
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({ className, variant = 'default', ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium',
        'transition-all duration-150 select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        'disabled:pointer-events-none disabled:opacity-50',
        variant === 'default' && [
          'rounded-md px-3 py-1.5 text-muted-foreground',
          'data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-xs',
        ],
        variant === 'underline' && [
          'px-4 py-2.5 text-muted-foreground border-b-2 border-transparent -mb-px rounded-none',
          'data-[state=active]:text-primary data-[state=active]:border-primary',
        ],
        variant === 'pills' && [
          'rounded-full px-4 py-1.5 text-muted-foreground',
          'data-[state=active]:bg-primary data-[state=active]:text-primary-foreground',
        ],
        className
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      className={cn(
        'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'data-[state=active]:animate-fade-in',
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
