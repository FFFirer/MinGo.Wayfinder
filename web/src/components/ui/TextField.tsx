import { type Component, type JSX, createSignal } from 'solid-js';

interface TextFieldProps {
  label: string;
  value: string;
  onInput: JSX.EventHandlerUnion<HTMLInputElement | HTMLTextAreaElement, InputEvent>;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  class?: string;
}

const TextField: Component<TextFieldProps> = (props) => {
  const [focused, setFocused] = createSignal(false);

  const baseClasses = `
    w-full px-4 py-3
    bg-transparent
    border rounded-small
    text-on-surface
    md-body-large
    transition-colors
    outline-none
    placeholder:text-on-surface-variant/50
  `;

  const borderClasses = () =>
    focused()
      ? 'border-primary border-2'
      : 'border-outline-variant hover:border-on-surface-variant';

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  return (
    <div class={`relative ${props.class ?? ''}`}>
      <label class={`
        absolute -top-2.5 left-3 px-1
        md-body-small
        bg-background
        transition-colors
        ${focused() ? 'text-primary' : 'text-on-surface-variant'}
        ${props.required ? "after:content-['*'] after:text-error after:ml-0.5" : ''}
      `}>
        {props.label}
      </label>
      {props.multiline ? (
        <textarea
          class={`${baseClasses} ${borderClasses()} resize-none`}
          value={props.value}
          onInput={props.onInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={props.rows ?? 4}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      ) : (
        <input
          type="text"
          class={`${baseClasses} ${borderClasses()}`}
          value={props.value}
          onInput={props.onInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={props.placeholder}
          disabled={props.disabled}
        />
      )}
    </div>
  );
};

export default TextField;
