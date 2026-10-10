import { type Component, type JSX } from 'solid-js';

type ButtonVariant = 'filled' | 'outlined' | 'text' | 'elevated';
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
  filled: 'btn-primary rounded-small',
  outlined: 'btn-outline btn-primary rounded-small',
  text: 'btn-ghost text-primary rounded-small',
  elevated: 'btn-primary shadow-md rounded-small',
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
