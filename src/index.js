import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';



// const store = configureStore();


const root = ReactDOM.createRoot(document.getElementById('root'));

const result = (
  <React.StrictMode>
      <AppRouter />
  </React.StrictMode>
)


const renderApp = () => {
  return (
    result
  )
}

root.render(
  renderApp()
);



reportWebVitals();
