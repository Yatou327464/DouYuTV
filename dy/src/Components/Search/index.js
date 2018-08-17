import React,{Component} from "react"
import { SearchBar, Button, WhiteSpace,Tabs, WingBlank ,Popover} from 'antd-mobile';
import "./index.css"
import axios from "axios";
import {connect} from "react-redux";
class Search extends Component{
	constructor(props){
		super(props);
		this.state = {
			tabs:[
			  { title: '全部' },
			  { title: '直播' },
			  { title: '主播' },
			  { title: '相关度' }
			],
			searchNav:'searchPage-nav',
			isShowPage:false,
			searchIco:['red','blue','green']
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
					        onCancel={this.searchClick.bind(this)}
					        onSubmit={this.searchClick.bind(this)}
					        cancelText='搜索'
					      />
				</div>
				{
					this.state.isShowPage?
						<div className="searchPage" >	
					        <Tabs tabs={this.state.tabs} 
					        	initialPage={0} animated={false} 
					        	prefixCls={this.state.searchNav}
						   		tabBarActiveTextColor="#ff6d00"
						   		tabBarUnderlineStyle={{border:'none'}}
					        	>
					          	{this.renderContent}
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
	
	searchClick(){
		console.log('搜索框发AJAX')

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
		state=>{
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