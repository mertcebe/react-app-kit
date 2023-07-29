import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import { combineReducers, createStore } from 'redux';



// const store = configureStore();

const initialState = {};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        ...action.payload
      }
    case "ADD_PERSONAL":
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}


const initialUsers = [];
const reducer2 = (state = initialUsers, action) => {
  switch (action.type) {
    case "ADD_USER_TO_USERS":
      return [
        ...state,
        action.user
      ]
    default:
      return state
  }
}

const store = createStore(
  combineReducers({
    signIn: reducer,
    users: reducer2
  })
);

const root = ReactDOM.createRoot(document.getElementById('root'));

const result = (
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
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
