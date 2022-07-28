/* import { createStore, applyMiddleware, compose } from "redux";
import { rootReducer } from "../reducer/reducer";
import thunk from "redux-thunk";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk))
);

export default store; */

import { applyMiddleware, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "../reducer/reducer";
import thunk from "redux-thunk";

const store = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(thunk))
);

export default store;
