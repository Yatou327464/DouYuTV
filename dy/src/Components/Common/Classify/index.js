import React,{Component} from "react"
import "./index.css"


import {connect} from "react-redux";//用connect函数 处理自己写的组件，
import axios from "axios"
class Classify extends Component{
	constructor(props){
		super(props);
		this.state = {
			isShow:false,
			navIndex:0,
			imgList:[]
		}
	}

	render(){
		return (
			<nav id="classify">
				<div className="more">
						<i onClick={this.moreClick.bind(this)}>more</i>
				</div>
				<div className={this.state.isShow?'classify-all':'classify-all dis'} >
					<h2><span onClick={this.moreClick.bind(this)}>X</span>选择分类</h2>
				    <div className="classify-nav">
				    {
				        this.props.navList.map((item,index)=>
				        <span key={item.cate1Id} className={this.state.navIndex === index?'item cur':'item'} onClick={this.otherClick.bind(this,item,index)}>
				           	{item.cate1Name}
				         	<b></b>
				         </span>
				        )     
				    }
				    </div>
					<div className="classify-icon">
					{
						this.state.imgList.map(item=>
							<div key={item.cate2Id} className="box">
							   <p>
								  <img src={item.icon} alt={item.cate2Name}/>
							      <span>{item.cate2Name}</span>
							   </p>
							</div>
						)
					}
					</div>
				</div>
				    		  
			</nav>
		)
	}
	componentDidMount() {
		Promise.all([axios.get("/api/cate/list?type=")]).then(res=>{
			if(this.props.navList.length===1  ){
				this.props.classifynavList(res[0]);
			}
			if (this.props.imgList.length===0 ) {
				this.props.classifyimgList(res[0]);
			}
			this.setState({
					imgList:res[0].data.data.cate2Info
			})
		}).catch(error=>{
				console.log(error)//就是出错的信息		
		})
	}
	componentDidUpdate() {
	 
	}
	moreClick(){
		
		this.setState ({
			isShow :!this.state.isShow
		})
	}
	otherClick(item,index){
		var oldArr = this.props.imgList;
		if (item.cate1Id==='qb') {
			this.setState({
				imgList:this.props.imgList
			})
		}
		this.setState({
			navIndex:index
		})
		var newArr = []
		for (var i = 0; i < oldArr.length; i++) {
			if (oldArr[i].cate1Id === item.cate1Id) {
				newArr.push(oldArr[i])
				this.setState({
					imgList:newArr
				})
			}	
		}

	}
}

export default connect(
	state=>{
		return {
			navList:state.classifyNavReducer,
			imgList:state.classifyImgReducer
		}
	},
	{
		classifynavList(res){
			return {
					type:"classifynavList",
					payload:res.data.data.cate1Info
				}		
		},
		classifyimgList(res){
			return  {
					type:"classifyimgList",
					payload:res.data.data.cate2Info
				}	
		}
	}
	)(Classify)


