import mongoose from "mongoose";
import userModel from "./users.js";
import dotenv from "dotenv"

mongoose.set("debug", true);
dotenv.config()
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));


function findUserById(id) {
    return userModel.findById(id);
}

function getUsers(name) {
    let promise;
    if (name === undefined) {
      promise = userModel.find();
    } else {
      promise = findUserByName(name);
    }
    return promise;
}

function findUserByUsernameAndPassword(username, password) {
  return userModel.findOne({ username, password })
    .then((user) => {
      return user || null;
    });
}

function getUser(username, password) {
  // console.log({username, password})
  let promise;

  if (username === undefined && password === undefined) {
    promise = userModel.find();
  } else {
    promise = findUserByUsernameAndPassword(username, password);
  }

  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function deleteUser(id){
  return userModel.findOneAndDelete({ _id: id });
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  
  return promise
    .then(result => {
      // console.log('User added successfully:', result);
      return result;
    })
    .catch(error => {
      console.error('Error adding user:', error);
      throw error; // Rethrow the error to be caught in the higher level promise chain
    });
}

export default {
  getUsers,
  getUser,
  findUserById,
  deleteUser,
  addUser
};

