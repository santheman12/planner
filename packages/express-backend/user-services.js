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

function findUserByName(name) {
  return userModel.find({ name: name });
}

function deleteUser(id){
  return userModel.findOneAndDelete({ _id: id });
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

export default {
  getUsers,
  findUserById,
  deleteUser,
  addUser
};

