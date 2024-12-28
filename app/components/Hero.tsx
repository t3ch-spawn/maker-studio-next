"use client";

import React, { useEffect, useState } from "react";
import logo from "../assets/images/hero_logo.svg";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ArrowSvg from "./reusables/ArrowSvg";
import scroll_down from "../assets/images/scroll_down.svg";
import Image from "next/image";
import Lenis from "lenis";
import { CustomEase, ScrollTrigger } from "gsap/all";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  useGSAP(() => {
    const split = new SplitType(".split", { types: "words,chars" });

    window.addEventListener("resize", () => {
      // const split = new SplitType(".split", { types: "words,chars" });
      ScrollTrigger.refresh();
    });
    const allHeadings = document.querySelectorAll(".heading-anim");
    const allParas = document.querySelectorAll(".para-anim");

    // Animations for all big paragraphs
    allHeadings.forEach((heading, idx) => {
      gsap.from(heading.querySelectorAll(".word"), {
        y: 100,
        // filter: "blur(8px)",
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.077,0.345 0.076,0.486 0.113,0.641 0.127,0.707 0.165,0.817 0.203,0.855 0.222,0.874 0.263,0.909 0.286,0.922 0.336,0.951 0.39,0.967 0.463,0.976 0.522,0.983 0.593,1 0.684,1 0.77,1.002 0.873,1 1,1 "
        ),
        duration: 2.2,
        opacity: 0,

        scrollTrigger: {
          trigger: heading.classList.contains("hero") ? "body" : heading,
          start: "top 70%",
          end: "bottom 70%",
          // markers: true,
        },
      });
    });

    // Animations for all small paragraphs, with or without scrub
    allParas.forEach((para) => {
      gsap.from(para.querySelectorAll(".word"), {
        y: 50,
        // filter: "blur(8px)",
        opacity: 0,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.077,0.345 0.076,0.486 0.113,0.641 0.127,0.707 0.165,0.817 0.203,0.855 0.222,0.874 0.263,0.909 0.286,0.922 0.336,0.951 0.39,0.967 0.463,0.976 0.522,0.983 0.593,1 0.684,1 0.77,1.002 0.873,1 1,1 "
        ),
        duration: 1.3,
        stagger: 0.01,
        scrollTrigger: {
          trigger: para.classList.contains("hero") ? "body" : para,
          start: "top 70%",
          end: "bottom 10%",
          // markers: true,
          scrub: para.classList.contains("scrub") ? 1.3 : false,
        },
      });
    });

    // setTimeout(() => {
    //   ScrollTrigger.refresh();
    // }, 1000);
  });

  return (
    <section className="bg-[#0F0F0F] h-[100vh] relative flex flex-col items-center gap-[50px] justify-end pt-[107px] pb-[58px]">
      {/*Big image logo that spins */}
      <Image
        src={logo}
        className=" hero-logo absolute top-[42%] translate-y-[-50%] -1024:max-w-[250px] -600:max-w-[196px]"
        alt=""
      />

      {/* Text container for heading and others */}
      <div className="flex w-full justify-between items-end text-white px-[24px] -768:px-[18px]">
        {/* Left part with heading and paragraph */}
        <div className="flex flex-col gap-[19px] ">
          <p className="text-[13px] flex items-center font-ibm uppercase font-medium para-anim hero split nav-trigger">
            0
            <span className="mx-[5px]">
              <ArrowSvg stroke="white" />
            </span>
            <span> 1, Global Digital Studio</span>
          </p>
          <h1 className="big-para -968:max-w-[500px] max-w-[706px] heading-anim hero split">
            We make things that move industries forward.
          </h1>
        </div>

        {/* Right part with scroll down */}
        <div className="flex justify-center items-center gap-[9px] -768:hidden">
          <p>Scroll down</p>
          <Image src={scroll_down} className="mt-[8px]" alt="" />
        </div>
      </div>
    </section>
  );
}
