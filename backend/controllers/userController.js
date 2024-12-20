import { isAuthenticated } from "../middlewares/auth.js";
import User from "../models/user.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = async (req, res) => {
    // Getting the details of the user from the request body
    const { name, email, password, role = "client", confirmPassword } = req.body; // Default role to 'client' if not provided

    if(password != confirmPassword){
        return res.status(400).send({
            success: false,
            message: "Password and confirm password does not match!",
        });
    }
    // Validate that all required fields are provided
    if (!name || !password || !email ) {
        return res.status(400).send({
            success: false,
            message: "All fields are required!",
        });
    }

    try {
        // Check if user is already registered using the email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "Email already registered!",
            });
        }

        // Create a user data object for registration
        const userData = {
            name,
            email,
            password,
            role,
        };

        // Store the user info in the database
        const user = await User.create(userData);

        // Generate a JSON Web Token (JWT) for the user
        sendToken(user, 201, res, "User registered successfully");
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).send({
            success: false,
            message: "An error occurred during registration. Please try again.",
        });
    }
};


// Login controller
export const login = async (req, res, next) => {
    const { role, email, password } = req.body;

    //if any of email or password is not entered
    if (!email || !password) {
        return res.status(400).send({
            success: false,
            message: "All fields are required!",
        });
    }

    //if the email is not found
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return res.status(400).send({
            success: false,
            message: "User not found",
        });
    }

   

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return res.status(400).send({
            success: false,
            message: "Invalid credentials",
        });
    }

    sendToken(user, 200, res, "User logged in successfully.");
};

// Logout functionality
export const logout = async (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json({
            success: true,
            message: "Logged out successfully.",
        });
};

// Read operation, user getting their details
export const getUser = async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
};