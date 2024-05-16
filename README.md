# React menu

Simple react menu with typescript interfaces.

## Usage
Default component usage
```tsx
import React from "react";
import { Menu, MenuItem, MenuList } from "uvc-menu";

// Required styling
import 'uvc-menu/css'


const Component: React.FC = () => {
  // This is inner of BUTTON element
  function Trigger() {
    return <p>Open</p>;
  }

  return (
    <div className="w-full h-full min-h-screen bg-[#888] p-[200px]">
      <Menu trigger={<Trigger />} animation="slide" direction="bottom" align="stretch" className={'uvc-menu--fancy'}>
        <p>hello</p>

        <MenuList>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};

export default Component;
```

## API
```ts
type TAnimation = 'default' | 'slide';
type TAlignment = 'start' | 'center' | 'end' | 'stretch';
type TDirection = 'top' | 'bottom' | 'left' | 'right';

interface IMenuProps {
  /** Menu trigger inner. This is inner content of <button>. Passing another button element may cause nesting errors */
  trigger: React.ReactNode

  /** Menu elements */
  children: React.ReactNode | React.ReactNode[]

  /** Menu classname */
  className?: string

  /** Trigger classname */
  triggerClassName?: string

  /** Gap between trigger and menu
   * @default "16px"
   */
  gap?: number

  /** Menu appearing animation
   * @default "default"
   */
  animation?: TAnimation,

  /** Menu alignment with trigger
   * @default "center"
   */
  align?: TAlignment

  /** Menu opening direction
   * @default "bottom"
   */
  direction?: TDirection

  /** Menu id */
  id?: string
}

interface IMenuItemProps extends HTMLProps<HTMLLIElement> {
  /** Item inner */
  children: React.ReactNode | React.ReactNode[],

  /** Item classname */
  className?: string
}

interface IMenuListProps extends HTMLProps<HTMLUListElement> {
  /** Item inner */
  children: React.ReactNode | React.ReactNode[],

  /** Item classname */
  className?: string
}
```

## Get it now
```bash
npm install uvc-menu
```

Licensed under MIT | unniiiverse 2024