import React,{Component} from "react";
import "./index.css"
import axios from "axios";
import store from "../../Redux"; //引入 公共store ,“全局”store
import {connect} from "react-redux";//用connect函数 处理自己写的组件，

class List extends Component{
	constructor(props){
		super(props);
		this.state = {
			datalist:[],
			nowPage:1,
			title:'',
			shortName:''
		};
	}


	render(){
		return (
			<div id="listBox">
				<div className="navBox">
					<span className="iconfont icon-bofang"></span>
					<p>{this.state.title}</p>
				</div>
				<ul>
					{
						this.state.datalist.map(item=>
							<li key={item.rid}>
								<div className="roomShow">
									<span className="icoTop iconfont icon-zuire"> {item.hn} &nbsp;</span>
									<img src={item.roomSrc}/>
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
			</div>
		)
	}

	componentDidMount(){
		// console.log(this.props.titleObj);
		this.setState({
			title:this.props.titleObj.name,
			shortName:this.props.titleObj.shortName
		},()=>{
			axios.get(`/api/room/list?page=${this.state.nowPage}&type=${this.state.shortName}`).then(res=>{
					this.setState({
						datalist:res.data.data.list
					})
				});
		});
		//console.log('name',this.state.title);
		

		// store.subscribe(()=>{
		// 	this.setState({
		// 		title:store.getState()
		// 	})
		// })
		// console.log(this.props.titleObj);

		// store.dispatch({
		// 	type:"navListPage",
		// 	payload: "item"
		// })

	}

	handleClick(){
		// console.log(this.props.history);
		this.setState({
			nowPage : ++this.state.nowPage
		})
		axios.get(`/api/room/list?page=${this.state.nowPage}&type=${this.state.shortName}`).then(res=>{
			this.setState({
				datalist:[...this.state.datalist,...res.data.data.list]
			})
		})
	}


}
export default connect(
		state=>{
			return {
				titleObj:state.listReducer
			}
		}

	)(List)