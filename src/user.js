import React, { Component } from "react";
import store from "./store";
import { HashRouter as Router } from "react-router-dom";

export default class User extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
    this.onClick = this.onClick.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onClick(ev) {
    this.props.updateUser(this.state.user, location.hash.slice(-1));
  }
  onSave(ev) {
    ev.preventDefault();
  }
  onChange(ev) {
    this.setState({ user: ev.target.value });
  }
  render() {
    const { users } = this.props;
    const { user } = this.state;
    const { onChange, onClick, onSave } = this;
    const id = location.hash.slice(-1);

    return (
      <div>
        {users.map(user => {
          if (user.id === id * 1) return <h1 key={user.id}>{user.name}</h1>;
        })}
        <form onSubmit={onSave}>
          <input value={user} onChange={onChange} />
          <button value={user} onClick={onClick}>
            create
          </button>
        </form>
      </div>
    );
  }
}
