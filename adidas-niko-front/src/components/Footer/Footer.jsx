import React from "react";
import s from "./Footer.module.sass";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import payment1 from "../../assets/img/pay_1.png";
import payment2 from "../../assets/img/pay_2.png";
import payment3 from "../../assets/img/pay_3.png";
import payment4 from "../../assets/img/pay_4.png";
import payment5 from "../../assets/img/pay_5.png";
import Container from "../Container/Container";
import Subscribe from "../Subscribe/Subscribe";

const pay_img = [payment1, payment2, payment3, payment4, payment5];

const Footer = ({compact=False}) => {
  return (
    <footer className={`${s.footer} ${compact ? s.compact : ""}`}>
      {!compact && <Subscribe/>}
      <Container>
        <div className={s.wrap}>
          <div className={s.top}>
            <div className={s.first}>
              <div className={s.name}>SHOP.CO</div>
              <p className={s.text}>
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>
              <div className={s.icons}>
                <div className={s.iconnames}>
                  <FaFacebook />
                </div>
                <div className={s.iconnames}>
                  <FaInstagram />
                </div>
                <div className={s.iconnames}>
                  <FaGithub />
                </div>
                <div className={s.iconnames}>
                  <FaTwitter />
                </div>
              </div>
            </div>

            <div className={s.navbar}>
              <div className={s.second}>
                <div className={s.sec_header}>Company</div>
                <div className={s.underthemes}>
                  <div className={s.same}>About</div>
                  <div className={s.same}>Features</div>
                  <div className={s.same}>Works</div>
                  <div className={s.same}>Career</div>
                </div>
              </div>
              <div className={s.second}>
                <div className={s.sec_header}>Help</div>
                <div className={s.underthemes}>
                  <div className={s.same}>Customer Support</div>
                  <div className={s.same}>Delivery Details</div>
                  <div className={s.same}>Terms & Conditions</div>
                  <div className={s.same}>Privacy Policy</div>
                </div>
              </div>
              <div className={s.second}>
                <div className={s.sec_header}>faq</div>
                <div className={s.underthemes}>
                  <div className={s.same}>Acount</div>
                  <div className={s.same}>Manage Deliveries</div>
                  <div className={s.same}>Orders</div>
                  <div className={s.same}>Payments</div>
                </div>
              </div>
              <div className={s.second}>
                <div className={s.sec_header}>Resources</div>
                <div className={s.underthemes}>
                  <div className={s.same}>Free eBooks</div>
                  <div className={s.same}>Development Tutorial</div>
                  <div className={s.same}>How to - Blog</div>
                  <div className={s.same}>Youtube Playlist</div>
                </div>
              </div>
            </div>
          </div>
          <hr className={s.hr} />
          <div className={s.bottom}>
            <p className={s.copyright}>
              Shop.co &copy; 2000-2023, All Rights Reserved
            </p>
            <div className={s.payments}>
              {pay_img.map((src) => (
                <div key={src} className={s.pay}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
