import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Navbar from "./Components/Common/Navbar"
import Sidebar from "./Components/Common/Sidebar"

class App extends Component {
  render() {
    return (
      <div className="App">

        {
        	this.props.children
        	//路由容器
        }
      </div>
    );
  }
}

export default App;
