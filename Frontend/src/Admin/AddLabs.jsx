import React, { useState, useRef, useEffect } from "react";
import {
  Pencil,
  Trash2,
  Upload,
  X,
  MoreVertical,
  Users,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddLabs = () => {
  const [labs, setLabs] = useState([
    {
      _id: "1",
      name: "Physics Lab 101",
      subHeading: "Mechanics · Thermodynamics · Electromagnetism",
      about: {
        equipment: ["Oscilloscope", "Multimeter"],
        cautions: ["High voltage present", "Wear safety goggles"],
      },
      arModel: "https://example.com/ar/physics",
      vrModel: "https://example.com/vr/physics",
      lectureVideos: ["physics_intro.mp4"],
      labManual: "physics_manual.pdf",
      img: "",
      coverImg: "",
      documents: [{ title: "Lab Guide", url: "https://example.com/guide.pdf" }],
      attendeesCount: 45,
    },
    {
      _id: "2",
      name: "Chemistry Lab A",
      subHeading: "Organic & Inorganic Experiments",
      about: {
        equipment: ["Bunsen burner", "Beakers"],
        cautions: ["No open flames near solvents"],
      },
      arModel: "",
      vrModel: "https://example.com/vr/chemistry",
      lectureVideos: [],
      labManual: "",
      img: "",
      coverImg: "",
      documents: [],
      attendeesCount: 32,
    },
  ]);

  const emptyForm = {
    name: "",
    subHeading: "",
    img: null,
    coverImg: null,
    about: { equipment: [""], cautions: [""] },
    lectureVideos: [],
    labManual: null,
    arModel: "",
    vrModel: "",
    documents: [{ title: "", url: "" }],
  };

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const [newLab, setNewLab] = useState(emptyForm);
  const [editingLab, setEditingLab] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (labId) => {
    setOpenMenuId(openMenuId === labId ? null : labId);
  };

  const handleAttendees = (labId, labName) => {
    navigate("/dashboard/attendees");
    setOpenMenuId(null);
  };

  // ── simple field change ──────────────────────────────────────
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "add") setNewLab({ ...newLab, [name]: value });
    else setEditingLab({ ...editingLab, [name]: value });
  };

  // ── single-file fields ───────────────────────────────────────
  const handleFileChange = (e, type, fieldName) => {
    const file = e.target.files[0];
    if (type === "add") setNewLab({ ...newLab, [fieldName]: file });
    else setEditingLab({ ...editingLab, [fieldName]: file });
  };

  const removeFile = (type, fieldName) => {
    if (type === "add") setNewLab({ ...newLab, [fieldName]: null });
    else setEditingLab({ ...editingLab, [fieldName]: null });
  };

  // ── about.equipment / about.cautions ────────────────────────
  const handleAboutChange = (type, key, index, value) => {
    if (type === "add") {
      const arr = [...newLab.about[key]];
      arr[index] = value;
      setNewLab({ ...newLab, about: { ...newLab.about, [key]: arr } });
    } else {
      const arr = [...editingLab.about[key]];
      arr[index] = value;
      setEditingLab({
        ...editingLab,
        about: { ...editingLab.about, [key]: arr },
      });
    }
  };

  const addAboutItem = (type, key) => {
    if (type === "add")
      setNewLab({
        ...newLab,
        about: { ...newLab.about, [key]: [...newLab.about[key], ""] },
      });
    else
      setEditingLab({
        ...editingLab,
        about: { ...editingLab.about, [key]: [...editingLab.about[key], ""] },
      });
  };

  const removeAboutItem = (type, key, index) => {
    if (type === "add") {
      const arr = newLab.about[key].filter((_, i) => i !== index);
      setNewLab({ ...newLab, about: { ...newLab.about, [key]: arr } });
    } else {
      const arr = editingLab.about[key].filter((_, i) => i !== index);
      setEditingLab({
        ...editingLab,
        about: { ...editingLab.about, [key]: arr },
      });
    }
  };

  // ── lectureVideos (multi-file) ───────────────────────────────
  const addLectureVideo = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    if (type === "add")
      setNewLab({ ...newLab, lectureVideos: [...newLab.lectureVideos, file] });
    else
      setEditingLab({
        ...editingLab,
        lectureVideos: [...editingLab.lectureVideos, file],
      });
  };

  const removeLectureVideo = (type, index) => {
    if (type === "add")
      setNewLab({
        ...newLab,
        lectureVideos: newLab.lectureVideos.filter((_, i) => i !== index),
      });
    else
      setEditingLab({
        ...editingLab,
        lectureVideos: editingLab.lectureVideos.filter((_, i) => i !== index),
      });
  };

  // ── documents [{title, url}] ─────────────────────────────────
  const handleDocChange = (type, index, key, value) => {
    if (type === "add") {
      const docs = [...newLab.documents];
      docs[index] = { ...docs[index], [key]: value };
      setNewLab({ ...newLab, documents: docs });
    } else {
      const docs = [...editingLab.documents];
      docs[index] = { ...docs[index], [key]: value };
      setEditingLab({ ...editingLab, documents: docs });
    }
  };

  const addDocument = (type) => {
    if (type === "add")
      setNewLab({
        ...newLab,
        documents: [...newLab.documents, { title: "", url: "" }],
      });
    else
      setEditingLab({
        ...editingLab,
        documents: [...editingLab.documents, { title: "", url: "" }],
      });
  };

  const removeDocument = (type, index) => {
    if (type === "add")
      setNewLab({
        ...newLab,
        documents: newLab.documents.filter((_, i) => i !== index),
      });
    else
      setEditingLab({
        ...editingLab,
        documents: editingLab.documents.filter((_, i) => i !== index),
      });
  };

  // ── CRUD ─────────────────────────────────────────────────────
  const handleAddLab = () => {
    if (!newLab.name) {
      alert("Please fill in required fields (Name)");
      return;
    }
    const newLabEntry = {
      _id: Date.now().toString(),
      name: newLab.name,
      subHeading: newLab.subHeading,
      about: {
        equipment: newLab.about.equipment.filter(Boolean),
        cautions: newLab.about.cautions.filter(Boolean),
      },
      arModel: newLab.arModel,
      vrModel: newLab.vrModel,
      img: newLab.img ? newLab.img.name : "",
      coverImg: newLab.coverImg ? newLab.coverImg.name : "",
      lectureVideos: newLab.lectureVideos.map((f) =>
        f instanceof File ? f.name : f,
      ),
      labManual: newLab.labManual ? newLab.labManual.name : "",
      documents: newLab.documents.filter((d) => d.title && d.url),
      attendeesCount: 0,
    };
    setLabs([...labs, newLabEntry]);
    alert("Lab added successfully!");
    setNewLab(emptyForm);
    setAddModalOpen(false);
  };

  const openEditModal = (lab) => {
    setEditingLab({ ...lab, img: null, coverImg: null, labManual: null });
    setEditModalOpen(true);
    setOpenMenuId(null);
  };

  const handleUpdateLab = () => {
    if (!editingLab.name) {
      alert("Please fill all required fields");
      return;
    }
    const updatedLabs = labs.map((lab) => {
      if (lab._id !== editingLab._id) return lab;
      return {
        ...lab,
        name: editingLab.name,
        subHeading: editingLab.subHeading,
        about: {
          equipment: editingLab.about.equipment.filter(Boolean),
          cautions: editingLab.about.cautions.filter(Boolean),
        },
        arModel: editingLab.arModel || "",
        vrModel: editingLab.vrModel || "",
        img: editingLab.img instanceof File ? editingLab.img.name : lab.img,
        coverImg:
          editingLab.coverImg instanceof File
            ? editingLab.coverImg.name
            : lab.coverImg,
        lectureVideos: editingLab.lectureVideos,
        labManual:
          editingLab.labManual instanceof File
            ? editingLab.labManual.name
            : lab.labManual,
        documents: editingLab.documents.filter((d) => d.title && d.url),
      };
    });
    setLabs(updatedLabs);
    alert("Lab updated successfully!");
    setEditModalOpen(false);
    setEditingLab(null);
  };

  const handleDeleteLab = (id) => {
    if (!window.confirm("Are you sure you want to delete this lab?")) return;
    setLabs(labs.filter((lab) => lab._id !== id));
    alert("Lab deleted successfully!");
    setOpenMenuId(null);
  };

  // ── shared modal body ─────────────────────────────────────────
  const renderModalFields = (data, type) => (
    <div className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Lab Name <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          value={data.name}
          onChange={(e) => handleInputChange(e, type)}
          placeholder="Enter lab name"
          className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
        />
      </div>

      {/* Sub-heading */}
      <div>
        <label className="block text-sm font-medium mb-2">Sub-Heading</label>
        <input
          name="subHeading"
          value={data.subHeading || ""}
          onChange={(e) => handleInputChange(e, type)}
          placeholder="Short tagline for this lab"
          className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
        />
      </div>

      {/* AR / VR */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            AR Model Link
          </label>
          <input
            name="arModel"
            value={data.arModel || ""}
            onChange={(e) => handleInputChange(e, type)}
            placeholder="https://example.com/ar"
            className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            VR Model Link
          </label>
          <input
            name="vrModel"
            value={data.vrModel || ""}
            onChange={(e) => handleInputChange(e, type)}
            placeholder="https://example.com/vr"
            className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
          />
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Lab Image */}
        <div>
          <label className="block text-sm font-medium mb-2">Upload Image</label>
          <div className="flex items-center space-x-2">
            <label className="flex-1 cursor-pointer min-w-0">
              <div className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-gray-400 flex items-center justify-center hover:bg-gray-750">
                {data.img instanceof File ? (
                  <span className="text-green-400 text-xs flex items-center">
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Image selected
                  </span>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    <span className="text-xs">Choose image</span>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, type, "img")}
                className="hidden"
              />
            </label>
            {data.img instanceof File && (
              <button
                onClick={() => removeFile(type, "img")}
                className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {data.img instanceof File && (
            <p className="text-xs text-gray-500 mt-1 truncate">
              {data.img.name}
            </p>
          )}
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Upload Cover Image
          </label>
          <div className="flex items-center space-x-2">
            <label className="flex-1 cursor-pointer min-w-0">
              <div className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-gray-400 flex items-center justify-center hover:bg-gray-750">
                {data.coverImg instanceof File ? (
                  <span className="text-green-400 text-xs flex items-center">
                    <svg
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Image selected
                  </span>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    <span className="text-xs">Choose cover image</span>
                  </>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, type, "coverImg")}
                className="hidden"
              />
            </label>
            {data.coverImg instanceof File && (
              <button
                onClick={() => removeFile(type, "coverImg")}
                className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {data.coverImg instanceof File && (
            <p className="text-xs text-gray-500 mt-1 truncate">
              {data.coverImg.name}
            </p>
          )}
        </div>
      </div>

      {/* Lecture Videos (multi) */}
      <div>
        <label className="block text-sm font-medium mb-2">Lecture Videos</label>
        <div className="space-y-2">
          {(data.lectureVideos || []).map((v, i) => (
            <div key={i} className="flex items-center space-x-2">
              <div className="flex-1 p-3 bg-gray-800 rounded border border-gray-700 text-green-400 text-xs flex items-center">
                <svg
                  className="h-4 w-4 mr-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="truncate">
                  {v instanceof File ? v.name : v}
                </span>
              </div>
              <button
                onClick={() => removeLectureVideo(type, i)}
                className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          <label className="cursor-pointer">
            <div className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-gray-400 flex items-center justify-center hover:bg-gray-750">
              <Upload className="h-4 w-4 mr-2" />
              <span className="text-xs">Add lecture video</span>
            </div>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => addLectureVideo(e, type)}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Lab Manual */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Upload Lab Manual{type === "edit" ? " (Replace)" : ""}
        </label>
        <div className="flex items-center space-x-2">
          <label className="flex-1 cursor-pointer min-w-0">
            <div className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-gray-400 flex items-center justify-center hover:bg-gray-750">
              {data.labManual instanceof File ? (
                <span className="text-green-400 text-xs flex items-center">
                  <svg
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  File selected
                </span>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  <span className="text-xs">Choose file</span>
                </>
              )}
            </div>
            <input
              type="file"
              onChange={(e) => handleFileChange(e, type, "labManual")}
              className="hidden"
            />
          </label>
          {data.labManual instanceof File && (
            <button
              onClick={() => removeFile(type, "labManual")}
              className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {data.labManual instanceof File && (
          <p className="text-xs text-gray-500 mt-1 truncate">
            {data.labManual.name}
          </p>
        )}
      </div>

      {/* Equipment & Cautions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Equipment */}
        <div>
          <label className="block text-sm font-medium mb-2">Equipment</label>
          <div className="space-y-2">
            {(data.about?.equipment || [""]).map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <input
                  value={item}
                  onChange={(e) =>
                    handleAboutChange(type, "equipment", i, e.target.value)
                  }
                  placeholder="e.g. Oscilloscope"
                  className="flex-1 p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
                />
                {(data.about?.equipment || []).length > 1 && (
                  <button
                    onClick={() => removeAboutItem(type, "equipment", i)}
                    className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addAboutItem(type, "equipment")}
              className="flex items-center text-purple-400 hover:text-purple-300 text-xs font-medium mt-1"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Equipment
            </button>
          </div>
        </div>

        {/* Cautions */}
        <div>
          <label className="block text-sm font-medium mb-2">Cautions</label>
          <div className="space-y-2">
            {(data.about?.cautions || [""]).map((item, i) => (
              <div key={i} className="flex items-center space-x-2">
                <input
                  value={item}
                  onChange={(e) =>
                    handleAboutChange(type, "cautions", i, e.target.value)
                  }
                  placeholder="e.g. Wear safety goggles"
                  className="flex-1 p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
                />
                {(data.about?.cautions || []).length > 1 && (
                  <button
                    onClick={() => removeAboutItem(type, "cautions", i)}
                    className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => addAboutItem(type, "cautions")}
              className="flex items-center text-purple-400 hover:text-purple-300 text-xs font-medium mt-1"
            >
              <Plus className="h-3.5 w-3.5 mr-1" /> Add Caution
            </button>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div>
        <label className="block text-sm font-medium mb-2">Documents</label>
        <div className="space-y-2">
          {(data.documents || []).map((doc, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                value={doc.title}
                onChange={(e) =>
                  handleDocChange(type, i, "title", e.target.value)
                }
                placeholder="Document title"
                className="p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
              />
              <div className="flex items-center space-x-2">
                <input
                  value={doc.url}
                  onChange={(e) =>
                    handleDocChange(type, i, "url", e.target.value)
                  }
                  placeholder="https://..."
                  className="flex-1 p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
                />
                <button
                  onClick={() => removeDocument(type, i)}
                  className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => addDocument(type)}
            className="flex items-center text-purple-400 hover:text-purple-300 text-xs font-medium mt-1"
          >
            <Plus className="h-3.5 w-3.5 mr-1" /> Add Document
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="md:max-w-7xl w-full mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Laboratory Management
          </h1>
          <button
            onClick={() => {
              setNewLab(emptyForm);
              setAddModalOpen(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md w-full sm:w-auto"
          >
            + Add Lab
          </button>
        </div>

        {/* Labs Table */}
        <div className="bg-gray-900 rounded-lg shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4 font-semibold">Lab Name</th>
                <th className="p-4 font-semibold">Sub-Heading</th>
                <th className="p-4 font-semibold text-center">Attendees</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {labs.map((lab) => (
                <tr
                  key={lab._id}
                  className="border-b border-gray-800 hover:bg-gray-800/50"
                >
                  <td className="p-4 font-medium">{lab.name}</td>
                  <td className="p-4 text-gray-300 max-w-xs truncate">
                    {lab.subHeading || "—"}
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center bg-purple-600 text-white font-semibold px-3 py-1 rounded-full text-sm">
                      {lab.attendeesCount || 0}
                    </span>
                  </td>
                  <td className="p-4">
                    <div
                      className="relative"
                      ref={openMenuId === lab._id ? menuRef : null}
                    >
                      <button
                        onClick={() => toggleMenu(lab._id)}
                        className="p-2 hover:bg-gray-700 rounded"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                      {openMenuId === lab._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl z-10 border border-gray-700">
                          <button
                            onClick={() => openEditModal(lab)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center text-purple-400 hover:text-purple-300"
                          >
                            <Pencil className="h-4 w-4 mr-3" /> Edit Lab
                          </button>
                          {/* <button
                            onClick={() => handleAttendees(lab._id, lab.name)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center text-green-400 hover:text-green-300 border-t border-gray-700"
                          >
                            <Users className="h-4 w-4 mr-3" /> Lab Attendees
                          </button> */}
                          <button
                            onClick={() => handleDeleteLab(lab._id)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center text-red-500 hover:text-red-400 border-t border-gray-700 rounded-b-lg"
                          >
                            <Trash2 className="h-4 w-4 mr-3" /> Delete Lab
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {labs.length === 0 && (
            <p className="text-center text-gray-400 p-6">
              No labs found. Add one to get started!
            </p>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-2 sm:p-4">
          <div className="bg-gray-900 p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-2xl my-4 sm:my-8 max-h-[95vh] overflow-y-auto scrollbar-hide">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Add New Lab
            </h2>
            {renderModalFields(newLab, "add")}
            <div className="flex flex-col sm:flex-row justify-end mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setAddModalOpen(false)}
                className="py-2 px-4 bg-gray-700 rounded hover:bg-gray-600 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLab}
                className="py-2 px-4 bg-purple-600 rounded flex items-center justify-center hover:bg-purple-700 w-full sm:w-auto"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editingLab && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-2 sm:p-4">
          <div className="bg-gray-900 p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-2xl my-4 sm:my-8 max-h-[95vh] overflow-y-auto scrollbar-hide">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Edit Lab
            </h2>
            {renderModalFields(editingLab, "edit")}
            <div className="flex flex-col sm:flex-row justify-end mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setEditModalOpen(false)}
                className="py-2 px-4 bg-gray-700 rounded hover:bg-gray-600 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateLab}
                className="py-2 px-4 bg-purple-600 rounded flex items-center justify-center hover:bg-purple-700 w-full sm:w-auto"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLabs;
