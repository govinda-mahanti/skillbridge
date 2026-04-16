import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    designation: String,

    profileImg: String,

    email: String,

    department: String,

    location: {
      type: String,
    },

  },
  { timestamps: true }
);

const Faculty = mongoose.model("Faculty", facultySchema);
export default Faculty;