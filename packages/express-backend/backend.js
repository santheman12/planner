// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js"

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.params["name"];
  userServices.getUsers(name)
  .then( result => {
    if (result.length > 0) {
        res.status(200).send({ user: result });
      } else {
        res.status(404).send("Resources not found.");
      }
  }).catch( err => {
    res.status(500).send("Internal Server Error.")
  })
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices.addUser(userToAdd)
  .then( result => {
    if (result.length > 0) {
      res.status(201).send(userToAdd);
    } else {
      res.status(404).send("Resources not found.");
    }
  }).catch( err => {
    res.status(500).send("Internal Server Error.")
  })
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; 
  userServices.findUserById(id)
  .then( result => {
    if (result.length > 0) {
      res.status(200).send({ user : result})
    } else {
      res.status(404).send("Resource not found.")
    }
  }).catch( err => {
    res.status(500).send("Internal Server Error.")
  })
}); 

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});