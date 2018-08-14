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
				
				<Navbar history={this.props.history}/>

     			<Sidebar history={this.props.history}>	
        			<Classify history={this.props.history}/>
        		</Sidebar>
        		
			</section>
			
       	)
	}
	
}

export default Home