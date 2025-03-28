import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";


const SignUpForm = () => {  

  const navigate = useNavigate();
  
  const [fullname, setFullname] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [district, setDistrict] = useState("");
  const [districtError, setDistrictError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [userType, setUserType] = useState("");
  const [userTypeError, setUserTypeError] = useState("");
  const [profilePhotoError, setProfilePhotoError] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState("");

  const handleFullnameChange = (e) => {
    setFullname(e.target.value);

    if (e.target.value.trim().length === 0) {
      setFullnameError("Full name is required.");
    } else {
      setFullnameError("");
    }
  };

  const validateEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePhone = (e) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);
    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(phoneValue)) {
      setPhoneError("Please enter a valid phone number (10 digits)");
    } else {
      setPhoneError("");
    }
  };

  const validateUsername = (e) => {
    const usernameValue = e.target.value;
    setUsername(usernameValue);

    if (usernameValue.length > 10) {
      setUsernameError("Username must be 10 characters or less");
    } else {
      setUsernameError("");
    }
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
    if (!e.target.value) {
      setDistrictError("Please select a district.");
    } else {
      setDistrictError("");
    }
  };

  const validatePassword = (e) => {
    const passwordValue = e.target.value;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPassword(passwordValue);

    if (passwordValue.length === 0) {
      setPasswordError(""); // Clear error when field is empty
    } else if (!passwordPattern.test(passwordValue)) {
      setPasswordError(
        "Password must contain at least 8 characters and include uppercase letters, lowercase letters, numbers, special characters"
      );
    } else {
      setPasswordError("");
    }
  };
  

  const validateConfirmPassword = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (confirmPasswordValue !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
    if (!e.target.value) {
      setUserTypeError("Please select a user type.");
    } else {
      setUserTypeError("");
    }
  };

  const validateProfilePhoto = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (file && validImageTypes.includes(file.type)) {
      setProfilePhoto(file);
      setProfilePhotoError("");
    } else {
      setProfilePhoto(null);
      setProfilePhotoError(
        "Please upload a valid image file (jpeg, png, gif)."
      );
    }
  };

  const handleTermsChange = (e) => {
    setTermsChecked(e.target.checked);
    if (e.target.checked) {
      setTermsError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    
    if (!fullname) newErrors.fullname = "Full name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format.";
    if (!phone) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone number must be 10 digits.";
    if (!username) newErrors.username = "Username is required.";
    if (!district) newErrors.district = "Please select a district.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters long.";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    if (!userType) newErrors.userType = "Please select a user type.";
    if (!profilePhoto) newErrors.profilePhoto = "Profile photo is required.";
    if (!termsChecked) newErrors.terms = "You must agree to the terms.";

    if (
      !fullnameError &&
      !districtError &&
      !userTypeError &&
      !emailError &&
      !phoneError &&
      !usernameError &&
      !passwordError &&
      !confirmPasswordError &&
      !profilePhotoError &&
      termsChecked
    ) {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("username", username);
      formData.append("district", district);
      formData.append("password", password);
      formData.append("password_confirmation", confirmPassword);
      formData.append("user_type", userType);
      if (profilePhoto)formData.append("profile_photo", profilePhoto);
      
      formData.append("terms", termsChecked);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Important for file uploads
            },
          }
        );
        console.log(response.data);
        alert("Registration successful!");
        navigate("/login"); // Redirect to login page after successful registration
      } catch (error) {
        console.error("There was an error with the registration:", error);
        alert("Registration failed. Please try again.");
        
      }
    } else {
      alert("Please correct the errors in the form.");
    }
  };

  return (
    <div className="form-container">
     
      <div className="form-logo-container">
        
      </div>

      <div className="form-wrapper wide-form">
      <img src={logo} alt="Logo" className="form-logo" />
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleSubmit}>
         <br />
         <br />
          <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              placeholder="Enter your full name"
              value={fullname}
              onChange={handleFullnameChange}
            />
            {fullnameError && <p className="error-message">{fullnameError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={validateEmail}
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={validatePhone}
            />
            {phoneError && <p className="error-message">{phoneError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Use only-10 characters"
              value={username}
              onChange={validateUsername}
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="district">Select Your District</label>
            <select
              id="district"
              value={district}
              onChange={handleDistrictChange}
            >
              <option value="" disabled>
                Select District
              </option>
              <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kaluthara">Kaluthara</option>
              <option value="Kandy">Kandy</option>
              <option value="Matale">Matale</option>
              <option value="Nuwara Eliya">Nuwara Eliya</option>
              <option value="Galle">Galle</option>
              <option value="Matara">Matara</option>
              <option value="Hambanthota">Hambanthota</option>
              <option value="Jaffna">Jaffna</option>
              <option value="Kilinochchi">Kilinochchi</option>
              <option value="Mannar">Mannar</option>
              <option value="Mullativu">Mullativu</option>
              <option value="Vavuniya">Vavuniya</option>
              <option value="Batticaloa">Batticaloa</option>
              <option value="Ampara">Ampara</option>
              <option value="Trincomalee">Trincomalee</option>
              <option value="Kurunegala">Kurunegala</option>
              <option value="Puttalam">Puttalam</option>
              <option value="Anuradhapura">Anuradhapura</option>
              <option value="Polonnaruwa">Polonnaruwa</option>
              <option value="Badulla">Badulla</option>
              <option value="Monaragala">Monaragala</option>
              <option value="Ratnapura">Ratnapura</option>
              <option value="Kegalle">Kegalle</option>
            </select>
            {districtError && <p className="error-message">{districtError}</p>}
          </div>

          <div className="form-group password">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={validatePassword}
              autoComplete="new-password" // Disable browser autofill
              />
              <button
                type="button"
                className="password-toggle-button"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Re-Enter Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Re-Enter your password"
              value={confirmPassword}
              onChange={validateConfirmPassword}
            />
            {confirmPasswordError && (
              <p className="error-message">{confirmPasswordError}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="userType">Register as:</label>
            <div className="radio-box">
              <label className="radio-option">
                <input
                  type="radio"
                  name="userType"
                  value="Farmer"
                  checked={userType === "Farmer"}
                  onChange={handleUserTypeChange}
                />
                <span>Farmer</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="userType"
                  value="Officer"
                  checked={userType === "Officer"}
                  onChange={handleUserTypeChange}
                />
                <span>Officer</span>
              </label>
            </div>
            {userTypeError && <p className="error-message">{userTypeError}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="profilePhoto">Profile Picture</label>
            <input
              type="file"
              id="profile-pic"
              onChange={validateProfilePhoto}
            />
            {profilePhotoError && (
              <p className="error-message">{profilePhotoError}</p>
            )}
          </div>
          <div className="form-group"></div>
          <br />

          <div className="flex items-center mb-4">
            <label htmlFor="terms">
              I agree to the <a href="#">Terms and Conditions</a>
            </label>
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="check"
              checked={termsChecked}
              onChange={handleTermsChange}
            />

            {termsError && <p className="error-message">{termsError}</p>}
          </div>
          <br />

          <div className="submit-button">
            <button type="submit" className="submit-button">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
