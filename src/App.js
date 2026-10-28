import "./App.css";
import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProjectGrid from "./components/ProjectsGrid";
import About from "./components/About";
import Contact from "./components/Contact";
import ProjectInfo from "./components/ProjectInfo";
import MultiProjectInfo from "./components/MultiProjectInfo";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Backtotop from "./components/Backtotop";
function App() {
  const [projects, setProjects] = useState([]);
  const [projectInfos, setProjectsInfos] = useState([]);
  useEffect(() => {
    fetch("projects.json")
      .then((respnse) => respnse.json())
      .then((data) => setProjects(data));
  }, []);

  useEffect(() => {
    fetch("projectsInfo.json")
      .then((respnse) => respnse.json())
      .then((data) => setProjectsInfos(data));
  }, []);
  const homePath = "/";

  const aboutPath = "/about";

  const contactPath = "/contact";
  return (
    <div className="App">
      <Header></Header>
      <div className="container">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to={homePath}>Home</Link>
              </li>
              <li>
                <Link to={aboutPath}>About</Link>
              </li>
              <li>
                <Link to={contactPath}>Contact</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path={homePath}
              element={<ProjectGrid projects={projects} />}
            ></Route>
            <Route path={aboutPath} element={<About />}></Route>
            <Route path={contactPath} element={<Contact />}></Route>
            {projects.map((project) => (
              <Route
                key={project.id}
                path={project.PageRoute}
                element={
                  project.projectCount < 2 ? (
                    <ProjectInfo
                      projectInfo={projectInfos.find(
                        (t) => t.id === project.id
                      )}
                      category={project.filter}
                    />
                  ) : (
                    <MultiProjectInfo
                      projectInfo={projectInfos.find(
                        (t) => t.id === project.id
                      )}
                      projectCount={project.projectCount}
                      category={project.filter}
                    />
                  )
                }
              ></Route>
            ))}
          </Routes>
        </Router>
      </div>
      <Backtotop></Backtotop>
      <Footer></Footer>
    </div>
  );
}

export default App;
