import React,{Component} from "react";
import {withRouter} from "react-router-dom";
import "./index.css";
import Detailbar from "./Detailbar"
import axios from "axios";
import store from "../../Redux"; //引入 公共store, "全局"store

import {connect} from "react-redux"; //用connect函数 处理自己写的组件，
//将自己写的组件 升级为容器组件（创建了一个容器组件包着自己的组件）

import Chat from "./Chat"
import Play from "./Play"
class Detail extends Component{

	constructor(props){
		super(props)
		this.state={
			isShow:false,
			detailImg:''
		}
	}



	componentDidMount(){
		// console.log(this.props.playObj)
		var newTitle = JSON.parse(window.localStorage.getItem('detailPage')).roomSrc
		console.log(newTitle)
		this.setState({
			detailImg:newTitle
		}) 
	}

	render(){
		return (
			<div id="detail">
				
				<div className="image">
				<Detailbar/>
					<img src={this.state.detailImg} width="100%"/>

				</div>
				<ul className="nav">
					<li onClick={this.a.bind(this)}>aa</li>
					<li onClick={this.b.bind(this)}>bb</li>
				</ul>
				
				{
					this.state.isShow?
					<Play history={this.props.history}
					 match ={this.props.match}/>:<Chat history={this.props.history}/>
				}
			</div>
		)
	}
	a(){
		this.setState({
			isShow:false
		})
	}
	b(){
		this.setState({
			isShow:true
		})
	}
	

}
export default connect(
	state=>{
			return {
				playObj:state.detailReducer
			}
	},
	null
	)(withRouter(Detail))