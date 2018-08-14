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

				
				<a onClick={this.a.bind(this)}>这是NavBar</a>

			</nav>
		)
	}
	a(){
		console.log(this)
	}
}

export default Navbar