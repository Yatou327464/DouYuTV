import {createStore,combineReducers,applyMiddleware,compose } from "redux";// createStore
import classifyImgReducer from "./Reducer/classifyImgReducer";
import classifyNavReducer from "./Reducer/classifyNavReducer";
import listReducer from "./Reducer/listReducer";
import detailReducer from "./Reducer/detailReducer";
import searchHotListReducer from "./Reducer/searchHotListReducer";


import thunk from "redux-thunk";
import reduxpromise from "redux-promise";

const reducer = combineReducers({
	classifyImgReducer,
	classifyNavReducer,
	listReducer,
	detailReducer,
	searchHotListReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,composeEnhancers(
applyMiddleware(thunk,reduxpromise)
  ));

export default store;
