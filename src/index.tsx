import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import { register, unregister } from './serviceWorker';

(ReactDOM as any).createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (process.env.NODE_ENV === 'production') {
  if (process.env.ENABLE_SW === 'true') {
    register({
      onUpdate() {
        const alert = document.getElementById('new-version-alert');
        if (alert) {
          alert.style.display = 'block';
        }
      },
    });
  } else {
    unregister();
  }
}
