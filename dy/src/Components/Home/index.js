import React,{Component} from "react"
import "./index.css"
import Navbar from '../Common/Navbar'
import Sidebar from '../Common/Sidebar'
import Classify from '../Common/Classify'
import axios from "axios"
import {connect} from "react-redux";

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			datalist:[],
			sideList:[],
			hotList:[],
			yzList:[],
			liveList:[],
			liveCount:0
		}
		
	}

	render(){
		return (
			<section id="home">
				<Navbar history={this.props.history}>
					<div className="search-ico" onClick={this.searchClick.bind(this)}>
						<span><b className="iconfont icon-magnifier"></b></span>
					</div>
				</Navbar>
     			
     			<Sidebar history={this.props.history}>	
     				<div className="navbar-classify">
        				<Classify history={this.props.history} titleShow={true}/>
        			</div>
        		</Sidebar>

        		<header>
        			<ol>
        			{
        				this.state.hotList.map(item=>
        				   <li key={item.rid}>
        				   	<div className="headerRoomshow">
        				   		<span className="headericoTop iconfont icon-zuire"> {item.hn} &nbsp;</span>
        				   		<img src={item.roomSrc} alt={item.nickname}/>
        				   		<span className="headericoBottom iconfont icon-wo"> {item.nickname}</span>
        				   	</div>
        				   	<p>{item.roomName}</p>
        				   </li>
        				)
        			}
        			</ol>
        		</header>

        		<main>
					{
						this.state.datalist.map(item=>
							<div className="room" key={item.cate2Info[0].cate2Id}>
								<h3>
									
									<p><img src={item.icon} alt={item.nickname}/><b>{item.tabName}</b></p>
									<i>
										{
											item.cate2Info.map(item=>
												<span key={item.cate2Id} onClick={this.moreClick.bind(this,item)}>{item.cate2Name}</span>
											)
										}
									</i>	
									<div onClick={this.moreClick.bind(this,item)}>更多<b>></b></div>
								</h3>
								<ul>
								{
									item.list.map(item=>
										<li key={item.rid} onClick={this.homelistClick.bind(this,item)}>
											<div className="hoomRoomshow">
												<span className="homeicoTop iconfont icon-zuire"> {item.hn} &nbsp;</span>
												<img src={item.roomSrc} alt={item.nickname}/>
												<span className="homeicoBottom iconfont icon-wo"> {item.nickname}</span>
											</div>
											<p>{item.roomName}</p>
										</li> 
									)
								}	
								</ul>
							</div>
						)
					}
				</main>
				<footer>
					<div className="box1" onClick={this.footClick.bind(this)}><span className="iconfont icon-fanhuidingbu"></span> 返回顶部</div>
					<div className="box2" onClick={this.dowClick.bind(this)}>下载客户端</div>
					<p>客服热线：027-87750710</p>
					<p>武汉斗鱼网络科技有限公司</p>
					<p>湖北省武汉市东湖开发区光谷软件园F4栋8楼</p>
					<p>版权所有 © www.douyu.com 鄂ICP备15011961号-1</p>
				</footer>
			</section>
			
       	)
	}

	componentDidMount(){
		axios.post('/api/proxy/douyu/index/https',{"url":"https://m.douyu.com/"}).then(res=>{
			this.setState({
			sideList:res.data.data.sideList,
			hotList:res.data.data.hotList[0].list,
			yzList:res.data.data.yzList,
			liveList:res.data.data.liveList,
			liveCount:res.data.data.liveCount
			})
		}).catch((err)=>{
			console.log('error')
		})

		axios.get("/api/home/mix").then(res=>{
			this.setState({
				datalist:res.data.data
			}
			
			)
		})		
	}

	homelistClick(item){
		this.props.detailPage(item);
		localStorage.setItem('detailPage',JSON.stringify(item));
		this.props.history.push(`/detail/${item.rid}/`);
	}

	//更多点击事件

	moreClick(item){
		this.props.navListPage(item);//存储list数据到redux
		// console.log('more',JSON.stringify(item))
		localStorage.setItem('listPage',JSON.stringify(item));//存储list数据到本地
		this.props.history.push(`/list/${item.shortName}`);
	}

	//返回顶部点击事件
	footClick(){
		window.scrollTo(0, 0);
	}

	//点击下载事件
	dowClick(){
		const w=window.open('about:blank');
		w.location.href='https://www.douyu.com/client?platform=0'
		}
	//跳转到搜索页
	searchClick(){
		this.props.history.push("/search")
	}
	
}

export default connect(
		null,
		{
			detailPage(item){
			    return {
					type:"detailPage",
					payload:item
				}		
			},
			navListPage(item){
			    return {
					type:"navListPage",
					payload:item
				}		
			}
		}
	)(Home)