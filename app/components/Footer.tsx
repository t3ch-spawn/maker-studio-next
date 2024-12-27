'use client'

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import React from "react";
import ArrowSvg from "./reusables/ArrowSvg";

export default function Footer() {
  gsap.registerPlugin(ScrollTrigger);
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
  

  return (
    <footer
      className="bg-[#0F0F0F] text-white pt-[150px] pb-[36px] z-[10] section"
      id="contact"
    >
      {/* ACtual container for footer content */}
      <div className="w-full max-w-[920px] flex flex-col mx-auto main-footer-container">
        {/* Heading */}
        <div className="max-w-[295px] text-4xl cursor-pointer">
          <h1>Starting a project? </h1>
          <h1 className="mt-[9px] line-anim arrow-line flex items-center gap-[12px]">
            <ArrowSvg
              stroke="white"
              className="scale-[1.8] glitch-arrow  opacity-0 absolute right-[110%] top-[27%]"
            />
            <p>Let's talk</p>
            <ArrowSvg
              stroke="white"
              className="scale-[1.8] glitch-arrow  absolute left-[110%] top-[27%]"
            />
          </h1>
        </div>

        {/* Container for the 3 lines */}
        <div className="flex gap-[18px] mt-[94px]">
          <hr className="w-full max-w-[295px]" />
          <hr className="w-full max-w-[295px]" />
          <hr className="w-full max-w-[295px]" />
        </div>

        {/* Container for links and address */}
        <div className="flex gap-[99px] mt-[56px] cursor-pointer">
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
          <p>© THE Maker STUDIO 2024</p>
          <a href="#" className="line-anim">
            DEv BY TIFE
          </a>
        </div>
      </div>
    </footer>
  );
}
