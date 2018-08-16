import React,{Component} from "react"
import "./index.css"
import Navbar from '../Common/Navbar'
import Sidebar from '../Common/Sidebar'
import Classify from '../Common/Classify'

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
		}
	}

	render(){
		return (
			<section id="home">
				
				<Navbar history={this.props.history}>
					<div className="search-ico" onClick={this.searchClick.bind(this)}>
						<span><b className="iconfont icon-magnifier"></b></span>
					</div>
				</Navbar>

     			<Sidebar history={this.props.history}>	
     				<div className="navbar-classify">
        				<Classify history={this.props.history} titleShow={true}/>
        			</div>
        		</Sidebar>
        		

        		
			</section>
			
       	)
	}
	//跳转到搜索页
	searchClick(){
		this.props.history.push("/search")
	}
	
}

export default Home