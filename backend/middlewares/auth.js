import jwt from "jsonwebtoken"
import User from "../models/user.js"

//check for authentication
export const isAuthenticated = async(req, res, next) => {
    //getting the generated token
    const {token} = req.cookies;

    if(! token){
        return res.status(400).send({
            message : "User not authenticated"
        })
    }
    //Here the jwt.verify method to decode and validate the token using a secret key stored in an environment variable (JWT_SECRET_KEY). If the token is valid, decoded will contain the token's payload, which typically includes user information.
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    
    // queries the database to find a user by their ID, which is extracted from the decoded token
    req.user = await User.findById(decoded.id)
    next();
}

//check fort authorization
export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    // Check if the user is authenticated
    if (!req.user) {
      return res.status(401).send({
        message: "User not authenticated"
      });
    }

    // Check if the user's role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({
        message: "User not authorized to access this resource"
      });
    }

    next(); // User is authorized, proceed to the next middleware
  };
};
