import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import  PropTypes  from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"

export class News extends Component {
  static defaultProps={
    country : 'in',
    pagesize : 8,
    category: 'general'
  }
  static propTypes={
    country : PropTypes.string,
    pagesize : PropTypes.number,
    category: PropTypes.string
  }
  constructor(props){
    super(props);
    this.state={
      articles : [],
      loading  : false,
      page : 1,
      totalResults : 0,
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }
  capitalizeFirstLetter=(string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  updateNews=async()=>{
    this.props.setProgress(0)
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData= await data.json();
    
    this.setState({
      articles : parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false,
        });

      this.props.setProgress(100)

    }
  async componentDidMount(){
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    }, () => {
      console.log(this.state.page); // This will show the updated page value
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pagesize}`;
      this.fetchDataAndUpdateState(url);
    });
  };
  
  fetchDataAndUpdateState = async (url) => {
    // this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      // Category has changed, fetch new articles
      this.setState({ page: 1, articles: []}, () => {
        this.updateNews();
        
      });
      this.setState({loading:false})
    }
  } 
  
  
  render(){
    return (
      <>
        <h1 className='text-center' style={{margin:'35px 0px' , marginTop:'90px' }}>NewsMonkey -  Top {this.capitalizeFirstLetter(this.props.category)} headlines   </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults }
          loader={<Spinner />}
        >
          <div className='container my-3'>
            <div className='row' >
              {this.state.articles.map((element)=>{
                return(<div className='col-md-4' key={element.url} >
                <Newsitem title={element.title? element.title.slice(0, 45) :""} 
                description={element.description? element.description.slice(0, 60) :""}
                imageUrl={element.urlToImage?element.urlToImage:
                "https://thehill.com/wp-content/uploads/sites/2/2023/03/UNC-Chapel-Hill-03182020.jpg?w=1280"}
                  url={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
              </div>) ;
              })}
              
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className='container d-flex justify-content-between'>
          <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
          <button type="button" disabled={(this.state.page + 1)>(Math.ceil(this.state.totalResults/this.props.pagesize))}
           className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}

        
      </>
    )
  }
}

export default News
