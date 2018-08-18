import React,{Component} from "react"
import "./index.css"
import Navbar from '../Common/Navbar'
import Sidebar from '../Common/Sidebar'
import Classify from '../Common/Classify'
import axios from "axios"
import {connect} from "react-redux";
import { Carousel, WingBlank } from 'antd-mobile';



class Home extends Component{
	constructor(props){
		super(props);
		this.state = {

			datalist:[],
			sideList:[],
			yzList:[],
			liveList:[],
			liveCount:0,
			hotAllList:[],
			hotList:[],
            hotNum:0,

			slideData: [],
            imgHeight: 210,
            slideIndex: 1
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

        		<WingBlank>
        		    <Carousel
        		      autoplay={true} 
        		            infinite
        		            autoplayInterval={1000}
        		            dotStyle={{marginTop:'-20px'}}
        		            dotActiveStyle={{marginTop:'-20px'}}
        		    >
        		      {this.state.slideData.map(item => (
        		        <a
        		          key={item.rid}
        		                onClick={this.slideClick.bind(this,item)}
        		          style={{ display: 'inline-block', width: '100%' }}
        		        >
        		          <img
        		            src={`${item.pic}`}
        		            alt=""
        		            style={{ width: '100%', verticalAlign: 'top',height:"240px" }}
        		            onLoad={() => {
        		              window.dispatchEvent(new Event('resize'));
        		              this.setState({ imgHeight: 'auto' });
        		            }}
        		          />
        		        </a>
        		      ))}
        		    </Carousel>
        		</WingBlank>

        		<header>
        			<div className="headerStyle headerHot">
        				<h3>
        					<div>
        						<span className="hot iconfont icon-zuire"></span>
        						<b>最热</b>
        					</div>
        					<p onClick={this.changeClick.bind(this)}>
        						<b>换一换</b>
        						<span className="change iconfont icon-refresh"></span>
        					</p>
        				</h3>
        				<ol>
        					{
        					this.state.hotList.map(item=>
        				  	 <li key={item.rid} onClick={this.homelistClick.bind(this,item)}>
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
        			</div>

        			<div className="headerStyle headerLive">
        				<h3>
        					<div >
        						<span className="hot iconfont icon-zhibo"></span>
        						<b> 正在直播</b>
        					</div>
        					<p   onClick={this.qbClick.bind(this)}>
        						<b>当前<i>{this.state.liveCount}</i>个直播</b>
        						<span>></span>
        					</p>
        				</h3>
        				<ol>
        					{
        					this.state.liveList.map(item=>
        				  	 <li key={item.rid} onClick={this.homelistClick.bind(this,item)}>
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
        			</div>

        			<div className="headerStyle headerYz">
        				<h3>
        					<div>
        						<span className="yz iconfont icon-fenlei-yanzhi"></span>
        						<b> 颜值</b>
        					</div>
        					<p  onClick={this.yzClick.bind(this)}>
        						<b>更多</b>
        						<span>></span>
        					</p>
        				</h3>
        				<ol>
        					{
        					this.state.yzList.map(item=>
        				  	 <li key={item.rid} onClick={this.homelistClick.bind(this,item)}>
        				   		<div className="headerRoomshow">
        				   			<span className="yzIco iconfont icon-zuire"> {item.hn} &nbsp;</span>
        				   			<img className="meinv" src={item.verticalSrc} alt={item.nickname}/>
        				   		</div>
        				   		<p className="headericoBottom iconfont icon-wo"> {item.nickname}</p>
        				   		<b className="iconfont icon-didian"> {item.liveCity}</b>
        				   	</li>
        						)
        					}
        				</ol>
        			</div>
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
		Promise.all([axios.get("/homeData.json")]).then(res=>{
            this.setState({
                slideData:res[0].data.slideList
            })
				// console.log("全部",res[0])

		}).catch(error=>{
			console.log(error)		
		})
		
		axios.post('/api/proxy/douyu/index/https',{"url":"https://m.douyu.com/"}).then(res=>{
			this.setState({
			sideList:res.data.data.sideList,
			hotList:res.data.data.hotList[0].list,
			yzList:res.data.data.yzList,
			liveList:res.data.data.liveList,
			liveCount:res.data.data.liveCount,
			hotAllList:res.data.data.hotList
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

	//换一换点击事件
	changeClick(){
		var num = (this.state.hotNum+1)%3;
		this.setState({
			hotNum:num,
			hotList:this.state.hotAllList[num].list
		})
	}


	//颜值点击事件
	yzClick(){
		localStorage.setItem('listPage',JSON.stringify({'tabName':'颜值'}));
		this.props.history.push(`/list/yz/`);
	}

	//全部点击事件
	qbClick(){
		
		localStorage.setItem('listPage',JSON.stringify({'tabName':'全部'}));
		this.props.history.push(`/list/room/`);
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


    //走马灯
    componentDidUpdate() {    
        if (this.state.slideIndex !== this.state.slideData.length - 1) {
          this.setState({ slideIndex: this.state.slideData.length - 1 });
        }
    }
    //走马灯传参进入详情页
    slideClick(item){
        this.props.history.push(`/detail/${item.rid}`)
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