import React,{Component} from "react"
import "./index.css"

class Navbar extends Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	render(){
		return (
			<nav id="navbar">
				<div className="navbar-warp">
					<a onClick={this.a.bind(this)}>这是NavBar</a>
				</div>
				<div className="navbar-other">
				{this.props.children}
				</div>
			</nav>
		)
	}
	a(){
		console.log(this)
	}
}

export default Navbar