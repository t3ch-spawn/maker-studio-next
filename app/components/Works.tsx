"use client";

import React, { useEffect } from "react";
import nomba from "../assets/images/nomba.png";
import nqr from "../assets/images/nqr.png";
import station from "../assets/images/station.png";
import arrow_right from "../assets/images/arrow-right.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image, { StaticImageData } from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  useGSAP(() => {
    const allScreens = document.querySelectorAll(".works-screen");

    // allScreens.forEach((screen, idx, array) => {
    //   gsap.to(screen, {
    //     scrollTrigger: {
    //       trigger: screen,
    //       scrub: true,
    //       start: "top 20%",
    //       end: "bottom 20%",
    //       //   markers: true,
    //     },
    //     onStart: () => {
    //       gsap.to(screen, {
    //         position: "sticky",
    //         top: 40 + idx * 30,
    //         duration: 0,
    //       });

    //       if (idx === 2) {
    //         allScreens.forEach((screen, idx) => {
    //           gsap.to(screen, {
    //             y: idx !== 2 ? -200 + idx * 100 : 0,
    //             scrollTrigger: {
    //               trigger: allScreens[2],
    //               scrub: true,
    //               start: "top 15%",
    //             },
    //           });
    //         });
    //       }
    //     },
    //     scale: 0.97 + 0.02 * idx,
    //     transformOrigin: "center",
    //   });
    // });

    // Pinning animation for
  });

  useGSAP(() => {
    const allScreens = document.querySelectorAll<HTMLElement>(".works-screen");
    const cardHeight = allScreens[0].offsetHeight;

    const animation = gsap.timeline();
    allScreens.forEach((card, idx) => {
      gsap.set(card, {
        y: idx > 0 ? cardHeight * idx + 100 : 0,
        scale: 1,
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });

      animation.to(card, {
        y: 0 + idx * 20,
        duration: 0.1,
        scale: 0.97 + 0.02 * idx,
        ease: "none",
      });
    });

    ScrollTrigger.create({
      trigger: ".works-screens-container",
      pin: true,
      start: "top 5%",
      end: `+=${cardHeight * allScreens.length + cardHeight / 3}`,
      // markers: true,
      scrub: true,
      animation: animation,
      // invalidateOnRefresh: true,
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
      <p className="big-para mx-auto text-white w-full max-w-[686px] mt-[60px] -768:my-[56px] -768:mb-[0px] -768:max-w-[357px] text-center heading-anim split">
        {" "}
        We design and build lovable digital products
      </p>

      {/* Container for sections to pin */}
      <div className="mt-[150px] -768:mt-[64px] min-h-[90vh] works-screens-container relative">
        {works.map((work, idx) => {
          return <WorkScreen key={idx} {...work} />;
        })}
      </div>

      {/* Reach out button */}
      <a
        href=""
        className="flex justify-center items-center gap-[12px] line-anim arrow-line text-white mt-[147px] -768:mt-[106px] w-fit mx-auto "
      >
        <Image
          src={arrow_right}
          alt="arrow"
          className="w-[24px] -768:top-[12%] -768:right-[105%] glitch-arrow opacity-0 -968:opacity-[1] absolute right-[108%] top-[20%] -768:w-[20px]"
        />

        <p className=" text-[24px] font-medium -768:text-[16px]">Let's talk</p>

        <Image
          src={arrow_right}
          alt="arrow"
          className="w-[24px] -768:top-[12%] -768:left-[105%] glitch-arrow absolute -968:opacity-0 left-[108%] top-[20%] -768:w-[20px]"
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
      className={`min-h-[90vh] w-full top-0 absolute -768:max-h-[600px] max-h-[850px]  works-screen flex items-end p-[28px] ${className}`}
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
        onLoad={() => {
          ScrollTrigger.refresh();
        }}
      />

      {/* Div that has the dark background */}
      <div className="absolute inset-0 bg-[#0000005C] w-full h-full z-1"></div>

      <div className="absolute translate-x-[-50%] translate-y-[-50%] left-[50%] w-full top-[50%] text-white text-center -1024:text-[40px] heading-anim split text-[56px] -600:text-[36px] leading-[102.7%]">
        {heading}
      </div>

      {/* Container for details and description on the bottom of the screen */}
      <div className="flex w-full justify-between items-end z-[2] -768:flex-col-reverse -768:items-start relative -768:gap-[24px]">
        {/* Container for details */}
        <div className="flex justify-start items-center gap-[12px] flex-wrap">
          {details.map((detail, idx) => {
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF29] text-[#FFFFFFB2] rounded-full py-[8px] px-[16px] text-[13px] -600:text-[11px] -600:px-[14px] font-ibm uppercase cursor-pointer detail-pill"
              >
                {detail}
              </div>
            );
          })}
        </div>
        {/*  Container for description on the right*/}
        <p className="max-w-[308px] text-[#FFFFFFB2] font-normal -600:text-[13px]">
          {descrip}
        </p>
      </div>
    </div>
  );
}
