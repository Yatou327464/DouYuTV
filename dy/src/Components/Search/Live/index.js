import React,{Component} from "react"
import "./index.css"
import axios from "axios";
import {withRouter} from "react-router-dom";
// import {ActivityIndicator} from "antd-mobile";
class Live extends Component{
	constructor(props){
		super(props);
		this.state = {
			liveList:[]
		}
	}

	render(){
		return (
			<div className="search-live">
			<ul>
			{	
				this.state.liveList?
					this.state.liveList.map((item,index)=>
						<li key={index} onClick={this.detailClick.bind(this,item)}>
							<div className="roomShow">
								<span className="icoTop iconfont icon-zuire">{item.hn}</span>	
								<img src={item.roomSrc} alt={item.nickname}/>
								<span className="icoBottom iconfont icon-wo"> {item.nickname}</span>
							</div>
							<p>{item.roomName}</p>
						</li>
					)
				:null		
			}	
			</ul>
			</div>
		)
			
	}



	componentDidMount(){
		Promise.all([axios.get(`/api/search/getData?sk=${this.props.searchValue}&type=2&sort=1&limit=20&offset=0`)]).then(res=>{
	             // console.log(res[0].data.data.live)
	             this.setState({
	                 liveList:res[0].data.data.live                
	             })
	 		}).catch(error=>{
	 			console.log(error)	
	 	}) 
	 
	}
	componentWillReceiveProps(){
		Promise.all([axios.get(`/api/search/getData?sk=${this.props.searchValue}&type=2&sort=1&limit=20&offset=0`)]).then(res=>{
	             // console.log(res[0].data.data.live)
	             this.setState({
	                 liveList:res[0].data.data.live                
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

export default withRouter(Live)