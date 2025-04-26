import React from "react";
import styles from "./Footer.module.css";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { IoTicketOutline } from "react-icons/io5";
import { ImNewspaper } from "react-icons/im";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
export default function Footer() {
  return (
    <div className={styles.main}>
      <div className={styles.div1}>
        <img
          src="https://in.bmscdn.com/webin/common/icons/hut.svg"
          alt="imagemissing"
          className={styles.img1}
        />
        <p className={styles.p1}>List your Show</p>
        <p className={styles.p2}>
          Got a show, event, activity or a great experience? Partner with us &
          get listed on BookMyShow
        </p>
        <Link to="/contactus">
          {" "}
          <button className={styles.contacttoday}>Contact today!</button>
        </Link>
      </div>
      <div className={styles.div2}>
        <Link
          to="/contactus"
          style={{ textDecoration: "none", color: " rgb(153, 153, 153)" }}
        >
          {" "}
          <div className={styles.logodiv}>
            <SupportAgentIcon className={styles.supporticon} />
            <p className={styles.customercare}>24/7 Customer care</p>
          </div>
        </Link>
        <div className={styles.logodiv}>
          <IoTicketOutline className={styles.ticketicon} />
          <p className={styles.resend}>Resend Booking Information</p>
        </div>
        <div className={styles.logodiv}>
          <ImNewspaper className={styles.papericon} />
          <p className={styles.subscribe}>Subscribe to newsletter</p>
        </div>
      </div>
      <div className={styles.footermain}>
        <div className={styles.footersecond}>
          <div className={styles.divcontentmain}>
            <p className={styles.activites}>ACTIVITES IN TOP CITIES</p>
            <div className={styles.divbox}>
              <p className={styles.divp}>Activites in Delhi-NCR</p>
              <p className={styles.divl}>|</p>
              <p className={styles.divp}>Activites in Chennai</p>
              <p className={styles.divl}>|</p>
              <p className={styles.divp}>Activites in Mumbai</p>
              <p className={styles.divl}>|</p>
              <p className={styles.divp}>Activites in Bengaluru</p>
            </div>
          </div>
          <div className={styles.divcontentmain}>
            <p className={styles.activites}>BOOK YOUR CALENDER</p>
            <div className={styles.divbox}>
              <p className={styles.divp}>Comedy Show happening today</p>
              <p className={styles.divl}>|</p>
              <p className={styles.divp}>Comedy Show happening tomorrow</p>
              <p className={styles.divl}>|</p>
              <p className={styles.divp}>Comedy Show happening this weekend</p>
            </div>
          </div>
          <div className={styles.divcontentmain}>
            <p className={styles.activites}>ACTIVITES IN AHMEDABAD</p>
            <div className={styles.divbox}>
              <Link
                to="/eventpage?part=Amusment"
                style={{ textDecoration: "none" }}
              >
                <p className={styles.divp}>Amusment parks</p>
              </Link>
              <p className={styles.divl}>|</p>
              <Link
                to="/eventpage?part=Workshop"
                style={{ textDecoration: "none" }}
              >
                <p className={styles.divp}>Work Shop And More</p>
              </Link>
              <p className={styles.divl}>|</p>
              <p className={styles.divp}>Quizes and Competitions</p>
              <p className={styles.divl}>|</p>
              <p className={styles.divp}>Adventure</p>
            </div>
          </div>
          <div className={styles.divcontentmain}>
            <p className={styles.activites}>MORE ACTIVITES IN AHMEDABAD</p>
            <div className={styles.divbox}>
              <p className={styles.divp}>Nightlife</p>
              <p className={styles.divl}>|</p>
              <p className={styles.divp}>Film Quiz</p>
              <p className={styles.divl}>|</p>
              <p className={styles.divp}>Escape Games</p>
              <p className={styles.divl}>|</p>
              <p className={styles.divp}>Theme Parks</p>
              <p className={styles.divl}>|</p>
              <p className={styles.divp}>Bowling</p>
              <p className={styles.divl}>|</p>
              <p className={styles.divp}>Food Festival</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.hrlogo}>
        <hr className={styles.hr} />
        <Link to="/">
          <img
            src="https://in.bmscdn.com/webin/common/icons/logo.svg"
            alt="imagelogo"
          />
        </Link>
        <hr className={styles.hr} />
      </div>
      <div className={styles.socialdiv}>
        <Link to="https://www.facebook.com/">
          <FaFacebook className={styles.logoicon} />
        </Link>
        <Link to="https://twitter.com/">
          <FaSquareXTwitter className={styles.logoicon} />
        </Link>
        <Link to="https://www.instagram.com/">
          <FaInstagram className={styles.logoicon} />
        </Link>
        <Link to="https://www.youtube.com/">
          <FaYoutube className={styles.logoicon} />
        </Link>
        <Link to="https://www.pinterest.com/">
          <FaPinterest className={styles.logoicon} />
        </Link>
        <Link to="https://www.linkedin.com/">
          <FaLinkedin className={styles.logoicon} />
        </Link>
      </div>
      <div className={styles.copyrightdiv}>
        <p className={styles.copy}>
          Copyright 2025 &copy; Bigrette Entertainment Pvt. Ltd Right Reserved
        </p>
      </div>
    </div>
  );
}
