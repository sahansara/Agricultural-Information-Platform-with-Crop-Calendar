import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AgriOfficer = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    district: "",
    agri_office_location: "",
    whatsapp_link: "",
  });

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async (query = "") => {
    setLoading(true);
    try {
      const url = query
        ? `http://localhost:8000/api/agri-officers/search?query=${query}`
        : "http://localhost:8000/api/agri-officers";
      const response = await axios.get(url);
      setOfficers(response.data);
    } catch (error) {
      setError("Failed to fetch Agri Officers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchOfficers(e.target.value);
  };

  const openUpdatePopup = (officer) => {
    setSelectedOfficer(officer);
    setFormData({
      name: officer.name,
      district: officer.district,
      agri_office_location: officer.agri_office_location,
      whatsapp_link: officer.whatsapp_link,
    });
  };

  const closeUpdatePopup = () => {
    setSelectedOfficer(null);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!selectedOfficer) return;

    try {
      await axios.put(
        `http://localhost:8000/api/agri-officers/${selectedOfficer.id}`,
        formData
      );
      fetchOfficers();
      closeUpdatePopup();
      Swal.fire("Success", "Agri Officer updated successfully!", "success");
    } catch (error) {
      Swal.fire("Error", "Failed to update Agri Officer. Try again.", "error");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8000/api/agri-officers/${id}`);
          fetchOfficers();
          Swal.fire("Deleted!", "Agri Officer has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error", "Failed to delete Agri Officer.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Agri Officer Details
      </h1>

      <input
        type="text"
        placeholder="Search by name or district..."
        className="w-full p-3 border rounded-lg mb-4"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : error ? (
        <div className="bg-red-100 text-red-500 p-3 rounded-lg">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {officers.length > 0 ? (
            officers.map((officer) => (
              <div
                key={officer.id}
                className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {officer.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  <strong>District:</strong> {officer.district}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <strong>Office Location:</strong>{" "}
                  {officer.agri_office_location}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  <strong>WhatsApp:</strong>{" "}
                  <a
                    href={officer.whatsapp_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    {officer.whatsapp_link}
                  </a>
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => openUpdatePopup(officer)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(officer.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No officers available.</p>
          )}
        </div>
      )}

      {selectedOfficer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Update Agri Officer</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              placeholder="District"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              name="agri_office_location"
              value={formData.agri_office_location}
              onChange={handleInputChange}
              placeholder="Office Location"
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              name="whatsapp_link"
              value={formData.whatsapp_link}
              onChange={handleInputChange}
              placeholder="WhatsApp Link"
              className="w-full p-2 border rounded mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={closeUpdatePopup}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgriOfficer;
