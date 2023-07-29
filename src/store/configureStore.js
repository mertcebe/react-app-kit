import { combineReducers, createStore, applyMiddleware } from 'redux'
// import todoReducer from '../reducers/todoReducer'
// import authReducer from '../reducers/authReducer'
import thunk from 'redux-thunk';
import { compose } from 'redux';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => {
    let store = createStore(
        combineReducers({
            // todos: todoReducer,
            // auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    )
    return store
}

export default configureStore