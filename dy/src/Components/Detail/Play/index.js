import React,{Component} from "react";

import axios from "axios";
import "./index.css";
class Play extends Component{

	constructor(props){
		super(props);
		this.state = {
			datalist:[]
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
							<li key={item.rid} onClick={this.handleClick.bind(this,item.id)}>
								<div className="every">
									<p className="img" style={{backgroundImage:`url(${item.roomSrc})`}}></p>
									<p className="article">{item.roomName}</p>
								</div>
							</li>
						)
					}
				</ul>
			</div>
		)
	}

	componentDidMount(){
		axios.get("/api/room/alikeList?rid=100&count=4").then(res=>{
			this.setState({
				datalist:res.data.data
				
			})

		})
	}

	handleClick(data){
		// console.log(this.props);
		//编程式导航
		// this.props.history.push(`/detail`)
	}
}
export default Play