import React,{Component} from "react";

import "./index.css";
import Navbar from "../Common/Navbar"
import axios from "axios";
import store from "../../Redux"; //引入 公共store, "全局"store

import {connect} from "react-redux"; //用connect函数 处理自己写的组件，
//将自己写的组件 升级为容器组件（创建了一个容器组件包着自己的组件）

import {NavLink }from "react-router-dom";
class Detail extends Component{

	constructor(){
		super()
		this.state={

		}
	}



	componentDidMount(){
		//1.得到传来的id
		// console.log(this.props.match.params.detailId)
		// //2.ajax
		axios.get("").then(res=>{
			// console.log(res.data)
		})
	}

	render(){
		return (
			<div id="detail">
				<Navbar/>
				<div className="image">
					detail
				</div>
				<ul className="nav">
					<li><NavLink to="/detail/chat" activeClassName="active">chat</NavLink></li>
					<li><NavLink to="/detail/play" activeClassName="active">play</NavLink></li>
				</ul>
				{this.props.children}
			</div>
		)
	}
}
export default Detail