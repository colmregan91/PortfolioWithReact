import React from "react";
import "../styles.css";
import ProjectInfo from "./ProjectInfo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
export default function ProjectCard({ project }) {
  const handleImageLoadError = (e) => {
    e.target.src = "images/default.jpg";
  };

  return (
    <div key={project.id} className="project-card">
      <Link to={project.PageRoute}>
        <img
          src={`images/${project.image}`}
          alt={project.title}
          onError={handleImageLoadError}
        />
        <div className="project-card-info">
          <h3 className="project-card-title">{project.title}</h3>
        </div>
      </Link>
    </div>
  );
}
