import React, { Component } from 'react';
import Post from './Post';

export default class PostList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setState({});
  }

  render() {
    return (
      <div className="postlist">
        <ul>
          {this.props.posts.map((post, index) =>
            return (
              <li key={index}>
                <Post {...post}/>
              </li>
            );
          )}
        </ul>
      </div>
    );
  }
}
