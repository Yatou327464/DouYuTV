import React,{Component} from "react";
import "./index.css"
import axios from "axios";
import {connect} from "react-redux";//用connect函数 处理自己写的组件，
import Navbar from '../Common/Navbar'
import Classify from '../Common/Classify'
import {ActivityIndicator} from "antd-mobile";
class List extends Component{
	constructor(props){
		super(props);
		this.state = {
			datalist:[],
			nowPage:1,
			title:'',
			shortName:'',
			animating:true
		};
	}
	render(){
		return (
			<div id="listBox">
				{/*引入navbar  并自己设计外部样式*/}
				<div className="list-navbarBg">
					<Navbar>
						<div className="list-classify">
							<Classify history={this.props.history} >
								<a className="list-classify-more">更多</a>
							</Classify>
						</div>
					</Navbar>
				</div>

				<div className="navBox">
					<span className="iconfont icon-bofang"></span>
					<p>{this.state.title}</p>
				</div>
				<ul>
					{ 
						this.state.datalist.map(item=>
							<li key={item.rid} onClick={this.listClick.bind(this,item)}>
								<div className="roomShow">
									<span className="icoTop iconfont icon-zuire"> {item.hn} &nbsp;</span>
									<img src={item.roomSrc} alt={item.nickname}/>
									<span className="icoBottom iconfont icon-wo"> {item.nickname}</span>
								</div>
								<p>{item.roomName}</p>
							</li>
						)
					}
				</ul>
				<div className="footBox" onClick={this.handleClick.bind(this)}>
					加载更多
				</div>
					<ActivityIndicator
					                toast
					                text="Loading..."
					                animating={this.state.animating}
					           />  
			</div>
		)
	}
	componentDidMount(){
		console.log(this)
		var newTitle = JSON.parse(window.localStorage.getItem('listPage')).name ||
		JSON.parse(window.localStorage.getItem('listPage')).cate2Name || 
		JSON.parse(window.localStorage.getItem('listPage')).tabName 
		this.setState({
			title:newTitle,
			animating:false
		},()=>{
			if(this.props.match.params.listId === 'room'){
				this.props.match.params.listId='';
			}
			axios.get(`/api/room/list?page=${this.state.nowPage}&type=${this.props.match.params.listId}`).then(res=>{
					this.setState({
						datalist:res.data.data.list
					})
				});
		});
	}
	componentWillReceiveProps(){
		var newTitle = JSON.parse(window.localStorage.getItem('listPage')).name ||
		JSON.parse(window.localStorage.getItem('listPage')).cate2Name ||
		JSON.parse(window.localStorage.getItem('listPage')).tabName 
		this.setState({
			title:newTitle,
			animating:true
		},()=>{
			axios.get(`/api/room/list?page=${this.state.nowPage}&type=${this.props.match.params.listId}`).then(res=>{
					this.setState({
						datalist:res.data.data.list,
						animating:false
					})
				});
		});
	}
	handleClick(){
		this.setState({
			nowPage : ++this.state.nowPage,
			animating:true
		},()=>
			axios.get(`/api/room/list?page=${this.state.nowPage}&type=${this.props.match.params.listId}`).then(res=>{
				this.setState({
					datalist:[...this.state.datalist,...res.data.data.list],
					animating:false
				})
			})
		)
		
	}
	listClick(item){
		// console.log(item)
		this.props.detailPage(item);
		localStorage.setItem('detailPage',JSON.stringify(item));
		this.props.history.push(`/detail/${item.rid}`);
	}

}
export default connect(
		state=>{
			return {
				titleObj:state.listReducer
			}
		},
		{
			detailPage(item){
			    return {
					type:"detailPage",
					payload:item
				}		
			}
		}
	)(List)


