import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTextAnimation } from '/src/hooks/useTextAnimation';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "./Register.css";
import { useAuth } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";

const Register = ({ isSignIn: initialIsSignIn, setIsSignIn }) => {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();

  // Local state for toggling Sign In/Sign Up mode
  const [isSignIn, setLocalIsSignIn] = useState(initialIsSignIn);

  // React Hook Form initialization with dynamic validation
  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur", // Validation occurs onBlur (field loses focus)
  });

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Delay function for simulating network delays
  const delay = (d) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  // Handle Registration
  const handleSignUp = async (data) => {
    try {
      // Simulate a network delay of 2 seconds
      await delay(2);

      const response = await axios.post("/api/v1/user/register", data);

      localStorage.setItem("MockApp", JSON.stringify(response.data));
      setAuthUser(response.data);

      toast.success(response.data.message || "User registered successfully!");
      reset(); // Reset form fields after successful registration
      setLocalIsSignIn(true); // Switch to sign-in mode after registration
      navigate("/Dashboard"); // Navigate to Dashboard after successful registration
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during registration."
      );
    }
  };

  // Handle Login
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Simulate a network delay of 2 seconds
      await delay(2);

      const response = await axios.post("/api/v1/user/login", {
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem("MockApp", JSON.stringify(response.data));
      setAuthUser(response.data);

      toast.success(response.data.message || "Logged in successfully!");
      navigate("/Dashboard"); // Redirects to the Dashboard after sign-in
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid login credentials.");
    }
  };

  return (
    <div className="login-page">
      <div class="shape-container">
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
        <div class="shape"></div>
      </div>
    <div
      className={`app-container ${isSignIn ? "sign-in-mode" : "sign-up-mode"}`}
    >
      

      {/* Sign-Up Section */}
      <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit(handleSignUp)} className={isSignIn ? "hidden" : ""}>
  <h1>Register</h1>
  <div className="infield">
    <input
      {...register("name", {
        required: { value: true, message: "Name is required" },
      })}
      type="text"
      placeholder="Name"
    />
    <label>Name</label>
    {errors.name && <span className="error">{errors.name.message}</span>}
  </div>
  <div className="infield">
    <input
      {...register("email", {
        required: { value: true, message: "Email is required" },
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email address",
        },
      })}
      type="email"
      placeholder="Email"
    />
    <label>Email</label>
    {errors.email && <span className="error">{errors.email.message}</span>}
  </div>
  <div className="infield">
    <input
      {...register("password", {
        required: { value: true, message: "Password is required" },
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters long",
        },
      })}
      type="password"
      placeholder="Password"
    />
    <label>Password</label>
    {errors.password && <span className="error">{errors.password.message}</span>}
  </div>
  <div className="infield">
    <input
      {...register("confirmPassword", {
        required: { value: true, message: "Confirm Password is required" },
        validate: (value) =>
          value === watch("password") || "Passwords do not match",
      })}
      type="password"
      placeholder="Confirm Password"
    />
    <label>Confirm Password</label>
    {errors.confirmPassword && (
      <span className="error">{errors.confirmPassword.message}</span>
    )}
  </div>
  
  <button className='Register-button' type="submit" disabled={isSubmitting}>
    Register
  </button>
  
</form>

      </div>

      {/* Sign-In Section */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleSignIn} className={isSignIn ? "" : "hidden"}>
          <h1>Login</h1>
          <div className="infield">
            <input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>
          <div className="infield">
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <Link to="#" className="forgot">
            Forgot your password?
          </Link>
          {/* <div className='Register-button'> */}
          <button className='Register-button' type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          {/* </div> */}
        </form>
      </div>

      {/* Overlay Section */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>{useTextAnimation('Welcome Back!',150,1000)}</h1>
            <p>{useTextAnimation('To keep connected, please log in with your personal info',32,1000)}</p>
            <button onClick={() => setLocalIsSignIn(true)}>Login</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>{useTextAnimation('Hello, Friend!',150,1000)}</h1>
            <p>{useTextAnimation('Enter your personal details and start your journey with us',32,1000)}</p>
            <button onClick={() => setLocalIsSignIn(false)}>Register</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
