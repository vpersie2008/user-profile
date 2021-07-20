import { createStore, applyMiddleware, compose } from "redux";

// createStore(reducer,initState,applyMiddleware());
import thunk from 'redux-thunk';

//从 reducers/index.js中导入rootReducer
import rootReducer from './reducers'

const middleware = [thunk];

const initialState = {}

//Pass in rootreducer, initial state, extended middleware applymiddleware
const store = createStore(rootReducer, initialState,
    compose(applyMiddleware(...middleware)
        // ,window.__REDUX_DEVTOOLS_EXTENSION__ && 
        // window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default store;