"use client";

import React, { useEffect } from "react";
import nomba from "../assets/images/nomba.png";
import nqr from "../assets/images/nqr.png";
import station from "../assets/images/station.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ArrowSvg from "./reusables/ArrowSvg";
import Image, { StaticImageData } from "next/image";

export default function Works() {
  gsap.registerPlugin(ScrollTrigger);
  useGSAP(() => {
    const allScreens = document.querySelectorAll(".works-screen");

    allScreens.forEach((screen, idx, array) => {
      gsap.to(screen, {
        scrollTrigger: {
          trigger: screen,
          scrub: true,
          start: "top 20%",
          end: "bottom 20%",
          //   markers: true,
        },
        onStart: () => {
          gsap.to(screen, {
            position: "sticky",
            top: 40 + idx * 30,
            duration: 0,
          });

          if (idx === 2) {
            allScreens.forEach((screen, idx) => {
              gsap.to(screen, {
                y: idx !== 2 ? -200 + idx * 100 : 0,
                scrollTrigger: {
                  trigger: allScreens[2],
                  scrub: true,
                  start: "top 15%",
                },
              });
            });
          }
        },
        scale: 0.97 + 0.02 * idx,
        transformOrigin: "center",
      });
    });
  });

  const works: ScreenTypes[] = [
    {
      heading: "Station",
      details: ["Branding", "Mobile Design", "Development"],
      img: station,
      descrip:
        "Station is an all-in-one business suite that streamlines operations for small and medium businesses by uniting communication, project management, scheduling, & storage in one platform.",
    },
    {
      heading: "Nomba Expense",
      details: ["product design", "development"],
      img: nomba,
      descrip:
        "Expense is a robust, flexible, and user-friendly expense management system built to simplifies expense management with flexible approvals, accounting integrations, and clear audit trails.",
    },
    {
      heading: "NQR",
      details: ["Branding", "Mobile Design", "Development"],
      img: nqr,
      descrip:
        "Reimagined ways QR payments in Nigeria with a unified mobile app that simplifies transactions for customers and merchants across banks solving the fragmentation of QR payments.",
    },
  ];

  return (
    <section
      className="bg-[#0F0F0F] px-[16px] pt-[128px] py-[144px] -768:pt-[48px] -768:pb-[89px] section"
      id="works"
    >
      {/* COntainer for mini heading */}
      <div className="w-[62px] flex justify-between items-center mx-auto text-white">
        <p>/</p>
        <p className="mini-heading">WORKS</p>
      </div>

      {/* Big paragraph */}
      <p className="big-para mx-auto text-white w-full max-w-[686px] mt-[60px] -768:my-[56px] text-center heading-anim split">
        {" "}
        We design and build lovable digital products
      </p>

      {/* Container for sections to pin */}
      <div className="mt-[150px] works-screens-container">
        {works.map((work, idx) => {
          return (
            <WorkScreen
              key={idx}
              {...work}
              className={idx !== 0 ? "mt-[300px]" : ""}
            />
          );
        })}
      </div>

      {/* Reach out button */}
      <a
        href=""
        className="flex justify-center items-center gap-[12px] line-anim arrow-line text-white mt-[147px] w-fit mx-auto "
      >
        <ArrowSvg
          stroke="white"
          className="scale-[1.8] glitch-arrow opacity-0 absolute right-[110%] top-[27%]"
        />
        <p className=" text-[24px] font-medium">Let's talk</p>
        <ArrowSvg
          stroke="white"
          className="scale-[1.8] glitch-arrow absolute left-[110%] top-[27%]"
        />
      </a>
    </section>
  );
}

interface ScreenTypes {
  img: string | StaticImageData;
  details: string[];
  descrip: string;
  heading: string;
  className?: string;
}

function WorkScreen({
  img,
  details,
  descrip,
  heading,
  className,
}: ScreenTypes) {
  function mouseMove(e: MouseEvent): void {
    const { clientX, clientY } = e;
    const { height, width, left, top } = (
      e.currentTarget as HTMLElement
    )?.getBoundingClientRect();
    const trueX = clientX - (left + width / 2);
    const trueY = clientY - (top + height / 2);

    gsap.to(e.currentTarget, {
      x: trueX,
      y: trueY,
    });
  }

  useEffect(() => {
    const allPills = document.querySelectorAll<HTMLElement>(".detail-pill");

    allPills.forEach((pill) => {
      pill.addEventListener("mousemove", mouseMove);
      pill.addEventListener("mouseleave", () => {
        gsap.to(pill, {
          x: 0,
          y: 0,
          ease: "elastic.out(1.5,0.4)",
          duration: 1.6,
        });
      });
    });
  }, []);

  return (
    <div
      className={`min-h-[90vh] max-h-[850px] relative works-screen flex items-end p-[28px] ${className}`}
    >
      {/* <ParallaxContainer
        percent={-20}
        imgSrc={station}
        className="absolute w-full h-full top-0 left-0"
      /> */}
      <Image
        src={img}
        alt=""
        className="absolute w-full h-full top-0 left-0 object-cover"
      />

      {/* Div that has the dark background */}
      <div className="absolute inset-0 bg-[#0000005C] w-full h-full z-1"></div>

      <div className="absolute translate-x-[-50%] translate-y-[-50%] left-[50%] w-fit top-[50%] text-white text-center -1024:text-[40px] heading-anim split text-[56px]">
        {heading}
      </div>

      {/* Container for details and description on the bottom of the screen */}
      <div className="flex w-full justify-between items-end z-[2] -768:flex-col-reverse -768:items-start relative -768:gap-[24px]">
        {/* Container for details */}
        <div className="flex justify-center items-center gap-[12px]">
          {details.map((detail, idx) => {
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF29] text-[#FFFFFFB2] rounded-full py-[8px] px-[16px] text-[13px] font-ibm uppercase cursor-pointer detail-pill"
              >
                {detail}
              </div>
            );
          })}
        </div>
        {/*  Container for description on the right*/}
        <p className="max-w-[308px] text-[#FFFFFFB2] font-normal ">{descrip}</p>
      </div>
    </div>
  );
}