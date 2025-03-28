import React, { useEffect, useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Crop,
  Users,
  MessageCircle,
  FileText,
  Bell,
  Moon,
  Sun,
  LogOut,
  check,
} from "lucide-react";
import axios from "axios";

// Loading Fallback Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
  </div>
);

function AdminPanel() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const location = useLocation();
  const navigate = useNavigate();

  // Fetch data with improved error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [feedbacksResponse, membersResponse] = await Promise.allSettled([
          axios.get("/api/feedbacks", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }),
          axios.get("/api/registrations", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }),
        ]);

        if (feedbacksResponse.status === "fulfilled") {
          setFeedbacks(feedbacksResponse.value.data.data || []);
        }

        if (membersResponse.status === "fulfilled") {
          setMembers(membersResponse.value.data || []);
        }
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin-login");
  };

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className={`
      flex items-center p-3 rounded-lg text-white 
      ${location.pathname.includes(to) ? "bg-green-700" : "bg-green-500"} 
      hover:bg-green-600 transition duration-200 space-x-2
    `}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </Link>
  );

  return (
    <div
      className={`flex h-screen overflow-hidden ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 h-full mx-5 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white"
        } shadow transform lg:relative lg:translate-x-0 lg:shadow-md transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div
            className={`p-5 flex justify-between items-center ${
              darkMode ? "bg-gray-700" : "bg-gray-200"
            } rounded-t-xl`}
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-12 h-12 rounded-full"
            />
            <h5 className="text-lg font-bold">Aswanna Admin</h5>
            <button
              className={`lg:hidden ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
              onClick={toggleSidebar}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-5 space-y-4 flex-grow overflow-y-auto">
            {loading && <LoadingSpinner />}
            {error && <div className="text-center text-red-500">{error}</div>}
            {!loading && !error && (
              <>
                <NavLink to="/admin/crops-details" icon={Crop}>
                  Crops Details
                </NavLink>
                <NavLink to="/admin/member-details" icon={Users}>
                  Member Details ({members.length})
                </NavLink>
                <NavLink to="/admin/agri-officers-details" icon={check}>
                  Feedbacks ({feedbacks.length})
                </NavLink>
                <NavLink to="/admin/forum-details" icon={MessageCircle}>
                  Forum Details
                </NavLink>
                <NavLink to="/admin/blogs-articles" icon={FileText}>
                  Blogs & Articles
                </NavLink>
                <NavLink to="/admin/feedback" icon={Bell}>
                  Feedbacks ({feedbacks.length})
                </NavLink>
              </>
            )}
          </div>

          {/* Sidebar Footer */}
          <div
            className={`bg-green-700 text-center text-white py-3 rounded-b-xl flex justify-between items-center px-4`}
          >
            <span>&copy; 2024 Aswanna</span>
            <button
              onClick={handleLogout}
              className="hover:text-red-200 transition"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div
          className={`lg:hidden flex items-center justify-between p-4 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white"
          } shadow`}
        >
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Content Outlet */}
        <main
          className={`flex-1 overflow-y-auto p-4 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
