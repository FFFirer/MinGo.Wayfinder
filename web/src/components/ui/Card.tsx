import { type Component, type JSX } from 'solid-js';

type CardVariant = 'elevated' | 'filled' | 'outlined';

interface CardProps {
  variant?: CardVariant;
  children: JSX.Element;
  class?: string;
}

const variantClasses: Record<CardVariant, string> = {
  elevated: 'bg-surface-container-low md-elevation-1',
  filled: 'bg-surface-variant',
  outlined: 'bg-surface border border-outline-variant',
};

const Card: Component<CardProps> = (props) => {
  const { variant = 'elevated', children, class: className = '' } = props;

  return (
    <div class={`card ${variantClasses[variant]} ${className}`}>
      <div class="card-body">{children}</div>
    </div>
  );
};

export default Card;
