import React, { Component } from "react";
import { Link } from "react-router-dom";
import store from "./store";

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
    this.onClick = this.onClick.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  onClick(ev) {
    this.props.createUser(this.state.user);
  }
  onSave(ev) {
    ev.preventDefault();
  }
  onChange(ev) {
    this.setState({ user: ev.target.value });
  }
  deleteUser(ev) {
    this.props.deleting(ev.target.value);
  }

  render() {
    const { users } = this.props;
    const { onClick, onSave, onChange, deleteUser } = this;
    const { user } = this.state;
    return (
      <div>
        <ul>
          {users.map(user => {
            return (
              <li key={user.id}>
                <Link to={`/api/users/${user.id}`}>{user.name}</Link>{" "}
                <button value={user.id} onClick={deleteUser}>
                  delete
                </button>
              </li>
            );
          })}
        </ul>
        <form onSubmit={onSave}>
          <input value={user} onChange={onChange} />
          <button value={user} onClick={onClick} disabled={!user.length}>
            create
          </button>
        </form>
      </div>
    );
  }
}
