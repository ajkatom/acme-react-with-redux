const express = require("express");
const app = express();
const path = require("path");
const db = require("./db");
const { Product, User } = db.models;
const port = process.env.PORT || 3000;
app.use(require("body-parser").json());

app.use("/dist", express.static(path.join(__dirname, "dist")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});

app.get("/api/products", (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});
app.get("/api/users", (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});
app.get("/api/users/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.send(user))
    .catch(next);
});
app.post("/api/users/", (req, res, next) => {
  User.create(req.body)
    .then(user => res.send(user))
    .catch(next);
});
app.delete("/api/users/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(user => res.send(user))
    .catch(next);
});
app.put("/api/users/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then(user => res.send(user))
    .catch(next);
});
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

db
  .sync()
  .then(() => {
    db.seed();
  })
  .then(() => {
    console.log("synced & seeded");
  })
  .catch(console.error);

module.exports = app;
