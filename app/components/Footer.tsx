"use client";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import React from "react";
import arrow_right from "../assets/images/arrow-right.png";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  useGSAP(() => {
    // parallax effect for footer
    gsap.from(".main-footer-container", {
      scrollTrigger: {
        trigger: "footer",
        scrub: true,
        start: "top 90%",
        end: "center 40%",
      },
      yPercent: -50,
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 968px)", () => {
      const allArrowLines = document.querySelectorAll(".arrow-line");
      allArrowLines.forEach((line) => {
        const arrows = line.querySelectorAll(".glitch-arrow");

        const timeline = gsap
          .timeline({ paused: true })
          .to(arrows, {
            opacity: 0,
            duration: 0.1,
          })

          .to(
            line,
            {
              x: 33,
            },
            0
          )
          .to(
            arrows,
            {
              opacity: 1,
              duration: 0.1,
            },
            0.1
          )

          .to(
            arrows,
            {
              opacity: 0,
              duration: 0.1,
            },
            0.2
          )
          .to(
            arrows[0],
            {
              opacity: 1,
              duration: 0.1,
            },
            0.25
          );

        line.addEventListener("mouseenter", () => {
          timeline.play();
        });
        line.addEventListener("mouseleave", () => {
          timeline.reverse();
        });
      });
    });
  });

  return (
    <footer
      className="bg-[#0F0F0F] text-white pt-[150px] pb-[36px] z-[10] section -1024:px-[40px] -600:px-[18px]"
      id="contact"
    >
      {/* Actual container for footer content */}
      <div className="w-full max-w-[920px] flex flex-col mx-auto main-footer-container">
        {/* Heading */}
        <div className="max-w-[295px] text-4xl -600:text-[24px] cursor-pointer leading-[100%] -600:leading-[120%]">
          <h1>Starting a project? </h1>
          <h1 className="mt-[9px] -600:mt-0 line-anim arrow-line flex items-center gap-[12px] -768:translate-x-[29%] ">
            <Image
              src={arrow_right}
              alt="arrow"
              className="w-[28px] -768:top-[12%] -768:right-[101%] glitch-arrow opacity-0 -968:opacity-[1] absolute right-[104%] top-[13%] -768:w-[20px]"
            />

            <p>Let's talk</p>

            <Image
              src={arrow_right}
              alt="arrow"
              className="w-[28px] -768:top-[12%] -768:left-[101%] glitch-arrow absolute -968:opacity-0 left-[104%] top-[13%] -768:w-[20px]"
            />
          </h1>
        </div>

        {/* Container for the 3 lines */}
        <div className="flex gap-[18px] mt-[94px] -968:mt-[56px]">
          <hr className="w-full max-w-[295px] -968:max-w-full" />
          <hr className="w-full max-w-[295px] -968:hidden" />
          <hr className="w-full max-w-[295px] -968:hidden" />
        </div>

        {/* Container for links and address */}
        <div className="flex gap-[99px] mt-[56px] cursor-pointer -968:flex-col -968:gap-[36px]">
          {/* Address */}
          <div className="w-full max-w-[215px] address-cont">
            <h2 className="mini-heading cursor-text">/ ADDRESS</h2>

            <p
              className="mt-[24px] line-anim"
              style={{ "--delay": "0s" } as React.CSSProperties}
            >
              A Wyoming Corporation
            </p>
            <p
              className="line-anim"
              style={{ "--delay": "0.1s" } as React.CSSProperties}
            >
              447 Broadway,
            </p>
            <p
              className="line-anim"
              style={{ "--delay": "0.15s" } as React.CSSProperties}
            >
              2nd Floor Suite #1661,
            </p>
            <p
              className="line-anim"
              style={{ "--delay": "0.2s" } as React.CSSProperties}
            >
              New York 10013, United States
            </p>
          </div>

          {/* Reach out */}
          <div className="w-full max-w-[215px]">
            <h2 className="mini-heading cursor-text">/ REACH OUT</h2>

            <p className="mt-[24px] line-anim">info@makerstudio.space</p>
            <p className="line-anim">+234(0)1242-3232</p>
          </div>

          {/* Social */}
          <div className="w-full max-w-[215px]">
            <h2 className="mini-heading cursor-text">/ SOCIAL</h2>

            <a href="#" className="mt-[24px] block line-anim">
              X (prev Twitter)
            </a>
            <a href="#" className="block line-anim">
              Dribbble
            </a>
            <a href="#" className="block line-anim">
              Linkedin
            </a>
          </div>
        </div>

        {/* Credits */}
        <div className="flex justify-between mini-heading text-[#FFFFFF66] mt-[122px]">
          <p>© THE Maker STUDIO {currentYear}</p>
          <a href="#" className="line-anim">
            DEv BY TIFE
          </a>
        </div>
      </div>
    </footer>
  );
}
