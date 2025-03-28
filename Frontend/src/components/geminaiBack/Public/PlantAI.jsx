import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, Leaf, ArrowLeft, Home, X, Upload, Loader } from "lucide-react";

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif"];

const Alert = ({ variant = "error", children }) => {
  const styles = {
    error: "bg-red-100 text-red-700 border-red-200",
    success: "bg-green-100 text-green-700 border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };

  return (
    <div
      className={`p-4 rounded-lg border ${styles[variant]} flex items-center gap-2`}
    >
      {children}
    </div>
  );
};

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  // Validate file
  const validateFile = useCallback((file) => {
    if (!file) return "Please select a file.";
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return "Please select a valid image file (JPG, PNG, or GIF).";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 10MB.";
    }
    return null;
  }, []);

  // Handle file selection
  const handleFile = useCallback(
    (file) => {
      const errorMessage = validateFile(file);
      if (errorMessage) {
        setError(errorMessage);
        setSuccess(null);
        return;
      }

      setImage(file);
      setError(null);
      setSuccess("Image uploaded successfully!");
    },
    [validateFile]
  );

  const handleFileChange = useCallback(
    (e) => {
      if (e.target.files?.[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragActive(false);

      if (e.dataTransfer.files?.[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  // Format text with bold sections
  const formatText = useCallback((text) => {
    const parts = text.split("**");
    return parts.map((part, index) =>
      index % 2 === 0 ? (
        <span key={index}>{part}</span>
      ) : (
        <span key={index} className="font-bold text-green-700">
          {part}
        </span>
      )
    );
  }, []);

  const formatDescription = useCallback(
    (description) => {
      if (!description) return null;

      return description.split("\n").map((paragraph, index) => {
        if (paragraph.trim().length === 0) return null;

        return (
          <div key={index} className="mb-4">
            {formatText(paragraph)}
          </div>
        );
      });
    },
    [formatText]
  );

  // Handle image preview
  useEffect(() => {
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleUpload = async () => {
    if (!image) {
      setError("Please select a plant or crop image.");
      setSuccess(null);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setDescription(data.message);
      setSuccess("Analysis completed successfully!");
    } catch (err) {
      setError("Failed to analyze plant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setPreview(null);
    setDescription("");
    setError(null);
    setSuccess(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col items-center justify-center mb-6">
        <div className="flex items-center space-x-2">
          <Sprout className="h-8 w-8 text-green-600" />
          <h2 className="text-2xl font-bold text-center text-gray-800">
            PlantLens AI
          </h2>
        </div>
        <div className="mt-4 text-center max-w-2xl">
          <p className="text-gray-600 mb-2">
            Your smart agricultural companion for instant plant analysis and
            identification.
          </p>
          <p className="text-sm text-gray-500">
            Simply upload a photo of any plant, crop, or agricultural concern,
            and our AI will analyze it to provide detailed insights about plant
            health, species identification, and potential issues.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-green-100">
        {error && (
          <div className="mt-4 px-4">
            <Alert variant="error">{error}</Alert>
          </div>
        )}

        {success && (
          <div className="mt-4 px-4">
            <Alert variant="success">{success}</Alert>
          </div>
        )}
        <div className="p-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors
              ${
                dragActive ? "border-green-500 bg-green-50" : "border-green-200"
              }
              ${!image ? "hover:border-green-400" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {!image ? (
              <div className="space-y-4">
                <div className="mx-auto h-12 w-12 text-green-400">
                  <Leaf className="h-12 w-12" />
                </div>

                <div>
                  <label className="cursor-pointer text-green-600 hover:text-green-700">
                    Click to upload
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                  <span className="text-gray-500"> or drag and drop</span>
                </div>
                <p className="text-sm text-gray-500">
                  Upload clear images of plants or crops (JPG, PNG, GIF up to
                  10MB)
                </p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={preview}
                  alt="Plant Preview"
                  className="max-h-64 mx-auto rounded"
                />
                <button
                  onClick={handleReset}
                  className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={!image || loading}
            className={`w-full mt-4 py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2
              ${
                !image || loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
          >
            {loading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Upload className="h-5 w-5" />
            )}
            <span>{loading ? "Analyzing Plant..." : "Analyze Image"}</span>
          </button>

          {description && (
            <div className="mt-6 bg-green-50 p-6 rounded-lg shadow-md border border-green-100">
              <h3 className="text-xl font-semibold mb-4 text-green-800">
                Plant Analysis:
              </h3>
              {formatDescription(description)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
