import React,{Component} from "react"
import "./index.css"
import {connect} from "react-redux";

class Anchor extends Component{
	constructor(props){
		super(props);
		this.state = {
		}
	}

	render(){
		return (
			<div className="search-anchor">
			
			</div>
		)
			
	}



	componentDidMount(){
		
	}
	
}

export default connect(
	state=>{
		return{
			searchValue:state.searchValueReducer
		}
	},
	null)(Anchor)