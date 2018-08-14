import {createStore,combineReducers,applyMiddleware,compose } from "redux";// createStore
import classifyImgReducer from "./Reducer/classifyImgReducer";
import classifyNavReducer from "./Reducer/classifyNavReducer";
import listReducer from "./Reducer/listReducer";

import thunk from "redux-thunk";
import reduxpromise from "redux-promise";

const reducer = combineReducers({
	classifyImgReducer,
	classifyNavReducer,
	listReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(
applyMiddleware(thunk,reduxpromise)
  ));

export default store;
