import mongoose from "mongoose";

const labSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    img: String,

    coverImg: String,

    subHeading: String,

    about: {
      equipment: [String],
      cautions: [String],
    },

    lectureVideos: [String],

    labManual: String,

    arModel: String,

    vrModel: String,

    faculties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
      },
    ],

    documents: [
      {
        title: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

labSchema.index({ institute: 1 });

const Lab = mongoose.model("Lab", labSchema);
export default Lab;