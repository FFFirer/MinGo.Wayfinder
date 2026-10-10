import { type Component, type JSX } from 'solid-js';

type IconButtonVariant = 'standard' | 'filled' | 'filledTonal' | 'outlined';
type IconButtonSize = 'small' | 'medium' | 'large';

interface IconButtonProps {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  children: JSX.Element;
  class?: string;
  title?: string;
}

const variantClasses: Record<IconButtonVariant, string> = {
  standard: 'text-on-surface-variant hover:bg-on-surface/8',
  filled: 'bg-primary text-on-primary hover:brightness-95',
  filledTonal: 'bg-secondary-container text-on-secondary-container hover:brightness-95',
  outlined: 'text-on-surface-variant border border-outline hover:bg-on-surface/8',
};

const sizeClasses: Record<IconButtonSize, string> = {
  small: 'w-8 h-8',
  medium: 'w-10 h-10',
  large: 'w-14 h-14',
};

const IconButton: Component<IconButtonProps> = (props) => {
  const {
    variant = 'standard',
    size = 'medium',
    disabled = false,
    onClick,
    children,
    class: className = '',
    title,
  } = props;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      title={title}
      class={`
        inline-flex items-center justify-center
        rounded-full
        transition-colors
        active:brightness-90
        disabled:opacity-38 disabled:pointer-events-none
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default IconButton;
