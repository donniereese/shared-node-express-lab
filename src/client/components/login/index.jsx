import React, { Component } from 'react';
import App from './App';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.setState({});
  }

  onClick(event) {
    if (this.refs.username.value)
      App.username = this.refs.username.value;
    // send to home page
  }

  render() {
    return (
      <div className="login">
        <input type="text" className="username" ref='username' />
        <input type="password" className="password" ref='password' />
        <button className="login" onClick={this.onClick}>Login</button>
      </div>
    )
  }
}
