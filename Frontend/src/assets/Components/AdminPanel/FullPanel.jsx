import React, { useEffect, useState, Suspense } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import {
  Menu,
  X,
  Users,
  Crop,
  MessageCircle,
  FileText,
  Bell,
  Check,
} from "lucide-react";
import axios from "axios";
import logo from "../../logo.png"; // Import the logo image

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
  </div>
);

// Navigation Link Component
const NavLink = ({ to, Icon, label, isActive, onClick }) => (
  <Link
    to={to}
    className={`
      flex items-center p-3 rounded-lg transition duration-200
      ${
        isActive
          ? "bg-green-600 text-white hover:bg-green-700"
          : "text-gray-700 hover:bg-gray-100"
      }
    `}
    onClick={onClick}
  >
    <Icon className="h-5 w-5 mr-3" />
    <span className="flex-1">{label}</span>
  </Link>
);

// Header Component
const Header = ({ isMobile, onToggleSidebar }) => (
  <header
    className={`${
      isMobile ? "lg:hidden" : "hidden lg:flex"
    } items-center justify-between p-4 ml-5 bg-white shadow`}
  >
    {/* Left Section - Admin Dashboard Title */}

    {/* Right Section - Button to toggle sidebar */}
    <div className="flex items-center ml-auto">
      <div className="flex items-center">
        {isMobile && <h1 className="text-xl font-semibold">Admin Dashboard</h1>}
      </div>
      {isMobile && (
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 ml-auto"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
      )}
    </div>
  </header>
);

function AdminPanel() {
  const [agriOfficerCount, setAgriOfficerCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState({
    feedbacks: [],
    members: [],
    loading: true,
    error: null,
    isSidebarOpen: false,
    newFeedbacks: 0,
    newMembers: 0,
  });

  const {
    feedbacks,
    members,
    loading,
    error,
    isSidebarOpen,
    newFeedbacks,
    newMembers,
  } = state;
  // Fetch agricultural officer count
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/agri-officers")
      .then((response) => {
        setAgriOfficerCount(response.data.length);
      })
      .catch(() => {
        setError("Failed to fetch agricultural officer count.");
      });
  }, []);
  // Fetch data with improved error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const [feedbacksRes, membersRes] = await Promise.all([
          axios.get("http://localhost:8000/api/feedback"),
          axios.get("http://localhost:8000/api/user_manage"),
          axios.get("http://localhost:8000/api/agri-officers"),
        ]);

        // Track new feedbacks or members (for example, by comparing timestamps or IDs)
        const newFeedbacksCount =
          feedbacksRes?.data?.data?.filter(
            (feedback) =>
              new Date(feedback.timestamp) > new Date().setHours(0, 0, 0, 0)
          ).length || 0;

        const newMembersCount =
          membersRes?.data?.filter(
            (member) =>
              new Date(member.registrationDate) >
              new Date().setHours(0, 0, 0, 0)
          ).length || 0;

        setState((prev) => ({
          ...prev,
          feedbacks: feedbacksRes?.data?.data || [],
          members: membersRes?.data || [],
          loading: false,
          newFeedbacks: newFeedbacksCount,
          newMembers: newMembersCount,
        }));
      } catch (err) {
        console.error("Error fetching data:", err);
        setState((prev) => ({
          ...prev,
          error: "Failed to load data. Please try again later.",
          loading: false,
        }));
      }
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setState((prev) => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
  };

  const navigationLinks = [
    { path: "crops-details", icon: Crop, label: "Crops Details" },
    {
      path: "member-details",
      icon: Users,
      label: `Member Details (${members.length})`,
    },
    {
      path: "agri-officers-details",
      icon: Check,
      label: `Agri Officer's Details (${agriOfficerCount})`,
    },
    { path: "forum-details", icon: MessageCircle, label: "Forum Details" },
    { path: "blogs-articles", icon: FileText, label: "Blogs & Articles" },
    {
      path: "feedback",
      icon: Bell,
      label: `Feedbacks (${feedbacks.length})`,
    }, // Indicator for new feedbacks
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 h-full mx-5 bg-white shadow-lg transform lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <header className="p-5 flex justify-between items-center bg-gray-200 rounded-t-xl">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
              <h5 className="text-lg font-bold ml-3">Aswanna Admin</h5>
            </div>
            <button
              className="lg:hidden text-gray-600 hover:text-gray-800"
              onClick={toggleSidebar}
            >
              <X className="h-6 w-6" />
            </button>
          </header>

          {/* Navigation Links */}
          <nav className="p-5 space-y-2 flex-grow overflow-y-auto">
            {loading && <LoadingSpinner />}
            {error && (
              <div className="text-center p-4 text-red-500 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            {!loading &&
              !error &&
              navigationLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={`/admin/${link.path}`}
                  Icon={link.icon}
                  label={link.label}
                  isActive={location.pathname === `/admin/${link.path}`}
                  onClick={() =>
                    setState((prev) => ({ ...prev, isSidebarOpen: false }))
                  }
                />
              ))}
          </nav>

          {/* Footer */}
          <footer className="bg-green-700 text-center text-white py-3 rounded-b-xl">
            <p>&copy; 2024 Aswanna Company</p>
          </footer>
        </div>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Header isMobile={true} onToggleSidebar={toggleSidebar} />

        {/* Dynamic Content */}
        <div className="p-6">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default AdminPanel;
