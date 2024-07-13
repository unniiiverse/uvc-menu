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
  // Custom menu state
  const [state, setState] = useState(true)

  // This is inner of BUTTON element
  function Trigger() {
    return <p>Open</p>;
  }

  // Log current menu state. Can not be changed
  useEffect(() => console.log(state), [state])

  return (
    <div className="w-full h-full min-h-screen bg-[#888] p-[200px]">
      <Menu trigger={<Trigger />} animation="slide" direction="bottom" align="stretch" className={'uvc-menu--fancy'} state={state} stateSetter={setState}>
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

Menu state can be managed synthetically
```tsx
const Component: React.FC = () => {
  // Custom menu state
  const [state, setState] = useState(true)

  // This is inner of BUTTON element
  function Trigger() {
    return <p>Open</p>;
  }

  // Log current menu state. Can be changed
  useEffect(() => console.log(state), [state])

  return (
    <div className="w-full h-full min-h-screen bg-[#888] p-[200px]">
      <Menu trigger={<Trigger />} animation="slide" direction="bottom" align="stretch" className={'uvc-menu--fancy'} statePriority="outer" state={state} stateSetter={setState}>
        <p>hello</p>

        <MenuList>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
          <MenuItem>Item</MenuItem>
        </MenuList>
      </Menu>

      <button onClick={() => setState(!state)}>Out menu state setter</button>
    </div>
  );
};
```

## API
```ts
type TAnimation = 'default' | 'slide';
type TAlignment = 'start' | 'center' | 'end' | 'stretch';
type TDirection = 'top' | 'bottom' | 'left' | 'right';
type TCloseAfter = 'outMenu' | 'any';
type TStatePriority = 'inner' | 'outer';

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

  /** Menu ref */
  ref?: RefObject<any>

  /** Initial state.
   * @see statePriority
   * @default false
   */
  state?: boolean

  /** State priority
   * "inner" - State property will be readonly and can't be managed by code
   * "outer" - Requires stateSetter and state specified. State can be managed by code
   * 
   * @default "inner"
   */
  statePriority?: TStatePriority

  /** Open state setter */
  stateSetter?: (val: boolean) => void

  /** Close menu after action
   * "outMenu" - Menu will close when click event fired OUT of menu
   * "any" - Menu will close when click event fired ANYWHERE in the document (including menu)
   * 
   * @default 'outMenu'
   */
  closeAfter?: TCloseAfter

  /** Is menu disabled
   * @default false
   */
  disabled?: boolean
}

interface IMenuItemProps extends HTMLProps<HTMLLIElement> {
  /** Item inner */
  children: React.ReactNode | React.ReactNode[],

  /** Item classname */
  className?: string
}

interface IMenuListProps extends HTMLProps<HTMLUListElement> {
  /** List inner */
  children: React.ReactNode | React.ReactNode[],

  /** List classname */
  className?: string
}

```

## Get it now
```bash
npm install uvc-menu
```

Licensed under MIT | unniiiverse 2024