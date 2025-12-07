import React, { useState, useRef, useEffect } from "react";
import { Pencil, Trash2, Upload, X, MoreVertical, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Labs = () => {
  const [labs, setLabs] = useState([
    {
      _id: "1",
      name: "Physics Lab 101",
      description:
        "Advanced physics laboratory with modern equipment for conducting experiments in mechanics, thermodynamics, and electromagnetism.",
      arLink: "https://example.com/ar/physics",
      vrLink: "https://example.com/vr/physics",
      video: "physics_demo.mp4",
      labModuleFile: "physics_module.pdf",
      attendeesCount: 45,
    },
    {
      _id: "2",
      name: "Chemistry Lab A",
      description:
        "State-of-the-art chemistry laboratory equipped for organic and inorganic chemistry experiments.",
      arLink: "",
      vrLink: "https://example.com/vr/chemistry",
      video: "chemistry_intro.mp4",
      labModuleFile: "",
      attendeesCount: 32,
    },
  ]);

  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const [newLab, setNewLab] = useState({
    name: "",
    description: "",
    arLink: "",
    vrLink: "",
    image: null,
    video: null,
    labModuleFile: null,
  });

  const [editingLab, setEditingLab] = useState(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = (labId) => {
    setOpenMenuId(openMenuId === labId ? null : labId);
  };

  const handleAttendees = (labId, labName) => {
    // Redirect to attendees page
    console.log(`Redirecting to attendees for lab: ${labName} (ID: ${labId})`);
    alert(`Redirecting to attendees page for ${labName}`);
    // In real implementation: navigate(`/labs/${labId}/attendees`);
    navigate("/dashboard/attendees");
    setOpenMenuId(null);
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;

    if (type === "add") {
      setNewLab({ ...newLab, [name]: value });
    } else {
      setEditingLab({ ...editingLab, [name]: value });
    }
  };

  const handleFileChange = (e, type, fieldName) => {
    const file = e.target.files[0];

    if (type === "add") {
      setNewLab({ ...newLab, [fieldName]: file });
    } else {
      setEditingLab({ ...editingLab, [fieldName]: file });
    }
  };

  const handleAddLab = () => {
    const { name, description, arLink, vrLink, image, video, labModuleFile } =
      newLab;

    if (!name || !description) {
      alert("Please fill in required fields (Name and Description)");
      return;
    }

    const newLabEntry = {
      _id: Date.now().toString(),
      name,
      description,
      arLink,
      vrLink,
      image: image ? image.name : "",
      video: video ? video.name : "",
      labModuleFile: labModuleFile ? labModuleFile.name : "",
      attendeesCount: 0,
    };

    setLabs([...labs, newLabEntry]);
    alert("Lab added successfully!");

    setNewLab({
      name: "",
      description: "",
      arLink: "",
      vrLink: "",
      image: null,
      video: null,
      labModuleFile: null,
    });

    setAddModalOpen(false);
  };

  const openEditModal = (lab) => {
    setEditingLab({
      ...lab,
      image: null,
      video: null,
      labModuleFile: null,
    });
    setEditModalOpen(true);
    setOpenMenuId(null);
  };

  const handleUpdateLab = () => {
    if (!editingLab.name || !editingLab.description) {
      alert("Please fill all required fields");
      return;
    }

    const updatedLabs = labs.map((lab) => {
      if (lab._id === editingLab._id) {
        return {
          ...lab,
          name: editingLab.name,
          description: editingLab.description,
          arLink: editingLab.arLink || "",
          vrLink: editingLab.vrLink || "",
          image: editingLab.image ? editingLab.image.name : lab.image,
          video: editingLab.video ? editingLab.video.name : lab.video,
          labModuleFile: editingLab.labModuleFile
            ? editingLab.labModuleFile.name
            : lab.labModuleFile,
        };
      }
      return lab;
    });

    setLabs(updatedLabs);
    alert("Lab updated successfully!");
    setEditModalOpen(false);
    setEditingLab(null);
  };

  const handleDeleteLab = (id) => {
    if (!window.confirm("Are you sure you want to delete this lab?")) return;

    const updatedLabs = labs.filter((lab) => lab._id !== id);
    setLabs(updatedLabs);
    alert("Lab deleted successfully!");
    setOpenMenuId(null);
  };

  const removeFile = (type, fieldName) => {
    if (type === "add") {
      setNewLab({ ...newLab, [fieldName]: null });
    } else {
      setEditingLab({ ...editingLab, [fieldName]: null });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen p-4 sm:p-6 lg:p-8">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="md:max-w-7xl w-full mx-auto px-2 sm:px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Laboratory Management
          </h1>
          <button
            onClick={() => {
              setNewLab({
                name: "",
                description: "",
                arLink: "",
                vrLink: "",
                image: null,
                video: null,
                labModuleFile: null,
              });
              setAddModalOpen(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-md w-full sm:w-auto"
          >
            + Add Lab
          </button>
        </div>

        {/* Labs Table */}
        <div className="bg-gray-900 rounded-lg shadow-xl ">
          <table className="w-full text-left">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-4 font-semibold">Lab Name</th>
                <th className="p-4 font-semibold">Description</th>
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
                    {lab.description}
                  </td>

                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center bg-indigo-600 text-white font-semibold px-3 py-1 rounded-full text-sm">
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
                            <Pencil className="h-4 w-4 mr-3" />
                            Edit Lab
                          </button>
                          <button
                            onClick={() => handleAttendees(lab._id, lab.name)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center text-green-400 hover:text-green-300 border-t border-gray-700"
                          >
                            <Users className="h-4 w-4 mr-3" />
                            Lab Attendees
                          </button>
                          <button
                            onClick={() => handleDeleteLab(lab._id)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-700 flex items-center text-red-500 hover:text-red-400 border-t border-gray-700 rounded-b-lg"
                          >
                            <Trash2 className="h-4 w-4 mr-3" />
                            Delete Lab
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

      {/* Add Lab Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-2 sm:p-4">
          <div className="bg-gray-900 p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl w-full max-w-2xl my-4 sm:my-8 max-h-[95vh] overflow-y-auto scrollbar-hide">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Add New Lab
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Lab Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={newLab.name}
                  onChange={(e) => handleInputChange(e, "add")}
                  placeholder="Enter lab name"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={newLab.description}
                  onChange={(e) => handleInputChange(e, "add")}
                  placeholder="Enter lab description"
                  rows="4"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    AR Link
                  </label>
                  <input
                    name="arLink"
                    value={newLab.arLink}
                    onChange={(e) => handleInputChange(e, "add")}
                    placeholder="https://example.com/ar"
                    className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    VR Link
                  </label>
                  <input
                    name="vrLink"
                    value={newLab.vrLink}
                    onChange={(e) => handleInputChange(e, "add")}
                    placeholder="https://example.com/vr"
                    className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload Image
                </label>
                <div className="flex items-center space-x-2">
                  <label className="flex-1 cursor-pointer min-w-0">
                    <div className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-gray-400 flex items-center justify-center hover:bg-gray-750">
                      {newLab.image ? (
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
                      onChange={(e) => handleFileChange(e, "add", "image")}
                      className="hidden"
                    />
                  </label>
                  {newLab.image && (
                    <button
                      onClick={() => removeFile("add", "image")}
                      className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
                      title="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {newLab.image && (
                  <p
                    className="text-xs text-gray-500 mt-1 truncate"
                    title={newLab.image.name}
                  >
                    {newLab.image.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Video
                  </label>
                  <div className="flex items-center space-x-2">
                    <label className="flex-1 cursor-pointer min-w-0">
                      <div className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-gray-400 flex items-center justify-center hover:bg-gray-750">
                        {newLab.video ? (
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
                            Video selected
                          </span>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            <span className="text-xs">Choose video</span>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileChange(e, "add", "video")}
                        className="hidden"
                      />
                    </label>
                    {newLab.video && (
                      <button
                        onClick={() => removeFile("add", "video")}
                        className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
                        title="Remove video"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {newLab.video && (
                    <p
                      className="text-xs text-gray-500 mt-1 truncate"
                      title={newLab.video.name}
                    >
                      {newLab.video.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Lab Module
                  </label>
                  <div className="flex items-center space-x-2">
                    <label className="flex-1 cursor-pointer min-w-0">
                      <div className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-gray-400 flex items-center justify-center hover:bg-gray-750">
                        {newLab.labModuleFile ? (
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
                        onChange={(e) =>
                          handleFileChange(e, "add", "labModuleFile")
                        }
                        className="hidden"
                      />
                    </label>
                    {newLab.labModuleFile && (
                      <button
                        onClick={() => removeFile("add", "labModuleFile")}
                        className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
                        title="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {newLab.labModuleFile && (
                    <p
                      className="text-xs text-gray-500 mt-1 truncate"
                      title={newLab.labModuleFile.name}
                    >
                      {newLab.labModuleFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setAddModalOpen(false)}
                className="py-2 px-4 bg-gray-700 rounded hover:bg-gray-600 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLab}
                className="py-2 px-4 bg-indigo-600 rounded flex items-center justify-center hover:bg-indigo-700 w-full sm:w-auto"
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

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Lab Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={editingLab.name}
                  onChange={(e) => handleInputChange(e, "edit")}
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={editingLab.description}
                  onChange={(e) => handleInputChange(e, "edit")}
                  rows="4"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    AR Link
                  </label>
                  <input
                    name="arLink"
                    value={editingLab.arLink || ""}
                    onChange={(e) => handleInputChange(e, "edit")}
                    className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    VR Link
                  </label>
                  <input
                    name="vrLink"
                    value={editingLab.vrLink || ""}
                    onChange={(e) => handleInputChange(e, "edit")}
                    className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload Image (Replace)
                </label>
                <div className="flex items-center space-x-2">
                  <label className="flex-1 cursor-pointer min-w-0">
                    <div className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-gray-400 flex items-center justify-center hover:bg-gray-750">
                      {editingLab.image ? (
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
                      onChange={(e) => handleFileChange(e, "edit", "image")}
                      className="hidden"
                    />
                  </label>
                  {editingLab.image && (
                    <button
                      onClick={() => removeFile("edit", "image")}
                      className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
                      title="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {editingLab.image && (
                  <p
                    className="text-xs text-gray-500 mt-1 truncate"
                    title={editingLab.image.name}
                  >
                    {editingLab.image.name}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Video (Replace)
                  </label>
                  <div className="flex items-center space-x-2">
                    <label className="flex-1 cursor-pointer min-w-0">
                      <div className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-gray-400 flex items-center justify-center hover:bg-gray-750">
                        {editingLab.video ? (
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
                            Video selected
                          </span>
                        ) : (
                          <>
                            <Upload className="h-4 w-4 mr-2" />
                            <span className="text-xs">Choose video</span>
                          </>
                        )}
                      </div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileChange(e, "edit", "video")}
                        className="hidden"
                      />
                    </label>
                    {editingLab.video && (
                      <button
                        onClick={() => removeFile("edit", "video")}
                        className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
                        title="Remove video"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {editingLab.video && (
                    <p
                      className="text-xs text-gray-500 mt-1 truncate"
                      title={editingLab.video.name}
                    >
                      {editingLab.video.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Lab Module (Replace)
                  </label>
                  <div className="flex items-center space-x-2">
                    <label className="flex-1 cursor-pointer min-w-0">
                      <div className="w-full p-3 bg-gray-800 rounded border border-gray-700 text-gray-400 flex items-center justify-center hover:bg-gray-750">
                        {editingLab.labModuleFile ? (
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
                        onChange={(e) =>
                          handleFileChange(e, "edit", "labModuleFile")
                        }
                        className="hidden"
                      />
                    </label>
                    {editingLab.labModuleFile && (
                      <button
                        onClick={() => removeFile("edit", "labModuleFile")}
                        className="p-3 bg-red-600 rounded hover:bg-red-700 flex-shrink-0"
                        title="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {editingLab.labModuleFile && (
                    <p
                      className="text-xs text-gray-500 mt-1 truncate"
                      title={editingLab.labModuleFile.name}
                    >
                      {editingLab.labModuleFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setEditModalOpen(false)}
                className="py-2 px-4 bg-gray-700 rounded hover:bg-gray-600 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateLab}
                className="py-2 px-4 bg-indigo-600 rounded flex items-center justify-center hover:bg-indigo-700 w-full sm:w-auto"
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

export default Labs;
