import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div id="header-item1" className="header-item">
          <h5>SA</h5>
        </div>

        <div className="header-item">
          <h3>AUDIT</h3>
        </div>

        <div id="header-item2" className="header-item">
          <div style={{ padding: "10px" }}>
            <FaFacebookF />
          </div>
          <div style={{ padding: "10px" }}>
            <FaInstagram />
          </div>
          <div style={{ padding: "10px" }}>
            <FaTwitter />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
