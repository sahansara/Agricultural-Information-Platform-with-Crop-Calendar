import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CropFrontend.css";


const CropFrontend = () => {
  const [cropType, setCropType] = useState("Paddy");
  const [cropData, setCropData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const selectedFields = [
    "variety",
    "duration_months",
    "spacing",
    "feed_rate_kg_ha",
    "urea_kg_ha",
    "tsp_kg_ha",
    "mop_kg_ha",
    "yield_kg_ha",
    "others",
  ];

  const fieldConfig = {
    variety: "Variety",
    duration_months: "Duration (Months)",
    spacing: "Spacing",
    feed_rate_kg_ha: "Seed Rate (kg/ha)",
    urea_kg_ha: "Urea (kg/ha)",
    tsp_kg_ha: "TSP (kg/ha)",
    mop_kg_ha: "MOP (kg/ha)",
    yield_kg_ha: "Yield (kg/ha)",
    others: "Additional Info",
  };

  const fetchCropData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/crops/search`,
        { crop_type: cropType }
      );

      setCropData(response.data);
    } catch (err) {
      setError("Failed to fetch crop data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCropData();
  }, []);

  return (
    <div className="container">
      <h2>Search for a Crop</h2>
      <div className="form-section">
        <div className="form-container">
          <select
            className="select-bar"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
          >
            {[
              "Paddy",
              "Maize",
              "Kurakkan",
              "Cabbage",
              "Radish",
              "Okra",
              "Gingelly",
              "Ground nut",
              "Mustard",
              "Big onion",
              "Red onion",
              "Ginger",
              "Turmeric",
              "Tomato",
              "Brinjal",
              "Green chillies",
              "Yellow pumpkin",
              "Cucumber",
              "Snake guard",
              "Luffa",
              "Bitter gourd",
              "Nivithi",
              "Gotukola",
              "Mukunuwenna",
              "Kankung",
              "Thampala",
              "Lettuces",
              "Green gram",
              "Black gram",
              "Cow pea",
              "Bean(bush bean)",
              "Mae",
              "Bean(pole bean)",
              "Winged bean",
            ].map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
          <button
            className="search-button"
            onClick={fetchCropData}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {cropData.length > 0 && (
        <div className="table-container">
          <table className="crop-table">
            <thead>
              <tr>
                {selectedFields.map((field) => (
                  <th key={field}>{fieldConfig[field]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cropData.map((crop, index) => (
                <tr key={index}>
                  {selectedFields.map((field) => (
                    <td key={field}>{crop[field] || "N/A"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CropFrontend;
