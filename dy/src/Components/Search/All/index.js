import React,{Component} from "react"
import {withRouter} from "react-router-dom";
import "./index.css"
import axios from "axios";
import {connect} from "react-redux";
class All extends Component{
	constructor(props){
		super(props);
		this.state = {
		}
	}

	render(){
		return (
			<div className="search-all">
				<div className='search-all-anchor'>
					<h3 className="search-title">	
						<p>主播</p>
						<div onClick={this.moreClick.bind(this)}>更多<b>></b></div>
					</h3>
					<ul>
					{	
						this.props.searchAll.anchor?
							this.props.searchAll.anchor.map((item,index)=>
								<li key={item.cate2Id+index} onClick={this.detailClick.bind(this,item,index)}>
									<img src={item.avatar} alt={item.nickname}/>
									<p className="nickname">{item.nickname}</p>
									<p className="follow">{item.follow}人关注</p>
								</li>
							)
						:null		
					}						
					</ul>
				</div>

				<div className='search-all-live'>
					<h3 className="search-title">	
						<p>直播</p>
						<div onClick={this.moreClick.bind(this)}>更多<b>></b></div>
					</h3>
					<ul>
					{	
						this.props.searchAll.live?
							this.props.searchAll.live.map((item,index)=>
								<li key={item.cate2Id+index} onClick={this.detailClick.bind(this,item)}>
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

			</div>			
		)
			
	}



	componentDidMount(){
		console.log(this.props.searchAll.anchor)
	}
	moreClick(){

	}
	detailClick(item){

		
		localStorage.setItem('detailPage',JSON.stringify(item));
		this.props.history.push(`/detail/${item.roomId}`)
		
	}
	
	
}

export default withRouter(All)