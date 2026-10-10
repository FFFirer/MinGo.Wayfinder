import { type Component, For, createSignal, type JSX } from 'solid-js';

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

const MenuItem: Component<MenuItemProps> = (props) => {
  const Icon = props.icon;

  return (
    <li>
      <button
        type="button"
        class="md-menu-item"
        classList={{
          'md-menu-item--selected': props.selected,
          'md-menu-item--disabled': props.disabled,
        }}
        disabled={props.disabled}
        onClick={props.onClick}
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
  const [isOpen, setIsOpen] = createSignal(false);

  const anchorClasses = {
    'top start': 'dropdown-bottom dropdown-start',
    'top end': 'dropdown-bottom dropdown-end',
    'bottom start': 'dropdown-top dropdown-start',
    'bottom end': 'dropdown-top dropdown-end',
  };

  const currentAnchor = () => props.anchor ?? 'bottom start';

  return (
    <div class={`dropdown ${anchorClasses[currentAnchor()]}`}>
      <div
        onClick={() => setIsOpen(!isOpen())}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
      >
        {props.trigger}
      </div>
      <ul
        tabindex="0"
        class={`md-menu ${props.class ?? ''}`}
        classList={{ 'md-menu--open': isOpen() }}
      >
        {props.children}
      </ul>
    </div>
  );
};

Menu.Item = MenuItem;

export { Menu, MenuItem };
export default Menu;
