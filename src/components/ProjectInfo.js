import React, { useEffect } from "react";
import "../projInfo.css";
import Imageslider from "./Imageslider";

export default function ProjectInfo({ projectInfo, category }) {
  useEffect(() => {
    window.scrollTo({ top: 700, behavior: "smooth" });
  }, []);

  return (
    <div>
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
          {projectInfo.embedlink ? (
            <div className="media-section">
              <iframe
                className="site-embed"
                src={projectInfo.embedlink}
                title={`${projectInfo.title} live site`}
              ></iframe>
            </div>
          ) : (
            projectInfo.image && (
              <div className="media-section">
                <Imageslider
                  images={projectInfo.image}
                  width={projectInfo.sliderWidth}
                ></Imageslider>
              </div>
            )
          )}
          <div className="project-info">
            <div className="details-grid">
              {(projectInfo.releasedate || projectInfo.steamlink || projectInfo.livelink || projectInfo.githublink) && (
                <div className="detail-links-row">
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
                  {projectInfo.livelink && (
                    <div className="detail-tag">
                      <strong>Live Site</strong>
                      <a href={projectInfo.livelink} target="_blank" rel="noopener noreferrer">Link</a>
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
              {projectInfo.role && (
                projectInfo.role.split(" & ").length > 1 ? (
                  <div className="detail-tag role-grid-item">
                    <strong>My Role</strong>
                    <div className="role-grid">
                      {projectInfo.role.split(" & ").map((r, i) => (
                        <span key={i} className="role-tag">{r.trim()}</span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="detail-tag">
                    <strong>My Role</strong>
                    <span>{projectInfo.role}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {projectInfo.additionalText && (
          <div className="introduction">
            {projectInfo.additionalText.split(" & ").map((para, i) => (
              <p key={i} style={{ marginBottom: "1.5em" }}>
                {para.trim()}
              </p>
            ))}
          </div>
        )}

        <div className="technical-info">
          <h1 className="title">Technical Information</h1>
          {projectInfo.infoText.split(" & ").map((para, i) => (
            <p key={i} style={{ marginBottom: "1.5em" }}>
              {para.trim()}
            </p>
          ))}
        </div>

        {projectInfo.gameplay && projectInfo.gameplay.length > 0 && (
        <div className="media-section">
          <h3 className="title">{projectInfo.gameplayLabel || "Gameplay"}</h3>
          {Array.isArray(projectInfo.gameplay) ? (
            <div className="video-row">
              {projectInfo.gameplay.map((vid, i) => (
                <video key={i} controls src={`videos/${vid}`} type="video/mp4">
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          ) : (
            <video
              controls
              src={`videos/${projectInfo.gameplay}`}
              type="video/mp4"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        )}

        {projectInfo.trailer && (
          <div className="media-section">
            <h3 className="title">{projectInfo.trailerLabel || "Trailer"}</h3>
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
