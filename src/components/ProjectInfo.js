import React from "react";
import "../projInfo.css";
import Imageslider from "./Imageslider";

export default function ProjectInfo({ projectInfo, category }) {
  return (
    <div>
      {window.scrollTo({ top: 700, behavior: "smooth" })}
      <div className="page-container">
        <div className="introduction">
          <h1 className="title">{projectInfo.title}</h1>
          {projectInfo.pageIntro.split(" & ").map((para, i) => (
            <p key={i} style={{ marginBottom: "1.5em" }}>
              {para.trim()}
            </p>
          ))}
        </div>

        <div className="project-details-row">
          {projectInfo.image && (
            <div className="media-section">
              <Imageslider images={projectInfo.image}></Imageslider>
            </div>
          )}
          <div className="project-info">
            <h2>Project Details</h2>
            <ul>
              <li>
                <strong>Category</strong>
                <span>{category}</span>
              </li>

              {projectInfo.releasedate && (
                <li>
                  <strong>Release Date</strong>
                  <span>{projectInfo.releasedate}</span>
                </li>
              )}

              {projectInfo.steamlink && (
                <li>
                  <strong>Steam Link </strong>
                  <a
                    href={projectInfo.steamlink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here
                  </a>
                </li>
              )}

              {projectInfo.githublink && (
                <li>
                  <strong>Github Link </strong>
                  <a
                    href={projectInfo.githublink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here
                  </a>
                </li>
              )}
              {projectInfo.techused && (
                <li>
                  <strong>Technologies Used</strong> {projectInfo.techused}
                </li>
              )}
              {projectInfo.role && (
                <li>
                  <strong>My Role</strong> {projectInfo.role}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="technical-info">
          <h1 className="title">Technical Information</h1>
          {projectInfo.infoText.split(" & ").map((para, i) => (
            <p key={i} style={{ marginBottom: "1.5em" }}>
              {para.trim()}
            </p>
          ))}
        </div>

        <div className="media-section">
          <h3 className="title">Gameplay</h3>
          <video
            controls
            width="80%"
            height="50%"
            src={`videos/${projectInfo.gameplay}`}
            type="video/mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {projectInfo.trailer && (
          <div className="media-section">
            <h3 className="title">Trailer</h3>
            <video
              controls
              width="80%"
              height="50%"
              src={`videos/${projectInfo.trailer}`}
              type="video/mp4"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
}
