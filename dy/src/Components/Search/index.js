import React,{Component} from "react"
import { SearchBar, Tabs} from 'antd-mobile';
import "./index.css"
import axios from "axios";
import {connect} from "react-redux";
import Live from "./Live"
import All from "./All"
import Anchor from "./Anchor"
class Search extends Component{
	constructor(){
		super();
		this.state = {
			tabs:[
			  { title: '全部' },
			  { title: '直播' },
			  { title: '主播' },
			  { title: '相关度' }
			],
			searchNav:'searchPage-nav',
			isShowPage:false,
			searchIco:['red','blue','green'],
			searchList:null
		}
	}

	render(){
		return (
			<div id="search">
				<div className="search-text">
					<SearchBar
					        placeholder="搜索房间/主播/分类"
					        ref={ref => this.manualFocusInst = ref}
					        showCancelButton={true}
					        // onCancel={(value)=>this.searchClick(value)}
					        onSubmit={(value)=>this.searchClick(value)}
					        onCancel={(value)=>this.searchClick(value)}
					        cancelText='搜索'
					      />
				</div>
				{
					this.state.isShowPage?
						<div className="searchPage" >	
					        <Tabs tabs={this.state.tabs} 
					        	initialPage={0} animated={false} 
						   		tabBarActiveTextColor="#ff6d00"
						   		tabBarUnderlineStyle={{border:'none'}}
					        	>
					          	<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
						          	<All searchAll={this.state.searchList} />
						          				         							         	
						        </div>
						       
						        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>

						          	<Live searchLive={this.state.searchList.live} />
						        </div>
						        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
						        	<Anchor/>
						        </div>
					        </Tabs>

						</div>
					:
						<div className="search-hot">
							<h3>最近热搜</h3>
							<ul className="search-hot-list">
							{
								this.props.searchHotList.map((item,index)=>
									<li key={item}>
										<span className='ico' 
											style={{background:this.icoBgColor(index)}}>
											{index+1}
										</span>
										<p className="text" >{item}</p>
									</li>
								)
							}
							</ul>
						</div>

				}
				
			</div>
		)
	}
	
	searchClick(value){
		if (value!=='') {
			Promise.all([axios.get(`/api/search/getData?sk=${value}&type=1&sort=1&limit=20&offset=0`)]).then(res=>{	
					this.setState({
						searchList:res[0].data.data,
						isShowPage:true
					})
			}).catch(error=>{
				
			})
		}
	}
	componentWillReceiveProps(){
		console.log('All-updata',this.props.searchAll)
	}
	icoBgColor(index){
		return	index<3?this.state.searchIco[index]:'#ccc'
	}

	componentDidMount(){

			if(this.props.searchHotList.length===0){
				this.props.searchHostList()				
			}
	}
	
}

export default connect(
		state=>{console.log(state)
			return {
				searchHotList:state.searchHotListReducer
			}
		},
		{
			searchHostList(){
				return	axios.get("/api/search/getTodayTop?count=10&isAjax=1").then(res=>{
					return {
						type:"searchHotList",
						payload:res.data.data
					}
				})
			}
		}
	)(Search)