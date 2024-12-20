import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  confirmPassword : {
    type : String
  },
  
  role: {
    type: String,
    enum: ['client', 'admin'], 
    default: 'client'
  }
  
},{timestamps:true});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // checks if the password field has been modified in the document,(i.e., it's not being changed)
  }

  this.password = await bcrypt.hash(this.password, 10);
  next(); 
});


//compare the hash password and the original password
userSchema.methods.comparePassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password)
}

//generating the token for the user
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// Create a User model
const  User = mongoose.model('User', userSchema);
export default User
