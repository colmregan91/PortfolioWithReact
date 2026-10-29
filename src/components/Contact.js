import React, { useState, useRef, useEffect } from "react";
import "../contact.css";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const details = [
    {
      icon: "images/address.png",
      heading: "Location",
      text: "London, UK · Irish",
    },
    {
      icon: "images/phone.png",
      heading: "Call",
      text: "UK: +44 7424 194135 / IE: +353 86 060 4603",
    },
    {
      icon: "images/email.png",
      heading: "Email",
      text: "colmregan91@gmail.com",
    },
  ];

  const [status, SetStatus] = useState("idle");
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    SetStatus("loading");
    formRef.current.time.value = new Date().toLocaleString();

    try {
      await emailjs.sendForm(
        "service_t55p1yt",
        "template_goebgxu",
        formRef.current,
        "oH6Nx06dXvHxUOBOd"
      );
      SetStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS send failed:", err);
      SetStatus("error");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 700, behavior: "smooth" });
  }, []);

  return (
    <section className="contact-section">
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
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
          </div>

          <input type="text" name="title" placeholder="Subject" required />

          <textarea rows="6" name="message" placeholder="Message" required />

          <input type="hidden" name="time" />

          <button
            type="submit"
            disabled={status === "loading"}
            className="contact-btn-send"
          >
            {status === "loading" ? "Sending…" : "Send Message"}
          </button>
          {status === "success" && (
            <p className="sent-message">
              Thanks, your message has been sent. I'll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="error-message">
              Sorry, something went wrong. Please email me directly at
              colmregan91@gmail.com.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
