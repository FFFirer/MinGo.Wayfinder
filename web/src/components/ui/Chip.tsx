import { type Component, type JSX, Show } from 'solid-js';

type ChipVariant = 'filled' | 'outlined' | 'tonal';

interface ChipProps {
  label: string;
  variant?: ChipVariant;
  color?: string;
  clickable?: boolean;
  icon?: JSX.Element;
  trailingIcon?: JSX.Element;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  class?: string;
}

const variantClasses: Record<ChipVariant, string> = {
  filled: 'bg-primary text-on-primary',
  outlined: 'bg-transparent border border-outline text-on-surface',
  tonal: 'bg-secondary-container text-on-secondary-container',
};

const Chip: Component<ChipProps> = (props) => {
  const {
    variant = 'tonal',
    clickable = false,
    onClick,
    class: className = '',
  } = props;

  const baseClasses = () => `
    inline-flex items-center gap-1.5
    h-8 px-3
    rounded-small
    md-label-large
    transition-colors
    ${variantClasses[variant]}
    ${clickable ? 'cursor-pointer hover:brightness-95 active:brightness-90' : ''}
    ${className}
  `;

  const content = () => (
    <>
      {props.icon && <span class="flex items-center w-4 h-4 -ml-1">{props.icon}</span>}
      <span>{props.label}</span>
      {props.trailingIcon && <span class="flex items-center w-4 h-4 -mr-1">{props.trailingIcon}</span>}
    </>
  );

  const style = () => props.color ? { 'border-color': props.color, color: props.color } : undefined;

  return (
    <Show
      when={clickable}
      fallback={
        <div class={baseClasses()} style={style()}>
          {content()}
        </div>
      }
    >
      <button type="button" class={baseClasses()} onClick={onClick} style={style()}>
        {content()}
      </button>
    </Show>
  );
};

export default Chip;
