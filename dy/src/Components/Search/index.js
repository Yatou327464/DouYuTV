import React,{Component} from "react"
import { SearchBar, Tabs} from 'antd-mobile';
import "./index.css"
import axios from "axios";
import {connect} from "react-redux";
import Live from "./Live"
import All from "./All"
import Anchor from "./Anchor"
import {ActivityIndicator} from "antd-mobile";
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
			searchList:null,
			searchValue:'',
			animating:false,
			initialPage:0
		}
	}

	render(){
		return (
			<div id="search">
				<div className="search-text" style={{touchAction: 'pan-y'}}>
					<SearchBar
					        placeholder="搜索房间/主播/分类"
					        ref={ref => this.manualFocusInst = ref}
					        showCancelButton={true}
					        value = {this.state.searchValue}
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
					        	initialPage={this.state.initialPage} animated={false} 
						   		tabBarActiveTextColor="#ff6d00"
						   		tabBarUnderlineStyle={{border:'none'}}
					        	>
					          	<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
						          	<All searchAll={this.state.searchList} navMore={navValue=>this.navMore(navValue)}/>
						          				         							         	
						        </div>
						       
						        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>

						          	<Live searchValue={this.state.searchValue} />
						        </div>
						        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
						        	<Anchor searchValue={this.state.searchValue}/>
						        </div>
					        </Tabs>

						</div>
					:
						<div className="search-hot">
							<h3>最近热搜</h3>
							<ul className="search-hot-list">
							{
								this.props.searchHotList.map((item,index)=>
									<li key={item} onClick={this.hotClick.bind(this,item)}>
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
				
				<ActivityIndicator
					                toast
					                text="Loading..."
					                animating={this.state.animating}
					           />  
			</div>
		)
	}
	
	searchClick(value){
		if (value!=='') {
			this.setState({
				searchValue:value,
				animating:true
			},()=>{
				Promise.all([axios.get(`/api/search/getData?sk=${value}&type=1&sort=1&limit=20&offset=0`)]).then(res=>{	
						this.setState({
							searchList:res[0].data.data,
							isShowPage:true,
							animating:false
						})
				}).catch(error=>{
					
				})
			})
			
		}
	}
	componentWillReceiveProps(){

	}
	icoBgColor(index){
		return	index<3?this.state.searchIco[index]:'#ccc'
	}

	componentDidMount(){

			if(this.props.searchHotList.length===0){
				this.props.searchHostList()				
			}
	}
	
	hotClick(value){
		// console.log(value)
		this.setState({
			searchValue:value
		},()=>this.searchClick(value))
	}
	//子传父，更多切换导航
	navMore(navValue){
		// console.log(this.state.isShowPage)
	   	this.setState({
	    	isShowPage:false,
	    	animating:true
	    },()=>
	    	this.setState({
		     	initialPage:navValue,
		     	isShowPage:true,
		     	animating:false
	    	})	
	    ) 
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