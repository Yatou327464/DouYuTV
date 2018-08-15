import React,{Component} from "react";
import "./index.css"
import axios from "axios";

class List extends Component{
	constructor(props){
		super(props);
		this.state = {
			datalist:[],
			nowPage:1
		};
	}


	render(){
		return (
			<div id="listBox">
				<div className="navBox">
					<span className="iconfont icon-bofang"></span>
					<p>刺激战场</p>
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
		axios.get(`/api/room/list?page=${this.state.nowPage}&type=jdqscjzc`).then(res=>{
			this.setState({
				datalist:res.data.data.list
			})
		})
	}

	handleClick(){
		// console.log(this.props.history);
		this.setState({
			nowPage : ++this.state.nowPage
		})
		axios.get(`/api/room/list?page=${this.state.nowPage}&type=jdqscjzc`).then(res=>{
			this.setState({
				datalist:[...this.state.datalist,...res.data.data.list]
			})
		})
	}


}
export default List
