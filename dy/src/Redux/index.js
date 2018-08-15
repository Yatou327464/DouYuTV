// import {createStore} from "redux"; //createStore

// //const store = new Vuex.Store() vue

// //reducer 纯函数 不依赖于外界的变量
// //并且不对外界产生副作用的函数 就是纯函数

// //reducer 接受的参数是一个数组 是浅复制
// //数组不能直接修改， 需要深复制一份再修改

// //reducer 接受的参数是一个对象 是浅复制
// //对象不能直接修改， 需要深复制一份再修改

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

