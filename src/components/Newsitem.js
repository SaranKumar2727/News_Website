import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {

    let {title,description,imageUrl,url,author,date, source} = this.props;

    return (
      <div className='my-3'>
        <div className="card" >
            <div style={{display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:'0'
            }}>
              <span className="badge rounded-pill bg-danger">{source}</span>
            </div>  
            <img src= {imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text">by {(author?author:'Unknown')} on {new Date(date).toGMTString()}</p>
                <a href={url} target="_blank" className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
