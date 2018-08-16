import React,{Component} from "react"
import "./index.css"

class Detailbar extends Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}

	render(){
		return (
			<nav id="detailbar">
				<div className="detailbar-warp">
					<h1 className="logo">
						<a href="/home"><img src="./img/logo.jpg" alt="logo" width="100px"/></a>
					</h1>
					<button className="btn-app" onClick={this.appClick.bind(this)}>打开APP观看</button>
					<button className="btn-charge" onClick={this.chargeClick.bind(this)}>进入首页</button>
				</div>
				
					{this.props.children}
				
			</nav>
		)
	}
	appClick(){
		alert('这是app页面')
	}
	chargeClick(){
		alert('这是充值页面')
	}
}

export default Detailbar