import React, { useState } from "react";
import "../styles.css";
import ProjectCard from "./ProjectCard";
export default function ProjectGrid({ projects: allProjects = [] }) {
  const projects = allProjects.filter((p) => !p.hidden);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const filters = ["All", ...new Set(projects.map((p) => p.filter))];

  const handleSearchChanged = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChanged = (e) => {
    setFilter(e);
  };

  const MatchesSearch = (project, sTerm) => {
    return project.title.toLowerCase().includes(sTerm.toLowerCase());
  };

  const MatchesFilter = (project, filt) => {
    return (
      project.filter.toLowerCase().includes(filt.toLowerCase()) ||
      filt === "All"
    );
  };

  const filteredProjects = projects.filter(
    (proj) => MatchesFilter(proj, filter) && MatchesSearch(proj, searchTerm)
  );

  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="search for project..."
        value={searchTerm}
        onChange={handleSearchChanged}
      ></input>

      <div className="filter-bar">
        {filters.map((name) => (
          <div className="filter-slot" key={name}>
            <label
              className={
                filter === name ? "filter-label active" : "filter-label"
              }
              onClick={() => handleFilterChanged(name)}
            >
              {name}
            </label>
          </div>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard project={project} key={project.id}></ProjectCard>
        ))}
      </div>
    </div>
  );
}
