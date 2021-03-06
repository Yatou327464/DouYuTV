import {
	HashRouter as Router, //as es6 导出模块重新命名
	Route, //每个单独的路径
	Redirect, //重定向
	Switch //匹配遇到的第一个
} from "react-router-dom";
// export {HashRouter,Route}
import React from "react"

import App from "../App"; //导入APP组件
import Home from "../Components/Home";
import Detail from "../Components/Detail";
import List from "../Components/List";
import Search from "../Components/Search";

import {Provider} from "react-redux"; //顶层组件，负责分发store
//给每个容器组件， 不需要我们自己引入store
import store from "../Redux"

const router = (
	<Provider store={store}>
	<Router>
		<App >
			<Switch>
				<Route path="/home" component={Home} />
				<Route path="/detail/:detailId" component={Detail}/>
				<Route path="/search" component={Search}/>
				<Route path="/list/:listId" component={List}/>
				<Redirect from="*" to="/home"/>
			</Switch>
		</App>
	</Router>
	</Provider>
)
export default router