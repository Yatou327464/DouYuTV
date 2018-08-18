import React,{Component} from "react"
import "./index.css"
import axios from "axios";
// import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
// import {ActivityIndicator} from "antd-mobile";

class Anchor extends Component{
	constructor(props){
		super(props);
		this.state = {
			anchorList:[]
		}
	}

	render(){
		return (
			<div className="search-anchor">
			<ul>
			{	
				this.state.anchorList?
					this.state.anchorList.map((item,index)=>
						<li key={index} onClick={this.detailClick.bind(this,item)}>			
								<img src={item.avatar} alt={item.nickname}/>
								<div className="down-line">
									<p className="nickname">
										<span className="name">解放大道1237号</span>
										<span className="belive"></span>
									</p>
									<p className="follow">
										<span>热度：2.0万</span>
										<span>关注人数：368</span>
									</p>
								</div>
						</li>
					)
				:null		
			}	
			</ul>	
			</div>
		)
			
	}

	componentDidMount(){
		Promise.all([axios.get(`/api/search/getData?sk=${this.props.searchValue}&type=3&sort=1&limit=20&offset=0`)]).then(res=>{
	             console.log(res[0].data.data)
	             this.setState({
	                 anchorList:res[0].data.data.anchor                
	             })
	 		}).catch(error=>{
	 			console.log(error)	
	 	}) 
	 
	}
	componentWillReceiveProps(){
		Promise.all([axios.get(`/api/search/getData?sk=${this.props.searchValue}&type=3&sort=1&limit=20&offset=0`)]).then(res=>{
	             // console.log(res[0].data.data.anchor)
	             this.setState({
	                 anchorList:res[0].data.data.anchor                
	             })
	 		}).catch(error=>{
	 			console.log(error)	
	 	})      
	}
	detailClick(item){
		localStorage.setItem('detailPage',JSON.stringify(item));
		this.props.history.push(`/detail/${item.roomId}`)		
	}
	
}

export default withRouter(Anchor)