import React,{Component} from "react"
import "./index.css"

class Live extends Component{
	constructor(props){
		super(props);
		this.state = {
		}
	}

	render(){
		return (
			<div className="search-live">
			{	
									this.props.searchLive?
										this.props.searchLive.map((item,index)=>
											<li key={item.cate2Id+index} >{item.nickname}</li>
										)
									:null		
								}	
			</div>
		)
			
	}



	componentDidMount(){
		console.log('live',this.props.searchLive)
	}
	componentWillReceiveProps(){
		console.log('live-updata',this.props.searchLive)
	}
	
}

export default Live