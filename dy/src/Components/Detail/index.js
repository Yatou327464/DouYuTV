import React,{Component} from "react";
import {withRouter} from "react-router-dom";

// import "./index.css";
class Detailindex extends Component{
	constructor(props){
		super(props);
		this.state = {
		};
	}
	render(){
		return (
			<div>
				这是Detailindex
				{
					this.props.children
				}
				<button onClick={this.jump.bind(this)}> tiao zhuan </button>
			</div>
		)
	}
	componentDidMount(){
		console.log(this)
	}
	jump(){
		this.props.history.push("/index");
	}
}
export default withRouter(Detailindex)