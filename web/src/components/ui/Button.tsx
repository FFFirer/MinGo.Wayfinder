import { type Component, type JSX } from 'solid-js';

type ButtonVariant = 'filled' | 'filledTonal' | 'outlined' | 'text' | 'elevated';
type ButtonType = 'button' | 'submit' | 'reset';

interface ButtonProps {
  variant?: ButtonVariant;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  children: JSX.Element;
  class?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  filled: 'btn-primary',
  filledTonal: 'bg-secondary-container text-on-secondary-container hover:bg-secondary-container/90',
  outlined: 'bg-transparent border border-outline text-primary hover:bg-primary/8',
  text: 'bg-transparent text-primary hover:bg-primary/8',
  elevated: 'bg-surface-container-low text-primary md-elevation-1 hover:bg-surface-container-low/90',
};

const Button: Component<ButtonProps> = (props) => {
  const {
    variant = 'filled',
    type = 'button',
    disabled = false,
    onClick,
    children,
    class: className = '',
  } = props;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      class={`btn ${variantClasses[variant]} md-label-large ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
