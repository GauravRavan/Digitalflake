import React, { useState } from "react";
import profile from "./assets/profile.svg";
import logo from "./assets/logod.svg";
import mainlogo from "./assets/mainlogo.png"

function Navbar() {
  return (
    <div
      style={{
        width: "100vw",
        height: "10vh",
        backgroundColor: "#662671",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <img src={mainlogo} alt="Logo" style={{ height: "80%", marginLeft: "20px" }} />
      <img src={profile} alt="Profile" style={{ height: "50%", marginRight: "20px" }} />
    </div>
  );
}

export default Navbar;
