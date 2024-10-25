import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { notification } from "antd";
import { MdOutlineEmail } from "react-icons/md";

const Contact = () => {
  const [api, contextHolder] = notification.useNotification();

  const form = useRef();
  const userEmail = useRef();

  const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY || "";
  const serviceId = import.meta.env.VITE_APP_SERVICE_ID || "";
  const templateId = import.meta.env.VITE_APP_TEMPLATE_ID || "";

  const sendEmail = (e) => {
    e.preventDefault();

    const emailValue = userEmail.current?.value;

    if (emailValue) {
      emailjs
        .sendForm(serviceId, templateId, form.current, publicKey)
        .then(() => {
          api.success({
            message: "Success",
            description: `Mesajınız uğurla göndərildi, ${emailValue}!`,
            placement: "topRight",
          });
        })
        .catch((err) => {
          api.error({
            message: "Error",
            description: "Serverde xəta var. Mesaj göndərilə bilmədi.",
            placement: "topRight",
          });
          console.error(err);
        });
    }
  };

  return (
    <section>
      {contextHolder}
      <div className="contact-section">
        <h2>Contact</h2>
      </div>
      <div className="info-contact">
        <h2>Send Us A Message</h2>
        <form ref={form} onSubmit={sendEmail}>
          <div className="input">
            <MdOutlineEmail style={{ fontSize: "25px" }} />
            <input
              placeholder="Your Email Address"
              type="email"
              ref={userEmail}
              name="email"
              id="email"
              className="input"
            />
          </div>
          <textarea
            name="message"
            id="message"
            className="message-box"
            placeholder="Your Message"
          ></textarea>
          <input type="submit" value="SUBMIT" className="submit-btn" />
        </form>
      </div>
    </section>
  );
};

export default Contact;
