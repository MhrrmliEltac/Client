import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaFacebookF, FaPinterestP, FaInstagram } from "react-icons/fa";
import { notification } from "antd";

const Footer = () => {
  const [api, contextHolder] = notification.useNotification();

  const form = useRef();
  const userName = useRef();
  const userEmail = useRef();

  const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY || "";
  const serviceId = import.meta.env.VITE_APP_SERVICE_ID || "";
  const templateId = import.meta.env.VITE_APP_TEMPLATE_ID || "";

  const sendEmail = (e) => {
    e.preventDefault();

    const nameValue = userName.current?.value;
    const emailValue = userEmail.current?.value;

    if (nameValue && emailValue) {
      emailjs
        .sendForm(serviceId, templateId, form.current, publicKey)
        .then(() => {
          api.success({
            message: "Success",
            description: `Mesajınız uğurla göndərildi, ${nameValue}!`,
            placement: "topRight",
          });
        })
        .catch((err) => {
          console.log(err);
          api.error({
            message: "Error",
            description: "Serverde xəta var. Mesaj göndərilə bilmədi.",
            placement: "topRight",
          });
        });
    }
  };

  return (
    <footer>
      {contextHolder}
      <section className="footer-container">
        <div className="footer-list">
          <ul className="category-list">
            <li className="heading">Categories</li>
            <ul className="list">
              <li>Women</li>
              <li>Men</li>
              <li>Shoes</li>
              <li>Watches</li>
            </ul>
          </ul>
          <ul className="help-list">
            <li className="heading">Help</li>
            <ul className="list">
              <li>Track Order</li>
              <li>Returns</li>
              <li>Shipping</li>
              <li>FAQs</li>
            </ul>
          </ul>
          <ul className="get-in-touch">
            <li className="heading">GET IN TOUCH</li>
            <ul className="list">
              <li className="description">
                Any questions? Let us know in store at 8th floor, 379 Hudson St,
                New York, NY 10018 or call us on (+994) 51 767 37 68
              </li>
              <li>
                <ul className="icon-list">
                  <li>
                    <FaFacebookF
                      className="icon-item"
                      style={{ cursor: "pointer" }}
                    />
                  </li>
                  <li>
                    <FaInstagram
                      className="icon-item"
                      style={{ cursor: "pointer" }}
                    />
                  </li>
                  <li>
                    <FaPinterestP
                      className="icon-item"
                      style={{ cursor: "pointer" }}
                    />
                  </li>
                </ul>
              </li>
            </ul>
          </ul>
          <ul className="news-letter">
            <li className="heading">Newsletter</li>
            <ul className="list">
              <li>
                <form ref={form} onSubmit={sendEmail}>
                  <label>Name</label>
                  <input
                    required
                    ref={userName}
                    type="text"
                    name="user_name"
                    className="user_name"
                  />
                  <label>Email</label>
                  <input
                    required
                    ref={userEmail}
                    type="email"
                    name="user_email"
                    className="user_email"
                  />
                  <label>Message</label>
                  <textarea name="message" className="message-box-footer" />
                  <input className="sub-btn" type="submit" value="Send" />
                </form>
              </li>
            </ul>
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
