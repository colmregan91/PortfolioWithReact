import React from "react";
import "../projInfo.css";

export default function MultiProjectInfo({
  projectInfo,
  projectCount,
  category,
}) {
  const numArray = Array.from({ length: projectCount }, (_, i) => i);
  return (
    <div>
      {window.scrollTo({ top: 700, behavior: "smooth" })}
      <div className="introduction">
        <h1 className="title">Introduction</h1>
        {projectInfo.pageIntro.split(" & ").map((para, i) => (
          <p key={i} style={{ marginBottom: "1.5em" }}>
            {para.trim()}
          </p>
        ))}
      </div>
      {numArray.map((index) => (
        <div className="page-container" key={index}>
          <div className="introduction">
            <h1 className="title">{projectInfo.title[index]}</h1>
            {projectInfo.introText[index].split(" & ").map((para, i) => (
              <p key={i} style={{ marginBottom: "1.5em" }}>
                {para.includes("[LINK]") ? (
                  <>
                    {para.slice(0, para.indexOf("[LINK]")).trim()}{" "}
                    <a
                      href={para.slice(para.indexOf("[LINK]") + 6).trim()}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {para.slice(para.indexOf("[LINK]") + 6).trim()}
                    </a>
                  </>
                ) : (
                  para.trim()
                )}
              </p>
            ))}
          </div>

          <div className="project-details-row">
            <div className="media-section">
              <video
                controls
                width="100%"
                height="50%"
                src={`videos/${projectInfo.image[index]}`}
                type="video/mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="project-info">
              <h2>Project Details</h2>
              <ul>
                <li>
                  <strong>Category</strong>
                  <span>{category}</span>
                </li>

                {projectInfo.releasedate && (
                  <li>
                    <strong>Released</strong>
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
            {projectInfo.infoText[index].split(" & ").map((para, i) => (
              <p key={i} style={{ marginBottom: "1.5em" }}>
                {para.trim()}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
