import User from "../models/user.js";
import UserProfile from "../models/userProfile.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    const profile = await UserProfile.findOne({ user: userId });

    if (!user || !profile) {
      return res.status(404).json({
        success: false,
        message: "User or profile not found.",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
      profile,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      name,
      profession,
      instituteName,
      YOP,
      updatePassword
    } = req.body;

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    let profile = await UserProfile.findOne({ user: userId });

    // Handle files (Cloudinary URLs)
    const profilePicUrl = req.files?.profilepic?.[0]?.path;
    const resumeUrl = req.files?.resume?.[0]?.path;


    if (req.files && req.files['profilepic']) {
      profilepicUrl = req.files['profilepic'][0].path;
    } else if (req.file && req.file.fieldname === 'profilepic') {
      profilepicUrl = req.file.path;
    }

    if (req.files && req.files['resume']) {
      resumeUrl = req.files['resume'][0].path;
    }

    // Update user fields
    if (name) user.name = name;
    if (updatePassword) user.password = updatePassword;
    await user.save();

    // Create or update user profile
    if (profile) {
      profile.name = name || profile.name;
      profile.profession = profession || profile.profession;
      profile.instituteName = instituteName || profile.instituteName;
      profile.YOP = YOP || profile.YOP;
      if (profilepicUrl) profile.profilepic = profilepicUrl;
      if (resumeUrl) profile.resume = resumeUrl;

      await profile.save();

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        profile,
      });
    } else {
      const newProfile = await UserProfile.create({
        user: userId,
        name,
        profession,
        instituteName,
        YOP,
        profilepic: profilepicUrl,
        resume: resumeUrl,
      });

      return res.status(201).json({
        success: true,
        message: "Profile created successfully.",
        profile: newProfile,
      });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
    });
  }
};
