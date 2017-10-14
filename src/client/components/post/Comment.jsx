import React, { Component } from 'react';
import CommentList from './CommentList';

export default class Comment extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({});
  }

  render() {
    return (
      <div className="comment">
        <h6 className="username"></h6>
        <span className="via"></span>
        <a href="" className="platform"></a>
        <span className="timestamp"></span>
        <Menu></Menu>
        <button className="reply"></button>
        <i className="upvote"></i>
        <i className="downvote"></i>
        <p className="text"></p>
        {this.props.children != null && this.props.children.length > 0 &&
          this.props.children.map((child) => {
            return (
              <div className="child">
                <CommentList {...child}/>
              </div>
            );
          })
        }
      </div>
    );
  }
}
