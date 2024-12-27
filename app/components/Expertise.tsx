"use client";

import React from "react";
import branding_pic from "../assets/images/expertise_branding.png";
import design from "../assets/images/expertise_design.png";
import prodDev from "../assets/images/expertise_prodDev.png";
import ParallaxContainer from "./reusables/ParallaxContainer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Expertise() {
  const branding = [
    "Brand Strategy",
    "Logotype",
    "Identity Systems and Guidelines",
    "Tone and Voice",
    "Content Design",
    "Illustrations & 3D",
  ];

  const creativeDesign = [
    "UX Design and Research",
    "Art Direction",
    "Product Design",
    "Prototyping",
    "Website Design",
    "Motion Design",
  ];

  const productDev = [
    "Web application",
    "Software",
    "Website Development",
    "Mobile App",
    "AI integration",
    "E-commerce",
  ];

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const allPics = document.querySelectorAll(".expertise_pic");
    allPics.forEach((pic, idx, array) => {
      gsap.to(pic, {
        scrollTrigger: {
          trigger: pic,
          scrub: true,
          start: "top 20%",
          end: "bottom 20%",
        },
        onStart: () => {
          gsap.to(pic, {
            position: "sticky",
            top: 0,
            duration: 0,
          });
        },
      });
    });
  });

  return (
    <section className="p-[24px] pb-[150px] bg-white section" id="expertise">
      {/* HEading */}
      <h1 className="mini-heading flex w-full items-center">
        <p>/</p>
        <p className="pl-[12.5vw]">Expertise</p>
      </h1>

      {/* Container for big paragraph */}
      <div className="big-para w-[90%] mt-[80px] ">
        <p className="heading-anim split mr-[134px] pl-[13vw]">
          We craft, scale, and transform
        </p>
        <p className="text-left heading-anim split">
          businesses by turning bold visions into powerful, emotion-driven
          experiences.
        </p>
      </div>

      {/* Container for list of services on the right and picture on the left */}
      <div className="mt-[128px] flex justify-between items-start w-full gap-[20px] -1024:gap-[150px]">
        {/* container for pictures on the left */}
        <div className="flex flex-col min-w-[450px] -968:hidden">
          <ParallaxContainer
            imgSrc={branding_pic}
            className="max-w-[450px] w-full expertise_pic"
            imgClass="h-[588px] object-center object-cover"
            percent={-15}
          />
          <ParallaxContainer
            imgSrc={design}
            className="max-w-[450px] w-full expertise_pic"
            imgClass="h-[588px] object-center object-cover"
            percent={-15}
          />
          <ParallaxContainer
            imgSrc={prodDev}
            className="max-w-[450px] w-full expertise_pic"
            imgClass="h-[588px] object-center object-cover"
            percent={-15}
          />
        </div>

        {/* List on the right */}
        <div className="flex flex-col gap-[72px] w-full items-start ">
          {/* First line */}
          <hr className="border-[#0000001A] w-full" />

          {/* Branding */}
          <div className="flex justify-around w-full max-w-[686px] ml-auto gap-[9vw] mb-[196px] -1024:flex-col">
            <h2 className="text-[20px] font-medium mb-[12px] w-[266px] -1250:w-[130px] -1024:w-fit">
              Branding
            </h2>

            <ul className="w-[305px]">
              {branding.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="flex gap-[10px] items-center text-[20px]"
                  >
                    <div className="border-[#00000066] border-[1px] rounded-full h-[10px] w-[10px]"></div>
                    <p>{item}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <hr className="border-[#0000001A] w-full mt-[24px]" />

          {/* Creative Design */}
          <div className="flex justify-around w-full max-w-[686px] ml-auto gap-[9vw] mb-[196px] -1024:flex-col">
            <h2 className="text-[20px] font-medium mb-[12px] w-[266px] -1250:w-[130px] -1024:w-fit">
              Creative Design
            </h2>

            <ul className="w-[305px]">
              {creativeDesign.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="flex gap-[10px] items-center text-[20px]"
                  >
                    <div className="border-[#00000066] border-[1px] rounded-full h-[10px] w-[10px]"></div>
                    <p>{item}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <hr className="border-[#0000001A] w-full mt-[-15px]" />

          {/* Product Development */}
          <div className="flex justify-around w-full max-w-[686px] ml-auto  gap-[9vw] mb-[196px] -1024:flex-col">
            <h2 className="text-[20px] font-medium mb-[12px] w-[266px] -1250:w-[130px] -1024:w-fit">
              Product Development
            </h2>

            <ul className="w-[305px]">
              {productDev.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="flex gap-[10px] items-center text-[20px]"
                  >
                    <div className="border-[#00000066] border-[1px] rounded-full h-[10px] w-[10px]"></div>
                    <p>{item}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
