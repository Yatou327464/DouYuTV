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
				<div className="more" onClick={this.moreClick.bind(this)}>
						<i className="iconfont icon-icon" ></i>
						{
							this.props.children
						}
				</div>

				<div className={this.state.isShow?'classify-all':'classify-all dis'} >

					{//这是传是否显示选择分类的头
						this.props.titleShow?
							<h2>
								<i onClick={this.moreClick.bind(this)}>X</i>
								<span>选择分类</span>
							</h2>
						:''
					}
					
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
							<div key={item.cate2Id} className="box" onClick={this.imgListClick.bind(this,item)}>
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
		//判断navList长度，如果没有数据像redux请求ajax
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
	//点击更多重置数据到全部
	moreClick(){
		this.setState ({
			isShow :!this.state.isShow,
			navIndex:0,
			imgList:this.props.imgList
		})
	}
	//点击导航求获取img数据
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
	//点击进入详情页
	imgListClick(item){
		this.setState ({
			isShow :false
		})
		localStorage.setItem('listPage',JSON.stringify(item));//存储list数据到本地
		this.props.history.push(`/list/${item.shortName}`)
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


