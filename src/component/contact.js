import { Navbar } from "./navbar";
import img from "../image/5118759.jpg";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_munuj4n", "template_m1hutpl", form.current, {
      publicKey: "jIGXicsyrfxC_me7T",
    });
  };

  return (
    <>
      <Navbar />
      <div className="contact">
        <form ref={form} onSubmit={sendEmail}>
          <h2>Contact Us</h2>
          <input type="text" placeholder="Name" name="user_name" required />
          <input type="email" placeholder="Email" name="user_email" required />
          <textarea
            className="text"
            placeholder="Message"
            name="message"
            required
          />
          <button type="submit">Send</button>
        </form>
        <img src={img} alt="contact" />
      </div>
    </>
  );
};
