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
          active: props.selected,
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
  const anchorClasses = {
    'top start': 'dropdown-bottom dropdown-start',
    'top end': 'dropdown-bottom dropdown-end',
    'bottom start': 'dropdown-top dropdown-start',
    'bottom end': 'dropdown-top dropdown-end',
  };

  const currentAnchor = () => props.anchor ?? 'bottom start';

  return (
    <div class={`dropdown ${anchorClasses[currentAnchor()]}`}>
      {props.trigger}
      <ul tabindex="0" class={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 ${props.class ?? ''}`}>
        {props.children}
      </ul>
    </div>
  );
};

Menu.Item = MenuItem;

export { Menu, MenuItem };
export default Menu;
