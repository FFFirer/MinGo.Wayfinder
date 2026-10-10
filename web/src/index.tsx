/* @refresh reload */
import { render } from 'solid-js/web';
import App from './app';
import './app.css';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Make sure you have added it to your index.html.'
  );
}

render(() => <App />, root!);
