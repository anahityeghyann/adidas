import React, { useState } from "react";
import s from "./Subscribe.module.sass";
import Container from "../Container/Container";
import { LuMail } from "react-icons/lu";
import { subscribe } from "../../api/subscribe";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      await subscribe(email);
      setMessage("Subscribed successfully");
      setEmail("");
    } catch {
      setMessage("Could not subscribe. Please try again.");
    }
  };

  return (
    <div className={s.subscribe}>
      <Container>
        <div className={s.wrap}>
          <div className={s.text}>Stay upto date about our latest offers</div>
          <form className={s.form} onSubmit={handleSubmit}>
            <label className={s.inputBox}>
              <LuMail className={s.icon} />
              <input
                placeholder="Enter your email address"
                type="email"
                className={s.input}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <button type="submit" className={s.button}>
              Subscribe to Newsletter
            </button>
            {message && <p>{message}</p>}
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Subscribe;
