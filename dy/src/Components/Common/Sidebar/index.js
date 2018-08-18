import React,{Component} from "react"
import "./index.css"
// import {ActivityIndicator} from "antd-mobile";
import {connect} from "react-redux";//用connect函数 处理自己写的组件，
import axios from "axios"
class Sidebar extends Component{
	constructor(props){
		super(props);
		this.state = {
			menuList:[{name:"推荐",shortName:"tj"}]
		}
	}

	render(){
		return (
			<div id="sidebar">
				<nav className="warp">
					<div className="warp-nav">
					{
			       	 this.state.menuList.map((item,index)=>
			        		<span key={item.shortName} className={index===0?'item cur':'item'} onClick={this.navLintClick.bind(this,item)}>
			       		 		{item.name}
			     		   		<b></b>
			     		   	</span>
			       	 )     
					}
					</div>
			    </nav>
			    {this.props.children}			    
			</div>
		)
	}
	componentDidMount() {
		Promise.all([axios.get("/api/cate/recList?cid=&ct=")]).then(res=>{
				this.setState({
					menuList:[...this.state.menuList,...res[0].data.data]
				})
		}).catch(error=>{
			console.log(error)		
		})
	}
	componentDidUpdate() {
	 
	}
	navLintClick(item){
		this.props.navListPage(item);//存储list数据到redux
		localStorage.setItem('listPage',JSON.stringify(item));//存储list数据到本地
		this.props.history.push(`/list/${item.shortName}`);
	}
	
}

export default connect(
	null,
	{
		navListPage(item){
		    return {
				type:"navListPage",
				payload:item
			}		
		}
	}
	)(Sidebar)