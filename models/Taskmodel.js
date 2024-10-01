import mongoose from "mongoose";

const TaskSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        name: {
            type: String,
            required: [true, "Please provide a task name"],
            trim: true,
            maxLength: [20, "Name cannot be more than 20 characters"]
        },
        description: {
            type: String,
            required: [true, "Please provide a task description"]
        },
        priority: {
            type: String,
            required: [true, "Please provide a priority"],
            enum: {
                values: ["Low", "Medium", "High"],
                message: "Priority must be Low, Medium, or High"
            }
        },
        due: {
            type: Date
        },
        status: {
            type: String,
            required: [true, "Please provide a status"],
            enum: {
                values: ["Pending", "In Progress", "Completed"],
                message: "Status must be Pending, In Progress, or Completed"
            }
        }
    },
    {
        timestamps: true
    }
)

export const Taskmodel = mongoose.model('Task', TaskSchema)