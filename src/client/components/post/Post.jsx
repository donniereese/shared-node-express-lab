import React, { Component } from 'react';
import CommentList from './CommentList';

export default class Post extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({});
  }

  render() {
    return (
      <div className="post">
        <TitleBar />
        <ImageList />
        <StatsBar />
        <CommentBar />
        <CommentStatsBar />
        <CommentList />
      </div>
    );
  }
}

function TitleBar(props) {
  return (
    <div className="titlebar">
      <div className="title">{props.title}</div>
      <button className="previous">&lt;</button>
      <button className="next">NextPost &gt;</button>
    </div>
  )
}

function ImageList(props) {
  <div className="imagelist">
    <ul>
      {props.images.map((image, index) => {
        return (
          <li key={index}>
            <Image {...image}/>
          </li>
        );
      })}
    </ul>
  </div>
}

function Image(props) {
  <div className="image">
    <img src={props.image} alt="post"/>
    <p className="description">{props.description}</p>
  </div>
}

class StatsBar extends Component {
  constructor(props) {
    super(props);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.favorite = this.favorite.bind(this);
  }

  componentWillMount() {
    this.setState({});
  }

  render() {
    return (
      <div className="statsbar">
        <i className="upvote"></i>
        <i className="downvote"></i>
        <i className="favorite"></i>
        <Menu />
        <span className="points"></span>
        <span className="views"></span>
      </div>
    );
  }
}

class Menu extends Component {
  constructor(props) {
    super(props);
    this.reportPost = this.reportPost.bind(this);
    this.downloadPost = this.downloadPost.bind(this);
    this.embedPost = this.embedPost.bind(this);
  }

  componentWillMount() {
    this.setState({});
  }

  reportPost(event) {

  }
  downloadPost(event) {

  }
  embedPost(event) {

  }

  render() {
    return (
      <div className="menu">
        <button className="report"></button>
        <button className="download"></button>
        <button className="embed"></button>
      </div>
    );
  }
}

class CommentBar extends Component {
  constructor(props) {
    super(props);
    this.submitComment = this.submitComment.bind(this);
  }

  componentWillMount() {
    this.setState({});
  }

  submitComment(event) {

  }

  render() {
    return (
      <div className="commentbar">
        <input type="text" className="input" ref="input">
          <span className="charcount">{140 - this.refs.input.value.length}</span>
        </input>
          <button className="submit" onClick={this.submitComment}>Post</button>
      </div>
    );
  }
}

class CommentStatsBar extends Component {
  constructor(props) {
    super(props);
    this.expandAll = this.expandAll.bind(this);
    this.selectSort = this.selectSort.bind(this);
  }

  componentWillMount(){
    this.setState({});
  }

  expandAll(event) {

  }
  selectSort(event) {

  }

  render() {
    return (
      <div className="comment-stat-bar">
        <span className="comments">{this.props.commentCount}</span>
        <button className="expand" onClick={this.expandAll}>Expand All</button>
        <select onChange={this.selectSort} value="best">
          <option value="best">Best</option>
          <option value="new">New</option>
          <option value="top">Top</option>
        </select>
      </div>
    );
  }
}
