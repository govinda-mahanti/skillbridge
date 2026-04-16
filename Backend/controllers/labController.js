import Lab from "../models/labModel.js";

export const createLab = async (req, res) => {
  try {
    const {
      name,
      subHeading,
      about,
      lectureVideos,
      labManual,
      arModel,
      vrModel,
      faculties,
    } = req.body;

    // ✅ Safe parsing only
    let parsedAbout = {};
    let parsedVideos = [];
    let parsedFaculties = [];

    try {
      parsedAbout = about ? JSON.parse(about) : {};
      parsedVideos = lectureVideos ? JSON.parse(lectureVideos) : [];
      parsedFaculties = faculties ? JSON.parse(faculties) : [];
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format",
      });
    }

    // ✅ Files
    const img = req.files?.img?.[0]?.path || "";
    const coverImg = req.files?.coverImg?.[0]?.path || "";

    const documents =
      req.files?.documents?.map((file) => ({
        title: file.originalname,
        url: file.path,
      })) || [];

    const lab = await Lab.create({
      name,
      img,
      coverImg,
      subHeading,
      about: parsedAbout,
      lectureVideos: parsedVideos,
      labManual,
      arModel,
      vrModel,
      faculties: parsedFaculties,
      documents,
    });

    res.status(201).json({
      success: true,
      message: "Lab created successfully",
      data: lab,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLab = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };

    // ✅ Safe parsing only
    try {
      if (req.body.about) updateData.about = JSON.parse(req.body.about);
      if (req.body.lectureVideos)
        updateData.lectureVideos = JSON.parse(req.body.lectureVideos);
      if (req.body.faculties)
        updateData.faculties = JSON.parse(req.body.faculties);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format",
      });
    }

    // ✅ Files
    if (req.files?.img) {
      updateData.img = req.files.img[0].path;
    }

    if (req.files?.coverImg) {
      updateData.coverImg = req.files.coverImg[0].path;
    }

    if (req.files?.documents) {
      updateData.documents = req.files.documents.map((file) => ({
        title: file.originalname,
        url: file.path,
      }));
    }

    const updatedLab = await Lab.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("faculties");

    res.status(200).json({
      success: true,
      message: "Lab updated successfully",
      data: updatedLab,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.find()
      .populate("faculties")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: labs.length,
      data: labs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};