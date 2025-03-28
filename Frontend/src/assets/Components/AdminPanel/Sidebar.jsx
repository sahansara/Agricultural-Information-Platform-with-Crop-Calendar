import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Menu,
  X,
  Crop,
  Users,
  MessageCircle,
  FileText,
  Bell,
  Check,
} from "lucide-react";
import logo from "../../../assets/logo.png";

const NAV_ITEMS = [
  { path: "/admin/crops-details", label: "Crops Details", icon: Crop },
  { path: "/admin/member-details", label: "Member Details", icon: Users },
  { path: "/admin/forum-details", label: "Forum Details", icon: MessageCircle },
  { path: "/admin/blogs-articles", label: "Blogs & Articles", icon: FileText },
  { path: "/admin/feedback", label: "Feedbacks", icon: Bell },
  {
    path: "/admin/agri-officers-details",
    label: "Agri Officer's Details",
    icon: Check,
  },
];

function Sidebar() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [members, setMembers] = useState([]);
  const [agriOfficers, setAgriOfficers] = useState([]); // Added Agri Officer state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/login');
  };

  const fetchData = useCallback(async () => {
    try {
      const [feedbackResponse, membersResponse, agriOfficersResponse] =
        await Promise.allSettled([
          axios.get("http://localhost:8000/api/feedbacks"),
          axios.get("http://localhost:8000/api/user_manage"),
          axios.get("http://localhost:8000/api/agri-officers"), // Fetch Agri Officers
        ]);

      if (feedbackResponse.status === "fulfilled")
        setFeedbacks(feedbackResponse.value.data.data || []);
      if (membersResponse.status === "fulfilled")
        setMembers(membersResponse.value.data || []);
      if (agriOfficersResponse.status === "fulfilled")
        setAgriOfficers(agriOfficersResponse.value.data || []); // Set Agri Officer data
    } catch {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="relative">
      <div className="lg:hidden flex items-center">
        <button
          className="p-3 bg-green-600 text-white rounded-lg mr-4"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <X /> : <Menu />}
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-64 h-screen bg-white dark:bg-gray-800 shadow-md transition-transform ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:block z-50`}
      >
        <div 
          className="p-8 flex justify-between items-center bg-gray-200 dark:bg-gray-700 rounded-t-xl cursor-pointer" 
          onClick={handleLogoClick}
        >
          <div className="flex justify-center items-center">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
          </div>
          <h5 className="text-lg font-bold flex-grow text-center">
            Aswanna Admin
          </h5>
          <button
            className="lg:hidden text-gray-600 dark:text-gray-300"
            onClick={(e) => {
              e.stopPropagation(); // Prevent the click from bubbling up to the parent div
              setShowSidebar(false);
            }}
          >
            <X />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-green-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : (
            NAV_ITEMS.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              const count =
                path === "/admin/member-details"
                  ? members.length
                  : path === "/admin/feedback"
                  ? feedbacks.length
                  : path === "/admin/agri-officers-details"
                  ? agriOfficers.length // Display count of Agri Officers
                  : null;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center p-3 rounded-lg text-white ${
                    isActive ? "bg-green-700" : "bg-green-500"
                  } hover:bg-green-600 transition duration-200 space-x-2 relative`}
                  onClick={() => setShowSidebar(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-grow">{label}</span>
                  {count !== null && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 bg-white text-green-700 rounded-full px-2 py-1 text-xs min-w-[30px] text-center">
                      {count}
                    </span>
                  )}
                </Link>
              );
            })
          )}
        </div>

        <div className="bg-green-700 text-center text-white py-3 rounded-b-xl">
          <p className="text-sm">© 2024 Aswanna Company </p>
        </div>
      </div>

      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
}

export default Sidebar;