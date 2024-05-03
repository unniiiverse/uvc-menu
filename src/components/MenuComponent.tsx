import React, { HTMLProps, useState, useEffect, useRef } from "react";

import '../styles/menu.scss';

type TAnimation = 'default' | 'slideDown';

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
  animation?: TAnimation
}

interface IMenuItemProps extends HTMLProps<HTMLLIElement> {
  /** Item inner */
  children: React.ReactNode | React.ReactNode[],

  /** Item classname */
  className?: string
}



export const Menu: React.FC<IMenuProps> = ({ trigger, children, menuClassName, gap, animation }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Set default values to optional vars
  gap = gap || 16;
  animation = animation || 'default';

  /** Imitialize */
  useEffect(() => {
    const parent = ref.current;

    // Pass if parent is undefined
    if (!parent) return;

    const trigger = parent.querySelector('.uvc-menu_trigger')! as HTMLButtonElement;
    const menu = parent.querySelector('.uvc-menu')! as HTMLDivElement;

    if (!trigger || !menu) return;

    menu.style.top = `${trigger.offsetHeight + gap}px`;
  }, [])

  /** Handle state */
  useEffect(() => {
    const parent = ref.current;

    // Pass if parent is undefined
    if (!parent) return;

    const trigger = parent.querySelector('.uvc-menu_trigger')! as HTMLButtonElement;
    const menu = parent.querySelector('.uvc-menu')! as HTMLDivElement;

    if (!trigger || !menu) return;

    if (isOpen) {
      // Open menu

      menu.classList.add('uvc-menu--active');
      trigger.classList.add('uvc-menu_trigger--active');
    } else {
      // Close menu

      menu.classList.remove('uvc-menu--active');
      trigger.classList.remove('uvc-menu_trigger--active');
    }

    // Handle animation
    handleAnimation();

    // Handle closing
    function clickHandler(e: MouseEvent) {
      const self = e.target! as HTMLElement;
      const menu = self.closest('.uvc-menu');
      const trigger = self.closest('.uvc-menu_trigger')

      // Pass if click fired inside menu or on trigger
      if (menu || trigger) return;

      // Click fired outside menu, so close it
      setIsOpen(false)
    }

    window.addEventListener('click', clickHandler)

    return () => {
      window.removeEventListener('click', clickHandler)
    }
  }, [isOpen]);



  /** Toggle menu handler */
  function toggleMenu(e: React.MouseEvent) {
    setIsOpen(!isOpen)
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
      return
    } else if (animation === 'slideDown') {
      menu.style.transform = `translateY(${isOpen ? '0px' : '-40%'})`
    }
  }

  return (
    <div className="uvc-menu_wrapper uvc-menu_animation--slideDown" ref={ref}>
      <button className="uvc-menu_trigger" onClick={toggleMenu}>
        {trigger}
      </button>

      <div className={`uvc-menu ${menuClassName ? menuClassName : ''}`}>
        <ul className="uvc-menu_items">
          {children}
        </ul>
      </div>
    </div>
  );
}

export const MenuItem: React.FC<IMenuItemProps> = ({ children, className, ...props }) => {
  return (
    <li className={`uvc-menu_item ${className ? className : ''}`} {...props}>
      {children}
    </li>
  );
}
