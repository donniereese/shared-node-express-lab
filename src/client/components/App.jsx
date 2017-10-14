import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  get static username() {
    return window.localStorage.getItem('username');
  }
  set static username(name) {
    window.localStorage.setItem('username', name || '$$unknown_user$$');
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    const formData = new FormData();
    console.log(this.refs.input.files);
    formData.append('user', App.username);
    Array.from(this.refs.input.files).forEach((meme) => formData.append('dank-memes', meme));
    axios.post('posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => console.log(res.data));
  }

  render() {
    return (
      <div className="app">
        <input type="file" multiple ref="input"/>
        <button onClick={this.onClick}>Submit</button>
      </div>
    );
  }
}
