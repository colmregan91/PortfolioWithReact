import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../projInfo.css";
import "../about.css";
import { scrollToPageTop } from "../scrollPositions";

export default function About() {
  const skills = [
    {
      label: "Unity",
      tags: ["Unity 6", "C#", "URP", "ShaderGraph", "Zenject", "UniTask", "DOTS", "Editor Scripting", "VR (Rift, Quest)"],
    },
    {
      label: "Networking & Backend",
      tags: ["Photon Fusion", "PUN2", "SignalR", "WebSocket", "Redis Pub/Sub", "Redis Streams", "Docker", "Azure", "Firebase"],
    },
    {
      label: "Web",
      tags: ["React", "Vue 3", "Vite", "Tailwind", "ASP.NET", "MS SQL"],
    },
    {
      label: "Client & Leadership",
      tags: ["Live Demos", "On Site Deployment", "Runbooks", "Requirements Gathering", "Contractor Management", "Team Lead", "Hiring & Onboarding", "Stakeholder Reporting", "Agile"],
    },
  ];

  useEffect(() => {
    scrollToPageTop();
  }, []);

  return (
    <div>
      <div className="page-container">
        <div className="introduction about-intro">
          <img
            className="about-photo"
            src="images/profile.jpg"
            alt="Portrait of Colm Regan"
          />
          <div>
            <h1 className="title">
              Lead Unity Developer & Technical Account Manager
            </h1>
            <p className="about-tagline">
              Nine years shipping Unity products, from multiplayer arenas to AI
              coaching platforms. I write the code, ship the build, and own the
              client relationship.
            </p>
            <p>
              I'm an Irish Unity developer based in London. I didn't take the
              straight road into games. My first degree was in Social and
              Community Development, and I came to code mostly by teaching
              myself, which led to a year studying game development. From there
              a friend and I set up Topbox Studio in 2017, and we spent the next four
              years learning by making games. Later I went back for a first
              class Higher Diploma in Software Development.
            </p>
          </div>
        </div>

        <div className="project-details-row">
          <div className="project-info">
            <div className="details-grid">
              {skills.map(({ label, tags }) => (
                <div key={label} className="detail-tag role-grid-item">
                  <strong>{label}</strong>
                  <div className="role-grid">
                    {tags.map((t) => (
                      <span key={t} className="role-tag">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="introduction">
          <h1 className="title">Career</h1>
          <p>
            At Topbox Studio in Dublin we owned everything from the first line
            of code to store submission. We shipped Bionic Blitz to Steam and
            Android, and built The Chicken and the Fox, an interactive Unity
            children's book, in collaboration with author Randol Taylor's
            company, Taylor's Fables and Animal Tails.
          </p>
          <p>
            Then I joined Mesmerise Global as a Unity developer working on
            multiplayer VR, and was made lead within a year. As lead I ran the
            data management team, hired and onboarded new developers, and was
            technical lead for a VR product at our sister company Metaphoric
            Games.
          </p>
          <p>
            At Bloktopia I built the front end and Photon Fusion networking for
            a suite of live multiplayer games, including Blok Arcade and
            Blokbuster, a real time trivia arena for up to 800 players.
          </p>
        </div>

        <div className="technical-info">
          <h1 className="title">Coach Cube</h1>
          <p>
            The work I'm proudest of is{" "}
            <Link className="about-link" to="/coachcube">Coach Cube</Link>, an
            AI fitness hardware startup where I was the fourth hire and have
            led the front end since day one. I built the Unity 6 client, its
            real time data layer over Redis and WebSocket, and the embedded
            React UI.
          </p>
          <p>
            As we got closer to launch I moved into a Technical Account Manager
            role alongside development. I commission client sites, and I've
            supported 30 to 40 live demos for investors and clients, co-managed
            our first commercial pilot, and written the failure mode runbook so
            site issues can be fixed without escalating to an engineer.
          </p>
          <p>
            That mix is what I do best. I'm as comfortable in front of clients
            and crowds of people as I am in the codebase, and seeing real people
            use what you've built changes how you build the next thing.
          </p>
        </div>
      </div>
    </div>
  );
}
