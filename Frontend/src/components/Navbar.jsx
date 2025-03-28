import React, { useState, useEffect , useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight, User } from "lucide-react"; // Import the User icon
import { Link, useLocation } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
import Logo from "../assets/logo.png"; // Adjust the path based on your project structure

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // For mobile menu toggle
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [username, setUsername] = useState(null); // Store the logged-in username
  const [profilePhoto, setProfilePhoto] = useState(null); // Store the profile photo
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown toggle
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false); // For mobile profile dropdown
  const location = useLocation();
  const profileDropdownRef = useRef(null);
  const mobileProfileDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);

  const routes = {
    main: [
      { name: "Home", route: "/" },
      { name: "About Us", route: "/about-us" },
      { name: "Contact Us", route: "/contact-us" },
    ],
    services: [
      { name: "Crop Calendar", route: "/crop-calendar" },
      { name: "PlantLens AI", route: "/plantlens-ai" },
      { name: "Agri Assistance", route: "/agri-assistance" },
      { name: "Agricultural Knowledge Forum", route: "/forum" },
      { name: "Blogs", route: "/blogs" }
    ],
    auth: [
      { name: "Login", route: "/login" },
      { name: "Register", route: "/signup" },
    ],
  };

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  useEffect(() => { 
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        mobileProfileDropdownRef.current &&
        !mobileProfileDropdownRef.current.contains(event.target)
      ) {
        setIsMobileProfileOpen(false);
      }
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(event.target)
      ) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
      if (!token) {
        setUsername(null);
        setProfilePhoto(null);
        return;
      }

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/get-session", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.user) {
          setUsername(response.data.user.username);
          setProfilePhoto(response.data.user.profile_photo || "default-avatar.png"); // Handle default avatar
        } else {
          setUsername(null);
          setProfilePhoto(null);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
        setUsername(null);
        setProfilePhoto(null);
      }
    };

    checkUserSession();
  }, []);


  const handleLogout = async () => {
    const token = localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");
    if (token) {
      try {
        await axios.post(
          "http://127.0.0.1:8000/api/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        localStorage.removeItem("auth_token");
        sessionStorage.removeItem("auth_token");
        setUsername(null);
        setProfilePhoto(null);
        setIsDropdownOpen(false);
        setIsMobileProfileOpen(false);
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <div>
      <nav className="fixed w-full top-0 left-0 z-40 transition-all duration-300 bg-white/80 backdrop-blur-lg shadow-md ">
        <div className="px-4 h-16 flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={Logo} alt="Aswanna Logo" className="h-8 w-auto" />
            <span className="text-xl font-semibold text-gray-800 ml-2">Aswanna</span>
          </Link>

          {/* Mobile Hamburger and Profile Icon */}
          <div className="md:hidden flex items-center space-x-4">
            {username && (
              <div ref={mobileProfileDropdownRef} className="relative">
                <button onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}>
                  <img
                    src={profilePhoto ? `http://127.0.0.1:8000/${profilePhoto}` : "default-avatar.png"}
                    alt="User Profile"
                    className="h-8 w-8 rounded-full"
                  />
                </button>
                
                {/* Mobile Profile Dropdown */}
                {isMobileProfileOpen && (
                  <div className="absolute top-10 right-0 w-48 bg-white shadow-lg rounded-lg py-2 mt-2 border border-gray-100 z-50">
                    <div className="px-4 py-2 text-gray-800 font-medium">{username}</div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors duration-150"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-8 ${isOpen ? 'block' : 'hidden'}`}>
            {routes.main.map((item, index) => (
              <Link
                key={index}
                to={item.route}
                className={`text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg transition-colors duration-150 ${
                  isActiveRoute(item.route) ? "bg-gray-100/80 text-gray-900" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Services Dropdown */}
            <div ref={servicesDropdownRef} className="relative">
              <button
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg flex items-center"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg py-2 border border-gray-100">
                  {routes.services.map((service, index) => (
                    <Link
                      key={index}
                      to={service.route}
                      className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-150"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Auth Buttons or User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {!username ? (
              routes.auth.map((item, index) => (
                <Link
                  key={index}
                  to={item.route}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  {item.name}
                </Link>
              ))
            ) : (
              <div ref={profileDropdownRef} className="relative flex items-center space-x-4 ml-4">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img
                      src={profilePhoto ? `http://127.0.0.1:8000/${profilePhoto}` : "default-avatar.png"}
                      alt="User Profile"
                      className="h-14 w-14 rounded-full"
                    />

                </button>

                {/* Profile Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-14 left-0 w-48 bg-white shadow-lg rounded-lg py-2 mt-2 border border-gray-100">
                    <div className="px-4 py-2 text-gray-800">{username}</div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors duration-150"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col space-y-4 pb-4">
            {routes.main.map((item, index) => (
              <Link
                key={index}
                to={item.route}
                className={`text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors duration-150 ${
                  isActiveRoute(item.route) ? "bg-gray-100/80 text-gray-900" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="relative">
              <button
                className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg flex items-center"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {isServicesOpen && (
                <div className="relative w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-lg py-2 border border-gray-100 mt-1">
                  {routes.services.map((service, index) => (
                    <Link
                      key={index}
                      to={service.route}
                      className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-150"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Auth Buttons */}
            {!username && (
              <div className="flex flex-col space-y-2 mt-2 px-4">
                {routes.auth.map((item, index) => (
                  <Link
                    key={index}
                    to={item.route}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-center"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;