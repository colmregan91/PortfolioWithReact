import React from "react";
import "../styles.css";

export default function Footer() {
  const yr = new Date().getFullYear();

  return (
    <div>
      <footer className="footer">
        <p className="footer-text" style={{ marginBottom: 0, marginTop: 0 }}>
          © {yr} Colm Regan. All rights reserved.
        </p>
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0px",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          <li>
            <a href="https://www.linkedin.com/in/colmregan/">
              <img
                src="images/linkedin.png"
                alt="Descriptive Text"
                style={{ width: "44px", height: "44px", objectFit: "contain" }}
              />
            </a>
          </li>
          <li>
            <a href="https://github.com/colmregan91">
              <img
                src="images/github.png"
                alt="GitHub Logo"
                style={{ width: "44px", height: "44px", objectFit: "contain" }}
              />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/topboxstudios/">
              <img
                src="images/instagram.png"
                alt="Instagram Logo"
                style={{ width: "44px", height: "44px", objectFit: "contain" }}
              />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}
