import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import React, { Component } from 'react'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";




export default class App extends Component {
  pageSize=12
  apiKey=process.env.REACT_APP_NEWS_API
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar/>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
           
          />
          <Routes>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress}  apiKey={this.apiKey}pagesize={this.pageSize} category='entertainment' country='in' />}  /> 
            <Route exact path="/business"  element={<News setProgress={this.setProgress}  apiKey={this.apiKey} pagesize={this.pageSize} category='business' country='in' />}  /> 
            <Route exact path="/science" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} pagesize={this.pageSize} category='science' country='in' />}  /> 
            <Route exact path="/" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} pagesize={this.pageSize} category='general' country='in'/>}  /> 
            <Route exact path="/sports"  element={<News setProgress={this.setProgress}  apiKey={this.apiKey} pagesize={this.pageSize} category='sports' country='in' />}  /> 
            <Route exact path="/health" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} pagesize={this.pageSize} category='health' country='in' />}  /> 
            <Route exact path="/technology" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} pagesize={this.pageSize} category='technology' country='in' />}  /> 

          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}



