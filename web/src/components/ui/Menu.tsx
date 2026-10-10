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
    if (!props.disabled) {
      props.onClick?.();
      context?.closeMenu();
    }
  };

  return (
    <li role="none">
      <button
        type="button"
        role="menuitem"
        class="md-menu-item"
        classList={{
          active: props.selected,
        }}
        disabled={props.disabled}
        onClick={handleClick}
        aria-disabled={props.disabled}
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

const MenuDivider: Component = () => {
  return <li role="separator"><div class="md-menu-divider" /></li>;
};

interface MenuComponent extends Component<MenuProps> {
  Item: typeof MenuItem;
  Divider: typeof MenuDivider;
}

const Menu: MenuComponent = Object.assign(
  (props: MenuProps) => {
    let triggerRef: HTMLDivElement | undefined;
    let menuRef: HTMLUListElement | undefined;

    const [isOpen, setIsOpen] = createSignal(false);
    const [posX, setPosX] = createSignal('0');
    const [posY, setPosY] = createSignal('0');

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

      setPosX(`${position.x}px`);
      setPosY(`${position.y}px`);
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

    let cleanup: (() => void) | undefined;
    createEffect(() => {
      if (isOpen() && triggerRef && menuRef) {
        updatePosition();
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
            style={{ position: 'absolute', left: posX(), top: posY() }}
            role="menu"
          >
            {props.children}
          </ul>
        )}
      </MenuContext.Provider>
    );
  },
  {
    Item: MenuItem,
    Divider: MenuDivider,
  }
);

export { Menu, MenuItem, MenuDivider };
export default Menu;
