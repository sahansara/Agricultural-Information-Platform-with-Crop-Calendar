import React, { forwardRef } from "react";
import "./login.css"; 

const TextFeeld = forwardRef(function TextFeeld({ type, id, name, placeholder, value, onChange, onClick, children }, ref) {
  return (
    <div className="input-container">
      <span className="input-icon">{children}</span> 
      <div style={{ marginRight: "0px" }}>
        <input
          ref={ref} // ✅ Correctly passing ref
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onClick={onClick}
          className="login-input"
        />
      </div>
    </div>
  );
});

export default TextFeeld;
