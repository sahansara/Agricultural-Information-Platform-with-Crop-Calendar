import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import ImageSlider from "./components/ImageSlider";
import AboutUs from "./components/AboutUs";
import OurService from "./components/OurServise";
import Home from "./components/Home";
import PostFeedback from "./components/PostFeedback";
import AgriAssistance from "./components/AgriAssistance";
import PlantAI from "./components/geminaiBack/Public/PlantAI";
import DeputyHeadList from "./components/DeputyHeadList/DeputyHeadList";
import Login from './components/loginComponent/login';
import SignUpForm from "./components/registerComponent/SignUpForm";
import Forgot from './components/Forgot-password/Forgot';
import PassReset from './components/Password-reset/PassReset';
import QuestionForm from "./components/QuestionForm.jsx";
import CropFrontend from "./components/crops/CropFrontend.jsx";
import FullPanel from "./assets/Components/AdminPanel/FullPanel.jsx";
import CropDetails from "./assets/Components/AdminPanel/CropsDetails.jsx";
import AdminFeedback from "./assets/Components/AdminPanel/adminFeedback.jsx";
import AgriOfficer from "./assets/Components/AdminPanel/AgriOfficer.jsx";
import BlogsArticles from "./assets/Components/AdminPanel/BlogsArticles.jsx";
import ForumDetails from "./assets/Components/AdminPanel/ForumDetails.jsx";
import MemberDetails from "./assets/Components/AdminPanel/MemberDetails.jsx";
import Unauthorized from "./components/Unauthorized.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem('userRole') || '';
    });

    useEffect(() => {
        localStorage.setItem('isAuthenticated', isAuthenticated);
        localStorage.setItem('userRole', userRole);
    }, [isAuthenticated, userRole]);

    return (
        <Router>
            <Routes>
                {/* ✅ Public Routes (No Authentication Required) */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/forgot-password" element={<Forgot />} />
                <Route path="/password-reset" element={<PassReset />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/ourService" element={<OurService />} />
                <Route path="/plantlens-ai" element={<PlantAI />} />
                <Route path="/contact-us" element={<PostFeedback />} />
                <Route path="/agri-assistance" element={<AgriAssistance />} />
                <Route path="/deputy-headList" element={<DeputyHeadList />} />
                <Route path="/forum" element={<QuestionForm />} />
                <Route path="/crop-calendar" element={<CropFrontend />} />

                {/* ✅ Protected Admin Routes */}
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
                            <FullPanel />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/crops-details"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
                            <CropDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/feedback"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
                            <AdminFeedback />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/agri-officers-details"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
                            <AgriOfficer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/blogs-articles"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
                            <BlogsArticles />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/forum-details"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
                            <ForumDetails />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/member-details"
                    element={
                        <ProtectedRoute isAuthenticated={isAuthenticated} userRole={userRole}>
                            <MemberDetails />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
