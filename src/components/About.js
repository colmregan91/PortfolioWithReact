import React from "react";
import "../about.css"; // ← adjust the path if you keep CSS elsewhere

// Optional: pass props if you want dynamic data.
// Here it is hard‑coded to mirror the previous example.
export default function About() {
  const facts = [
    { label: "Birthday", value: "1 May 1995" },
    { label: "Nationality", value: "Irish" },
    { label: "Location", value: "London, UK" },
    { label: "Degree", value: "Master" },
    { label: "Phone", value: "+123 456 7890" },
    { label: "Email", value: "email@example.com" },
    { label: "Freelance", value: "Available" },
    { label: "extra", value: "Available" },
    { label: "extra", value: "Available" },
  ];

  return (
    <>
      {" "}
      {window.scrollTo({ top: 700, behavior: "smooth" })}
      <section className="about-container">
        {/* portrait */}
        <div className="about-photo">
          <img src="/images/profile.jpg" alt="Portrait of John Doe" />
        </div>

        {/* text column */}
        <div className="about-content">
          <h2 className="role">UI/UX Designer Web Developer.</h2>

          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <ul className="facts">
            {facts.map(({ label, value }) => (
              <li key={label}>
                <span>{label}:</span> {value}
              </li>
            ))}
          </ul>

          <p>
            Officiis eligendi itaque labore et dolorum mollitia officiis optio
            vero. Quisquam sunt adipisci omnis et ut. Nulla accusantium dolor
            incidunt officia tempore. Et eius omnis. Cupiditate ut dicta maxime
            officiis quidem quia. Sed et consectetur qui quia repellendus itaque
            neque.
          </p>
          <p>SkillSet</p>
        </div>
      </section>
    </>
  );
}
