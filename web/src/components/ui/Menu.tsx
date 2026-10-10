import { type Component, type JSX, createSignal, onCleanup, onMount, createContext, useContext, createEffect } from 'solid-js';
import { computePosition, flip, shift, offset, autoUpdate, type Placement } from '@floating-ui/dom';

export interface MenuItemProps {
  icon?: Component;
  label: string;
  shortcut?: string;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

export interface MenuProps {
  anchor?: 'top start' | 'top end' | 'bottom start' | 'bottom end';
  trigger: JSX.Element;
  children: JSX.Element;
  class?: string;
}

interface MenuContextType {
  closeMenu: () => void;
}

const MenuContext = createContext<MenuContextType>();

const MenuItem: Component<MenuItemProps> = (props) => {
  const Icon = props.icon;
  const context = useContext(MenuContext);

  const handleClick = () => {
    props.onClick?.();
    context?.closeMenu();
  };

  return (
    <li>
      <button
        type="button"
        class="md-menu-item"
        classList={{
          active: props.selected,
        }}
        disabled={props.disabled}
        onClick={handleClick}
      >
        {Icon && (
          <div class="md-menu-item__icon">
            <Icon />
          </div>
        )}
        <span class="md-menu-item__label">{props.label}</span>
        {props.shortcut && <span class="md-menu-item__shortcut">{props.shortcut}</span>}
      </button>
    </li>
  );
};

const Menu: Component<MenuProps> = (props) => {
  let triggerRef: HTMLDivElement | undefined;
  let menuRef: HTMLUListElement | undefined;

  const [isOpen, setIsOpen] = createSignal(false);
  const [menuStyles, setMenuStyles] = createSignal<Partial<CSSStyleDeclaration>>({});

  const placementMap: Record<NonNullable<MenuProps['anchor']>, Placement> = {
    'top start': 'top-start',
    'top end': 'top-end',
    'bottom start': 'bottom-start',
    'bottom end': 'bottom-end',
  };

  const currentPlacement = () =>
    placementMap[props.anchor ?? 'bottom start'];

  const updatePosition = async () => {
    if (!triggerRef || !menuRef) return;

    const position = await computePosition(triggerRef, menuRef, {
      placement: currentPlacement(),
      middleware: [
        offset(4),
        flip({ padding: 8 }),
        shift({ padding: 8 }),
      ],
    });

    setMenuStyles({
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
    });
  };

  const closeMenu = () => setIsOpen(false);

  const handleTriggerClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      triggerRef &&
      !triggerRef.contains(event.target as Node) &&
      menuRef &&
      !menuRef.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    onCleanup(() => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    });
  });

  // 当菜单打开时，启动位置更新
  let cleanup: (() => void) | undefined;
  createEffect(() => {
    if (isOpen() && triggerRef && menuRef) {
      // 先更新一次位置
      updatePosition();
      // 然后启动自动更新
      cleanup = autoUpdate(triggerRef, menuRef, updatePosition);
    } else {
      cleanup?.();
      cleanup = undefined;
    }

    onCleanup(() => {
      cleanup?.();
    });
  });

  return (
    <MenuContext.Provider value={{ closeMenu }}>
      <div
        ref={triggerRef}
        class="md-menu-trigger"
        onClick={handleTriggerClick}
        aria-haspopup="true"
        aria-expanded={isOpen()}
      >
        {props.trigger}
      </div>
      {isOpen() && (
        <ul
          ref={menuRef}
          class={`md-menu-popover menu p-2 shadow bg-base-100 rounded-box w-52 ${props.class ?? ''}`}
          style={menuStyles()}
          role="menu"
        >
          {props.children}
        </ul>
      )}
    </MenuContext.Provider>
  );
};

Menu.Item = MenuItem;

export { Menu, MenuItem };
export default Menu;
