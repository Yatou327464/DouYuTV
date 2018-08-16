import React,{Component} from "react"
import "./index.css"
import Navbar from '../Common/Navbar'
import Sidebar from '../Common/Sidebar'
import Classify from '../Common/Classify'
import { Carousel, WingBlank } from 'antd-mobile';
import axios from "axios"

class Home extends Component{
	constructor(props){
		super(props);
		this.state = {
			slideData: [],
            imgHeight: 210,
            slideIndex: 1,
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
        		

        		<WingBlank>
        		    <Carousel
        		      autoplay={true} 
                      infinite
                      autoplayInterval={1000}
                      dotStyle={{marginTop:'-20px'}}
                      dotActiveStyle={{marginTop:'-20px'}}
        		    >
        		      {this.state.slideData.map(item => (
        		        <a
        		          key={item.rid}
                          onClick={this.slideClick.bind(this,item)}
        		          style={{ display: 'inline-block', width: '100%' }}
        		        >
        		          <img
        		            src={`${item.pic}`}
        		            alt=""
        		            style={{ width: '100%', verticalAlign: 'top',height:"240px" }}
        		            onLoad={() => {
        		              window.dispatchEvent(new Event('resize'));
        		              this.setState({ imgHeight: 'auto' });
        		            }}
        		          />
        		        </a>
        		      ))}
        		    </Carousel>
        		</WingBlank>
        		
			</section>
			
       	)
	}
	//跳转到搜索页
	searchClick(){
		this.props.history.push("/search")
	}

	componentDidMount(){
		Promise.all([axios.get("/homeData.json")]).then(res=>{
            this.setState({
                slideData:res[0].data.slideList
            })
				// console.log("全部",res[0])
                console.log(res[0].data.slideList)

		}).catch(error=>{
			console.log(error)		
		})
	}
    //走马灯
    componentDidUpdate() {    
        if (this.state.slideIndex !== this.state.slideData.length - 1) {
          this.setState({ slideIndex: this.state.slideData.length - 1 });
        }
    }
    //走马灯传参进入详情页
    slideClick(item){
        this.props.history.push(`/detail/${item.rid}`)
    }
	
}

export default Home