import React,{Component} from "react";

import axios from "axios";
import "./index.css";

class Play extends Component{

	constructor(props){
		super(props);
		this.state = {
			datalist:[],
			newdetail:0
		}
	}

	render(){
		return (
			<div id="play">
				<div className="title">

				</div>
				<h3>相关直播</h3>
				<ul className="list">
					{
						this.state.datalist.map(item=>
							<li key={item.rid} onClick={this.handleClick.bind(this,item.rid)}>
								
									<p className="img" style={{backgroundImage:`url(${item.roomSrc})`}}></p>
									<p className="article">{item.roomName}</p>
								
							</li>
						)
					}
				</ul>
				<div className="main">打开斗鱼APP，看更多精彩内容</div>
			</div>
		)
	}

	componentDidMount(){
		var newpage = JSON.parse(window.localStorage.getItem("detailPage")).rid
		this.setState({newdetail:newpage},()=>{
			axios.get(`/api/room/alikeList?rid=${this.state.newdetail}&count=4`).then(res=>{
				this.setState({datalist:res.data.data})
			})
		})
	}

	handleClick(data){
		console.log(data);
		//编程式导航
		
			this.props.history.push(`/detail/${data}`);
	
		
	}
}
export default Play;