import React, { HTMLProps, useState, useEffect, useRef, RefObject } from "react";

import '../styles/menu.scss';

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
  menuClassName?: string

  /** Menu wrapper classname */
  className?: string

  /** Trigger button classname */
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
}

interface IMenuListProps extends HTMLProps<HTMLUListElement> {
  /** List inner */
  children: React.ReactNode | React.ReactNode[],
}



/** Dropdown menu */
export const Menu: React.FC<IMenuProps> = ({ trigger, children, className, gap, animation, align, direction, triggerClassName, id, ref, state, stateSetter, closeAfter, disabled, statePriority, menuClassName }) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(Boolean(state));

  // Set default values to optional vars
  gap = gap || 16;
  animation = animation || 'default';
  align = align || 'center';
  direction = direction || 'bottom';
  closeAfter = closeAfter || 'outMenu';
  disabled = Boolean(disabled);
  statePriority = statePriority || 'inner';



  /** Initialize */
  useEffect(() => {
    const parent = parentRef.current;

    // Pass if parent is undefined
    if (!parent) return;

    const trigger = parent.querySelector('.uvc-menu_trigger')! as HTMLButtonElement;
    const wrapper = parent.querySelector('.uvc-menu_wrapper')! as HTMLDivElement;

    if (!trigger || !wrapper) return;

    // Set position due to direction
    if (direction === 'bottom') {
      wrapper.style.top = `${trigger.offsetHeight + gap!}px`;
    } else if (direction === 'top') {
      wrapper.style.bottom = `${trigger.offsetHeight + gap!}px`;
    } else if (direction === 'left') {
      wrapper.style.right = `${trigger.offsetWidth + gap!}px`;
    } else if (direction === 'right') {
      wrapper.style.left = `${trigger.offsetWidth + gap!}px`;
    }

    // Set aligment
    if (align === 'center') {
      if (direction === 'left' || direction === 'right') {
        wrapper.style.bottom = `-${(wrapper.offsetHeight / 2) - (trigger.offsetHeight / 2)}px`;
      } else if (direction === 'top' || direction === 'bottom') {
        centerTBAlign();

        new ResizeObserver(centerTBAlign).observe(wrapper);
      }
    } else if (align === 'start') {
      if (direction === 'left' || direction === 'right') {
        wrapper.style.top = '0';
      } else if (direction === 'top' || direction === 'bottom') {
        wrapper.style.left = `0`;
      }
    } else if (align === 'end') {
      if (direction === 'left' || direction === 'right') {
        wrapper.style.bottom = '0';
      } else if (direction === 'top' || direction === 'bottom') {
        wrapper.style.right = `0`;
      }
    } else if (align === 'stretch') {
      if (direction === 'top' || direction === 'bottom') {
        wrapper.style.width = '100%';
      } else {
        // Use center alignment as default
        wrapper.style.bottom = `-${(wrapper.offsetHeight / 2) - (trigger.offsetHeight / 2)}px`;
        console.warn(`[uvc-menu]: Stretch alignment does not work on sides direction`);
      }
    }



    function centerTBAlign() {
      wrapper.style.left = `${(trigger.scrollWidth / 2) - (wrapper.scrollWidth / 2)}px`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);

    function handleClick(e: MouseEvent) {
      const self = e.target! as HTMLElement;
      const menu = self.closest('.uvc-menu');
      const trigger = self.closest('.uvc-menu_trigger');

      if (closeAfter === 'outMenu') {
        if (!menu) setIsOpen(false);
      } else if (closeAfter === 'any') {
        if (menu && !trigger) setIsOpen(false);
      }
    }

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isOpen])

  /** Handle state */
  useEffect(() => {
    if (statePriority === 'inner') {
      changeState(isOpen);
    } else if (statePriority === 'outer') {
      if (state === undefined || stateSetter === undefined) throw new Error('[uvc-menu]: State and stateSetter must be specified in outer priority mode');

      changeState(state);
    }
  }, [isOpen, state]);

  // Sync states
  useEffect(() => {
    stateSetter ? stateSetter(isOpen) : null;
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(Boolean(state));
  }, [state]);


  function changeState(isOpen: boolean) {
    const parent = parentRef.current;

    // Pass if parent is undefined
    if (!parent) return;

    const trigger = parent.querySelector('.uvc-menu_trigger')! as HTMLButtonElement;
    const menu = parent.querySelector('.uvc-menu_wrapper')! as HTMLDivElement;
    const items = parent.querySelectorAll('.uvc-menu_item') as NodeListOf<HTMLLIElement>;

    if (!trigger || !menu) return;

    if (isOpen) {
      // Open menu

      if (stateSetter) stateSetter(isOpen);

      menu.classList.add('uvc-menu--active');
      trigger.classList.add('uvc-menu_trigger--active');

      items.forEach(item => {
        item.tabIndex = 0;
      });

      menu.setAttribute('aria-hidden', 'false');
    } else {
      // Close menu

      if (stateSetter) stateSetter(isOpen);

      menu.classList.remove('uvc-menu--active');
      trigger.classList.remove('uvc-menu_trigger--active');

      items.forEach(item => {
        item.tabIndex = -1;
      });

      menu.setAttribute('aria-hidden', 'true');
    }

    // Handle animation
    handleAnimation(isOpen);
  }

  /** Toggle menu handler */
  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  /** Animation handler */
  function handleAnimation(isOpen: boolean) {
    const parent = parentRef.current;

    // Pass if parent is undefined
    if (!parent) return;

    const trigger = parent.querySelector('.uvc-menu_trigger')! as HTMLButtonElement;
    const menu = parent.querySelector('.uvc-menu_wrapper')! as HTMLDivElement;

    if (!trigger || !menu) return;

    if (animation === 'default') {
      return;
    } else if (animation === 'slide') {
      switch (direction) {
        case 'bottom': {
          menu.style.transform = `translateY(${isOpen ? '0px' : '-40%'})`;

          break;
        }

        case 'top': {
          menu.style.transform = `translateY(${isOpen ? '0px' : '40%'})`;

          break;
        }

        case 'left': {
          menu.style.transform = `translateX(${isOpen ? '0px' : '40%'})`;

          break;
        }

        case 'right': {
          menu.style.transform = `translateX(${isOpen ? '0px' : '-40%'})`;

          break;
        }
      }
    }
  }

  return (
    <div className={`uvc-menu ${menuClassName ? menuClassName : ''}`} ref={parentRef}>
      <button className={`uvc-menu_trigger ${triggerClassName ? triggerClassName : ''}`} onClick={toggleMenu} tabIndex={0} disabled={disabled}>
        {trigger}
      </button>

      <div className={`uvc-menu_wrapper ${className ? className : ''}`} role="menu" id={id} ref={ref}>
        {children}
      </div>
    </div>
  );
};

/** Menu list */
export const MenuList: React.FC<IMenuListProps> = ({ children, className, ...props }) => {
  return (
    <ul className={`uvc-menu_items ${className ? className : ''}`} {...props}>
      {children}
    </ul>
  );
};

/** Menu list item */
export const MenuItem: React.FC<IMenuItemProps> = ({ children, className, ...props }) => {
  return (
    <li className={`uvc-menu_item ${className ? className : ''}`} role="menuitem" tabIndex={-1} {...props}>
      {children}
    </li>
  );
};