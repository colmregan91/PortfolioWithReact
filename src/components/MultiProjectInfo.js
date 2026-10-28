import React, { useEffect } from "react";
import "../projInfo.css";

export default function MultiProjectInfo({
  projectInfo,
  projectCount,
  category,
}) {
  const numArray = Array.from({ length: projectCount }, (_, i) => i);
  useEffect(() => {
    window.scrollTo({ top: 700, behavior: "smooth" });
  }, []);

  return (
    <div>
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
            <div className="video-details-wrapper">
            <div className="media-section">
              <video
                controls
                src={`videos/${projectInfo.image[index]}`}
                type="video/mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="project-info">
              <div className="details-grid">
                {projectInfo.releasedate && (
                  <div className="detail-tag">
                    <strong>Released</strong>
                    <span>{projectInfo.releasedate}</span>
                  </div>
                )}
                {projectInfo.steamlink && (
                  <div className="detail-tag">
                    <strong>Steam</strong>
                    {projectInfo.steamlink.startsWith("http") ? (
                      <a href={projectInfo.steamlink} target="_blank" rel="noopener noreferrer">Link</a>
                    ) : (
                      <span>{projectInfo.steamlink}</span>
                    )}
                  </div>
                )}
                {projectInfo.githublink && (
                  <div className="detail-tag">
                    <strong>GitHub</strong>
                    {projectInfo.githublink.startsWith("http") ? (
                      <a href={projectInfo.githublink} target="_blank" rel="noopener noreferrer">Link</a>
                    ) : (
                      <span>{projectInfo.githublink}</span>
                    )}
                  </div>
                )}
                {projectInfo.techused && (
                  projectInfo.techused.split(" & ").length > 1 ? (
                    <div className="detail-tag role-grid-item">
                      <strong>Tech</strong>
                      <div className="tech-grid">
                        {projectInfo.techused.split(" & ").map((t, i) => (
                          <span key={i} className="role-tag">{t.trim()}</span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="detail-tag">
                      <strong>Tech</strong>
                      <span>{projectInfo.techused}</span>
                    </div>
                  )
                )}
                {projectInfo.role && (() => {
                  const role = Array.isArray(projectInfo.role) ? projectInfo.role[index] : projectInfo.role;
                  return role.split(" & ").length > 1 ? (
                    <div className="detail-tag role-grid-item">
                      <strong>My Role</strong>
                      <div className="role-grid">
                        {role.split(" & ").map((r, i) => (
                          <span key={i} className="role-tag">{r.trim()}</span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="detail-tag">
                      <strong>My Role</strong>
                      <span>{role}</span>
                    </div>
                  );
                })()}
              </div>
            </div>
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
