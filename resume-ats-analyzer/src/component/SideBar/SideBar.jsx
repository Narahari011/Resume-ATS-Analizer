import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const SideBar = () => {
  return (
    <div className="SideBar">

      <h2 className="logo">
        Resume ATS
      </h2>

      <div className="menu">

        <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="sidebarOption">
            📊 Dashboard
          </div>
        </Link>

        <Link to="/history" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="sidebarOption">
            📜 History
          </div>
        </Link>

        <Link to="/chatbot" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="sidebarOption">
            🤖 AI Assistant
          </div>
        </Link>

        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="sidebarOption">
            🚪 Logout
          </div>
        </Link>

      </div>

    </div>
  );
};

export default SideBar;