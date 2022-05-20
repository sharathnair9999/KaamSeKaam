import React from "react";
import { constants } from "../helpers";
import "./styles/Landing.css";
import {
  BsChevronDoubleDown,
  BsGithub,
  BsTwitter,
  BsLinkedin,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { FaUserSecret } from "react-icons/fa";

const Landing = () => {
  return (
    <div>
      <div className="landing-content-1 flex-and-center w-100">
        <Link className="signup-btn flex-and-center gap-sm" to="/signup">
          <BiLogIn size="1.2rem" />
          <span>Join Now</span>
        </Link>
        <div className="flex flex-col items-center justify-center gap-1 w-100">
          <h1 className="h1 px-1">Kaam Se Kaam</h1>
          <p className="bottom-text font-3xl px-1">
            Become a{" "}
            <span className="procrastinator">
              <span className="pro">Pro</span>
              <span className="crastinator">crastinator</span>
            </span>{" "}
            in finishing up your tasks from now!
          </p>
          <img
            src={constants.imgUrls.landing}
            alt="landing"
            className="responsive-img"
          />
        </div>
        <a
          className="down-button flex-and-center gap-1 flex-col"
          href="#details"
        >
          <span className="more-icon">
            <BsChevronDoubleDown size={"1.5rem"} />
          </span>
          <span>More</span>
        </a>
      </div>
      <div className="landing-content-2" id="details">
        <section className="flex justify-center items-center wrap my-auto">
          <section className="features">
            <p className="py-1 bold font-xl">Features: </p>
            <ul>
              <li>Add Update and Delete Tasks at ease</li>
              <li>Timer to start a Task and Finish it</li>
              <li>
                All your tasks and corresponding details are private to you
              </li>
              <li>
                Login with credentials, Login Anonymously
                <FaUserSecret />, Signup
              </li>
              <li>Distinguish Completed and Yet to Complete Tasks</li>
            </ul>
          </section>
          <img
            src={constants.imgUrls.work}
            alt="work"
            className="responsive-img"
          />
        </section>
        <footer className="footer flex-and-center gap-1 flex-col">
          <p className="text">
            Made by{" "}
            <a
              href="https://sharath-nair9999.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Sharath
            </a>
          </p>
          <section className="flex-and-center gap-2">
            <a
              href="https://github.com/sharathnair9999"
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub size="1.2rem" />
            </a>
            <a
              href="https://twitter.com/Nairified"
              target="_blank"
              rel="noreferrer"
            >
              <BsTwitter size="1.2rem" />
            </a>
            <a
              href="https://www.linkedin.com/in/sharath99/"
              target="_blank"
              rel="noreferrer"
            >
              <BsLinkedin size="1.2rem" />
            </a>
          </section>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
