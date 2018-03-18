import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Products from "./products";
import Nav from "./nav";
import axios from "axios";
import store from "./store";
import { render } from "react-dom";
import Users from "./users";

export default class Main extends Component {
  constructor() {
    super();
    this.state = store.getState();
    this.createUser = this.createUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }
  createUser(user) {
    axios
      .post("/api/users", { name: user })
      .then(res => res.data)
      .then(user => {
        store.dispatch({
          type: "CREATE_USERS",
          user
        });
      })
      .catch(console.error);
  }
  deleteUser(id) {
    axios
      .delete(`/api/users/${id}`, id)
      .then(res => res.data)
      .then(user => {
        store.dispatch({
          type: "DELETE_USER",
          id
        });
      })
      .catch(console.error);
  }
  componentDidMount() {
    axios
      .get("/api/products")
      .then(res => res.data)
      .then(products => {
        store.dispatch({
          type: "SET_PRODUCTS",
          products
        });
        const unsubscribe = store.subscribe(() => {
          this.setState(store.getState());
        });
      })
      .catch(console.error);
    axios
      .get("/api/users")
      .then(res => res.data)
      .then(users => {
        store.dispatch({
          type: "SET_USERS",
          users
        });
      });
    const unsubscribe = store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const { products, users } = this.state;
    const { createUser, deleteUser } = this;
    return (
      <Router>
        <div>
          <Nav />
          <Route
            path="/api/products"
            exact
            component={() => <Products products={products} />}
          />
          <Route
            path="/api/users"
            exact
            component={() => (
              <Users
                users={users}
                createUser={createUser}
                deleting={deleteUser}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}
