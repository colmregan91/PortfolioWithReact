import React, { useState, useEffect } from "react";
import "../styles.css";

export default function Header() {
  const roles = ["Unity 3D Engineer", "React Web Developer", "Game Developer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentRole.substring(0, text.length + 1));
        if (text === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentRole.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex, roles]);

  return (
    <header className="header">
      <img className="header-bg" src="images/hero-bg.jpg" alt="" />
      <div className="header-overlay"></div>
      <div className="header-content">
        <p className="header-greeting">Hi, I'm</p>
        <h1 className="header-name">Colm Regan</h1>
        <p className="header-tagline">
          <span className="typed-text">{text}</span>
          <span className="cursor">|</span>
        </p>
      </div>
    </header>
  );
}
