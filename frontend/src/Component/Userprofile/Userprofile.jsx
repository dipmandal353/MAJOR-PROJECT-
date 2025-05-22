"use client"

// Userprofile.jsx
import { useState, useEffect } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { User, Briefcase, School, Calendar, FileText, Lock, Save, Edit2 } from "lucide-react"
import Tracker from "./Tracker"
import "./Userprofile.css"

// [No changes to functional logic — just className updates below]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
}

const ProfilePage = () => {
  const [profile, setProfile] = useState({})
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    instituteName: "",
    YOP: "",
    profilepic: "",
    resume: "",
    updatePassword: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/v1/userprofile/me", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        setProfile(data.profile)
        setFormData({ ...data.profile, updatePassword: "" })
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch profile", err)
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUpdate = async () => {
    const { _id, user, __v, ...safeFormData } = formData
    try {
      await axios.put("/api/v1/userprofile/update-profile", safeFormData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      setEditMode(false)
    } catch (err) {
      console.error("Update failed", err.response?.data || err.message)
    }
  }

  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 50 + 20}s`,
    animationDelay: `${Math.random() * 50}s`,
  }))

  return (
    <div className="up-profile-page">
      <div className="up-background-gradient" />
      {stars.map((star) => (
        <div
          key={star.id}
          className="up-star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: star.left,
            top: star.top,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
          }}
        />
      ))}
      <div className="up-content-wrapper">
        <div className="up-header-with-pic">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="up-header"
          >
            <h2 className="up-title">User Profile</h2>
            <div className="up-title-underline" />
          </motion.div>

          <div className="up-profile-picture-hover">
            <label htmlFor="profileUpload" className="up-profile-picture-label">
              <img
                src={
                  formData.profilepic && typeof formData.profilepic !== "string"
                    ? URL.createObjectURL(formData.profilepic)
                    : "/placeholder-profile.jpg"
                }
                alt="Profile"
                className="up-profile-img"
              />
              {editMode && <div className="up-hover-text">Choose File</div>}
            </label>
            {editMode && (
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0]
                  if (file) {
                    setFormData({ ...formData, profilepic: file })
                  }
                }}
              />
            )}
          </div>
        </div>

        <div className="up-responsive-layout">
          {loading ? (
            <div className="up-loader-wrapper">
              <div className="up-spinner" />
              <div className="up-spinner-reverse" />
            </div>
          ) : (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="up-profile-box">
              <div className="up-form-section">
                <motion.div variants={containerVariants} className="up-form-grid">
                  {[
                    { label: "Name", icon: <User />, name: "name", type: "input" },
                    { label: "Profession", icon: <Briefcase />, name: "profession", type: "select" },
                    { label: "Institute Name", icon: <School />, name: "instituteName", type: "input" },
                    { label: "Year of Passing", icon: <Calendar />, name: "YOP", type: "input" },
                    // { label: "Profile Picture URL", icon: <ImageIcon />, name: "profilepic", type: "input" },
                    { label: "Select Resume", icon: <FileText />, name: "resume", type: "file" },
                  ].map((field, index) => (
                    <motion.div key={index} variants={itemVariants} className="up-form-box">
                      <div className="up-label-row">
                        <span className="up-icon">{field.icon}</span>
                        <label>{field.label}</label>
                      </div>
                      {field.type === "select" ? (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          disabled={!editMode}
                        >
                          <option value="">Select</option>
                          <option value="Student">Student</option>
                          <option value="Working Professional">Working Professional</option>
                        </select>
                      ) : field.type === "file" ? (
                        <>
                          <input
                            type="file"
                            name={field.name}
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              const file = e.target.files[0]
                              if (file) {
                                setFormData({ ...formData, resume: file })
                              }
                            }}
                            disabled={!editMode}
                          />

                          {formData.resume && typeof formData.resume !== "string" && (
                            <p className="up-file-name">{formData.resume.name}</p>
                          )}
                        </>
                      ) : (
                        <input
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          disabled={!editMode}
                        />
                      )}
                    </motion.div>
                  ))}

                  {editMode && (
                    <motion.div variants={itemVariants} className="up-form-box up-full-width">
                      <div className="up-label-row">
                        <span className="up-icon">
                          <Lock />
                        </span>
                        <label>Update Password</label>
                      </div>
                      <input
                        type="password"
                        name="updatePassword"
                        value={formData.updatePassword}
                        onChange={handleChange}
                      />
                    </motion.div>
                  )}
                </motion.div>

                <div className="up-button-row">
                  {editMode ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleUpdate}
                      className="up-save-button"
                    >
                      <Save size={18} /> Save Changes
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditMode(true)}
                      className="up-edit-button"
                    >
                      <Edit2 size={18} /> Edit Profile
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="up-tracker-section"
          >
            <Tracker />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
