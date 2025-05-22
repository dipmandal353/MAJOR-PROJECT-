import mongoose from "mongoose";

const userProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    name: {
        type: String,
    },
    profession: {
        type: String,
        enum : ["Student","Working Professional"],
        required : true
    },
    instituteName: {
        type: String,
        required : true
    },
    YOP: {
        type: Number,
        required : true
    },
    updatePassword: {
        type: Number,
    },
    profilepic: {
        type: String,
    },
    resume: {
        type: String,
    }
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

export default UserProfile;
