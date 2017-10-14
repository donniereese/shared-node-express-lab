import React, { Component } from 'react';
import Comment from './Comment';

export default class CommentList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({});
  }

  render() {
    return (
      <div className="commentlist">
        <ul>
          {this.props.comments.map((comment, index) => {
            return (
              <li key={index}>
                <Comment {...comment} />
              </li>
            );
          })}        
        </ul>
      </div>
    );
  }
}
