import React, { useState, useRef } from "react";
import "../contact.css";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const details = [
    {
      icon: "images/address.png",
      heading: "Address",
      text: "151 Latchmere Road, London, SW112JY",
    },
    {
      icon: "images/phone.png",
      heading: "Call",
      text: "+15589 55488 55 / 00000000000",
    },
    {
      icon: "images/email.png",
      heading: "Email",
      text: "colmregan91@gmail.com",
    },
  ];

  const [status, SetStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetStatus("loading");

    try {
      await emailjs.sendForm(
        "service_wwlfyzt",
        "template_goebgxu",
        formRef.current,
        "oH6Nx06dXvHxUOBOd"
      );
      SetStatus("success");
      formRef.current.reset();
    } catch (err) {
      setErrorMsg(err.message);
      SetStatus("error");
    }
  };

  return (
    <section className="contact-section">
      {window.scrollTo({ top: 700, behavior: "smooth" })}
      <div className="contact-wrapper">
        {/* LEFT column */}
        <div className="contact-info">
          {details.map(({ icon, heading, text }) => (
            <div key={heading} className="contact-info-block">
              <span className="contact-info-icon">
                <img src={icon} alt="" />
              </span>
              <div>
                <h4>{heading}</h4>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT column */}
        <form
          ref={formRef}
          className="contact-form"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="contact-form-row contact-two-col">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
          </div>

          <input type="text" placeholder="Subject" required />

          <textarea rows="6" placeholder="Message" />

          <button
            type="submit"
            disabled={status === "loading"}
            className="contact-btn-send"
          >
            {status === "loading" ? "Sending…" : "Send Message"}
          </button>
          {status === "success" && (
            <p className="sent-message">Message sent ✔</p>
          )}
          {status === "error" && <p className="error-message">{errorMsg}</p>}
        </form>
      </div>
    </section>
  );
}
