import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.newPost = this.newPost.bind(this);
    this.signIn = this.signIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }

  componentWillMount() {
    this.setState({});
  }

  newPost(event) {
    // open new post window
  }
  signIn(event) {
    // take you to login page
  }
  signUp(event) {

  }

  render() {
    return (
      <div className='header'>
        <img/>
        <button onClick={this.newPost}>New Dank Meme</button>
        <input type="text" placeholder="search" />
        <button onClick={this.signIn}>Sign In</button>
        <button onClick={this.signUp}>Sign Up</button>
      </div>
    );
  }
}
