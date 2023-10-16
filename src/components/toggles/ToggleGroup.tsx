import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={clsxm('flex items-center rounded-md border', className)}
    {...props}
  />
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroupPrimitive.Item
    ref={ref}
    className={clsxm(
      'px-3 py-1.5 whitespace-nowrap first:rounded-l-md last:rounded-r-md text-base-black data-[state=on]:bg-blue-500 data-[state=on]:text-white data-[state=off]:hover:bg-blue-50 border-r last:border-r-0 data-[state=on]:border-r-0 ring-inset focus:ring-2 focus:ring-blue-200 focus-visible:ring-2 data-[state=off]:focus-visible:ring-blue-500 focus:outline-none',
      className,
    )}
    {...props}
  />
));

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
