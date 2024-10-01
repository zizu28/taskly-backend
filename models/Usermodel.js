import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please provide a username"]
        },
        email: {
            type: String,
            required: [true, "Please provide a unique email address"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please provide a password with a minimum of 6 characters"],
            minLength: 6
        },
        avatar: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export const Usermodel = mongoose.model('User', UserSchema)