import React,{Component} from "react";

// import "./index.css";
class List extends Component{
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
			<div>
				<a onClick={this.a.bind(this)}>这是List</a>
			</div>
		)
	}
	a(){
		console.log(this.props)
	}
}
export default List