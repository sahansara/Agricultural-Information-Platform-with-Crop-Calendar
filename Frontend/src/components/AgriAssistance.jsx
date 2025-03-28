import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Search, MapPin, User, Leaf, Building, Tractor } from "lucide-react";
import { Link } from "react-router-dom";

const AgriAssistance = () => {
  const [officers, setOfficers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState("all");

  useEffect(() => {
    fetchOfficers();
  }, []);

  useEffect(() => {
    searchTerm ? searchOfficers() : fetchOfficers();
  }, [searchTerm]);

  const fetchOfficers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/agri-officers");
      const data = await response.json();
      setOfficers(data);
    } catch (error) {
      console.error("Error fetching officers:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchOfficers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/agri-officers/search?query=${searchTerm}`
      );
      const data = await response.json();
      setOfficers(data);
    } catch (error) {
      console.error("Error searching officers:", error);
    }
  };

  const districts = [
    "all",
    ...new Set(officers.map((officer) => officer.district)),
  ];
  const filteredOfficers =
    selectedDistrict === "all"
      ? officers
      : officers.filter((officer) => officer.district === selectedDistrict);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Leaf className="h-8 w-8 text-green-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">
              Agricultural Officers Directory
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with agricultural experts in your district for professional
            guidance and support.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 space-y-4 bg-white p-6 rounded-lg shadow-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name, district, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-green-500" />
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow"
            >
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district === "all"
                    ? "All Districts"
                    : district.charAt(0).toUpperCase() + district.slice(1)}
                </option>
              ))}
            </select>
            <div className="flex justify-center">
              <button className="flex bg-green-600 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-green-700 transition-colors duration-300">
                <Tractor></Tractor>
                <Link
                  to="/deputy-headList"
                  className="block w-full text-center hover:text-gray-200"
                >
                  Deputy Head List
                </Link>
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOfficers.map((officer) => (
              <div
                key={officer.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-green-100"
              >
                <div className="mb-6 border-b border-green-100 pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <User className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {officer.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Officer #{officer.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span className="font-medium">{officer.district}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <Building className="h-4 w-4 mt-1 flex-shrink-0 text-green-600" />
                      <div>
                        <a
                          href={`https://www.google.com/maps/place/${officer.agri_office_location}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <p className="font-medium mb-1">Office Address:</p>
                          <p>{officer.agri_office_location}</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2 text-sm text-gray-700">
                      <FaWhatsapp className="h-4 w-4 mt-1 flex-shrink-0 text-green-600" />

                      <a
                        href={`https://wa.me/${officer.whatsapp_number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" text-sm text-gray-600 hover:text-green-600 transition-colors"
                      >
                        <p className="font-medium mb-1">Contact:</p>
                        <p>{officer.whatsapp_link}</p>{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredOfficers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <Leaf className="h-12 w-12 text-green-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No agricultural officers found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgriAssistance;
