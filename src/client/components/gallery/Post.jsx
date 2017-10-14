import React, { Component } from 'react';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.goToPost = this.goToPost.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  componentWillMount() {
    this.setState({});
  }

  goToPost(event) {

  }
  upvote(event) {

  }
  downvote(event) {

  }

  render() {
    return (
      <div className="post">
        <div className="image-wrapper">
          <img src={this.props.image} onClick={this.goToPost}/>
          <div className="stats">
            <i className="upvote" onClick={this.upvote}></i>
            <i className="downvote" onClick={this.downvote}></i>
            <span className="points">{this.props.points}</span>
          </div>
        </div>
        <div className="post-info">
          <h2 className="title">{this.props.title}</h2>
          <span className="type">{this.props.type}</span>
          <span className="seperator">·</span>
          <span className="views">{this.props.views}</span>
        </div>
      </div>
    );
  }
}
