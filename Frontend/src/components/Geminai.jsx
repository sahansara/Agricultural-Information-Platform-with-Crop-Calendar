import React, { useState, useRef } from "react";

const API_URL = "http://localhost:3000";

const GeminaiComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDescription, setImageDescription] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();
      setSelectedImage(URL.createObjectURL(file));
      setImageDescription(data.description);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    setIsLoading(true);
    const newMessage = { role: "user", content: chatMessage };
    setChatHistory((prev) => [...prev, newMessage]);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: chatMessage }),
      });

      if (!response.ok) throw new Error("Chat request failed");

      const data = await response.json();
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setIsLoading(false);
      setChatMessage("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Image Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Image Analysis</h2>
        <div className="mb-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Upload Image
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {selectedImage && (
          <div className="space-y-4">
            <img
              src={selectedImage}
              alt="Uploaded"
              className="max-w-md rounded-lg shadow-md"
            />
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Description:</h3>
              <p>{imageDescription || "Generating description..."}</p>
            </div>
          </div>
        )}
      </div>

      {/* Chat Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Chat with AI</h2>
        <div className="mb-4">
          <div className="h-96 overflow-y-auto bg-gray-50 p-4 rounded-lg mb-4">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg mb-2 ${
                  msg.role === "user"
                    ? "bg-blue-100 ml-auto max-w-[80%]"
                    : "bg-white max-w-[80%]"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeminaiComponent;
