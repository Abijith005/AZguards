import { Schema, model } from "mongoose";

const statusEnum = ["pending", "completed", "in-progress"];

const todoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    status: {
      type: String,
      enum: statusEnum,
      validate: {
        validator: function (status:string) {
          return statusEnum.includes(status);
        },
        message: 'Invalid status value'
      },
      required: true,
    },
  },
  { timestamps: true }
);


const Todo = model("Todo", todoSchema);

export default Todo;
