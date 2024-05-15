import React, { HTMLProps, useState, useEffect, useRef } from "react";

import '../styles/menu.scss';

type TAnimation = 'default' | 'slide';
type TAlignment = 'start' | 'center' | 'end' | 'stretch';
type TDirection = 'top' | 'bottom' | 'left' | 'right';

interface IMenuProps {
  /** Menu trigger inner. This is inner content of <button>. Passing another button element may cause nesting errors */
  trigger: React.ReactNode

  /** Menu elements */
  children: React.ReactNode | React.ReactNode[]

  /** Menu classname */
  menuClassName?: string

  /** Gap between trigger and menu
   * @default "16px"
   */
  gap?: number,

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
}

interface IMenuItemProps extends HTMLProps<HTMLLIElement> {
  /** Item inner */
  children: React.ReactNode | React.ReactNode[],

  /** Item classname */
  className?: string
}



export const Menu: React.FC<IMenuProps> = ({ trigger, children, menuClassName, gap, animation, align, direction }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Set default values to optional vars
  gap = gap || 16;
  animation = animation || 'default';
  align = align || 'center';
  direction = direction || 'bottom';



  /** Initialize */
  useEffect(() => {
    const parent = ref.current;

    // Pass if parent is undefined
    if (!parent) return;

    const trigger = parent.querySelector('.uvc-menu_trigger')! as HTMLButtonElement;
    const menu = parent.querySelector('.uvc-menu')! as HTMLDivElement;

    if (!trigger || !menu) return;

    // Set position due to direction
    if (direction === 'bottom') {
      menu.style.top = `${trigger.offsetHeight + gap!}px`;
    } else if (direction === 'top') {
      menu.style.bottom = `${trigger.offsetHeight + gap!}px`;
    } else if (direction === 'left') {
      menu.style.right = `${trigger.offsetWidth + gap!}px`;
    } else if (direction === 'right') {
      menu.style.left = `${trigger.offsetWidth + gap!}px`;
    }

    // Set aligment
    if (align === 'center') {
      if (direction === 'left' || direction === 'right') {
        menu.style.bottom = `-${(menu.offsetHeight / 2) - (trigger.offsetHeight / 2)}px`;
      } else if (direction === 'top' || direction === 'bottom') {
        menu.style.left = `${(trigger.offsetWidth / 2) - (menu.offsetWidth / 2)}px`;
      }
    } else if (align === 'start') {
      if (direction === 'left' || direction === 'right') {
        menu.style.bottom = '0';
      } else if (direction === 'top' || direction === 'bottom') {
        menu.style.left = `0`;
      }
    } else if (align === 'end') {
      if (direction === 'left' || direction === 'right') {
        menu.style.top = '0';
      } else if (direction === 'top' || direction === 'bottom') {
        menu.style.right = `0`;
      }
    } else if (align === 'stretch') {
      if (direction === 'top' || direction === 'bottom') {
        menu.style.width = '100%';
      } else {
        console.warn(`[uvc-menu]: Stretch alignment does not work on sides direction`);
      }
    }

  }, []);

  /** Handle state */
  useEffect(() => {
    const parent = ref.current;

    // Pass if parent is undefined
    if (!parent) return;

    const trigger = parent.querySelector('.uvc-menu_trigger')! as HTMLButtonElement;
    const menu = parent.querySelector('.uvc-menu')! as HTMLDivElement;
    const items = parent.querySelectorAll('.uvc-menu_item') as NodeListOf<HTMLLIElement>;

    if (!trigger || !menu) return;

    if (isOpen) {
      // Open menu

      menu.classList.add('uvc-menu--active');
      trigger.classList.add('uvc-menu_trigger--active');

      items.forEach(item => {
        item.tabIndex = 0;
      });
    } else {
      // Close menu

      menu.classList.remove('uvc-menu--active');
      trigger.classList.remove('uvc-menu_trigger--active');

      items.forEach(item => {
        item.tabIndex = -1;
      });
    }

    // Handle animation
    handleAnimation();

    // Handle closing
    function clickHandler(e: MouseEvent) {
      const self = e.target! as HTMLElement;
      const menu = self.closest('.uvc-menu');
      const trigger = self.closest('.uvc-menu_trigger');

      // Pass if click fired inside menu or on trigger
      if (menu || trigger) return;

      // Click fired outside menu, so close it
      setIsOpen(false);
    }

    window.addEventListener('click', clickHandler);

    return () => {
      window.removeEventListener('click', clickHandler);
    };
  }, [isOpen]);



  /** Toggle menu handler */
  function toggleMenu(e: React.MouseEvent) {
    setIsOpen(!isOpen);
  }

  /** Animation handler */
  function handleAnimation() {
    const parent = ref.current;

    // Pass if parent is undefined
    if (!parent) return;

    const trigger = parent.querySelector('.uvc-menu_trigger')! as HTMLButtonElement;
    const menu = parent.querySelector('.uvc-menu')! as HTMLDivElement;

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
    <div className="uvc-menu_wrapper uvc-menu_animation--slide" ref={ref}>
      <button className="uvc-menu_trigger" onClick={toggleMenu} tabIndex={0}>
        {trigger}
      </button>

      <div className={`uvc-menu ${menuClassName ? menuClassName : ''}`}>
        <ul className="uvc-menu_items" role="menu">
          {children}
        </ul>
      </div>
    </div>
  );
};

export const MenuItem: React.FC<IMenuItemProps> = ({ children, className, ...props }) => {
  return (
    <li className={`uvc-menu_item ${className ? className : ''}`} role="menuitem" tabIndex={-1} {...props}>
      {children}
    </li>
  );
};
