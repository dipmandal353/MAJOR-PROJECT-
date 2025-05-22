"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useTextAnimation } from "/src/hooks/useTextAnimation"
import axios from "axios"
import toast from "react-hot-toast"
import "./Register.css"
import { useAuth } from "../../Context/AuthProvider"
import { Link } from "react-router-dom"
import { useIsMobile } from "./useIsMobile"

const Register = ({ isSignIn: initialIsSignIn, setIsSignIn }) => {
  const [authUser, setAuthUser] = useAuth()
  const navigate = useNavigate()
  const [isSignIn, setLocalIsSignIn] = useState(initialIsSignIn)
  const isMobile = useIsMobile()

  // Move hook calls outside of conditional rendering
  const welcomeBackText = useTextAnimation("Welcome Back!", 300, 1000)
  const keepConnectedText = useTextAnimation("To keep connected, please log in with your personal info", 100, 1000)
  const helloFriendText = useTextAnimation("Hello, Friend!", 300, 1000)
  const personalDetailsText = useTextAnimation("Enter your personal details and start your journey with us", 100, 1000)

  const {
    register,
    handleSubmit,
    setError,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  })

  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const handleSignUp = async (data) => {
    try {
      const response = await axios.post("/api/v1/user/register", data)
      localStorage.setItem("MockApp", JSON.stringify(response.data))
      setAuthUser(response.data)
      toast.success(response.data.message || "User registered successfully!")
      reset()
      setLocalIsSignIn(true)
      navigate("/Dashboard")
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during registration.")
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/v1/user/login", {
        email: loginEmail,
        password: loginPassword,
      })
      localStorage.setItem("MockApp", JSON.stringify(response.data))
      setAuthUser(response.data)
      toast.success(response.data.message || "Logged in successfully!")
      navigate("/Dashboard")
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid login credentials.")
    }
  }

  return (
    <div className="login-page">
      <div className="shape-container">
        {[...Array(10)].map((_, i) => (
          <div className="shape" key={i}></div>
        ))}
      </div>

      {isMobile ? (
        <div className="mobile-container">
          <div className="tab-switch">
            <button
              className={isSignIn ? "active-tab" : ""}
              onClick={() => {
                setLocalIsSignIn(true)
                if (setIsSignIn) setIsSignIn(true)
              }}
            >
              Login
            </button>
            <button
              className={!isSignIn ? "active-tab" : ""}
              onClick={() => {
                setLocalIsSignIn(false)
                if (setIsSignIn) setIsSignIn(false)
              }}
            >
              Register
            </button>
          </div>

          <div className="form-container-mobile">
            {isSignIn ? (
              <form onSubmit={handleSignIn}>
                <h1>Login</h1>
                <div className="infield">
                  <input
                    type="email"
                    placeholder="Email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="infield">
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Link to="#" className="forgot">
                  Forgot your password?
                </Link>
                <div className="button-wrapper">
                  <button className="Register-button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit(handleSignUp)}>
                <h1>Register</h1>

                <div className="infield">
                  <input
                    className={errors.name ? "input-error" : ""}
                    {...register("name", {
                      required: { value: true, message: "Name is required" },
                    })}
                    type="text"
                    placeholder="Name"
                  />
                  {errors.name && <span className="error-msg">{errors.name.message}</span>}
                </div>

                <div className="infield">
                  <input
                    className={errors.email ? "input-error" : ""}
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: { value: true, message: "Email is required" },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && <span className="error-msg">{errors.email.message}</span>}
                </div>

                <div className="infield">
                  <input
                    className={errors.password ? "input-error" : ""}
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                      required: { value: true, message: "Password is required" },
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                  {errors.password && <span className="error-msg">{errors.password.message}</span>}
                </div>

                <div className="infield">
                  <input
                    className={errors.confirmPassword ? "input-error" : ""}
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: { value: true, message: "Confirm Password is required" },
                      validate: (value) => value === watch("password") || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword.message}</span>}
                </div>

                <div className="button-wrapper">
                  <button className="Register-button" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting" : "Submit"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className={`app-container ${isSignIn ? "sign-in-mode" : "sign-up-mode"}`}>
          <div className="form-container sign-up-container">
            <form onSubmit={handleSubmit(handleSignUp)} className={isSignIn ? "hidden" : ""}>
              <h1>Register</h1>
              <div className="infield">
                <input
                  className={errors.name ? "input-error" : ""}
                  {...register("name", {
                    required: { value: true, message: "Name is required" },
                  })}
                  type="text"
                  placeholder="Name"
                />
                {errors.name && <span className="error-msg">{errors.name.message}</span>}
              </div>
              <div className="infield">
                <input
                  className={errors.email ? "input-error" : ""}
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && <span className="error-msg">{errors.email.message}</span>}
              </div>
              <div className="infield">
                <input
                  className={errors.password ? "input-error" : ""}
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                {errors.password && <span className="error-msg">{errors.password.message}</span>}
              </div>
              <div className="infield">
                <input
                  className={errors.confirmPassword ? "input-error" : ""}
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: { value: true, message: "Confirm Password is required" },
                    validate: (value) => value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword.message}</span>}
              </div>
              <input
                className="Register-button"
                type="submit"
                disabled={isSubmitting}
                value={isSubmitting ? "Submitting" : "Submit"}
              />
            </form>
          </div>

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
              </div>
              <div className="infield">
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Link to="#" className="forgot">
                Forgot your password?
              </Link>
              <div className="button-wrapper">
                <button className="Register-button" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>{welcomeBackText}</h1>
                <p>{keepConnectedText}</p>
                <button
                  onClick={() => {
                    setLocalIsSignIn(true)
                    if (setIsSignIn) setIsSignIn(true)
                  }}
                >
                  Login
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>{helloFriendText}</h1>
                <p>{personalDetailsText}</p>
                <button
                  onClick={() => {
                    setLocalIsSignIn(false)
                    if (setIsSignIn) setIsSignIn(false)
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register
