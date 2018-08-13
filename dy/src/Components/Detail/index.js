import React,{Component} from "react";

// import "./index.css";
class Detailindex extends Component{

	render(){
		return (
			<div>
				这是Detailindex
				{
					this.props.children
				}
			</div>
		)
	}
}
export default Detailindex