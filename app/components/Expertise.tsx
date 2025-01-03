"use client";

import React from "react";
import branding_pic from "../assets/images/expertise_branding.png";
import design from "../assets/images/expertise_design.png";
import prodDev from "../assets/images/expertise_prodDev.png";
import ParallaxContainer from "./reusables/ParallaxContainer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Expertise() {
  const branding = [
    "Tone and Voice",
    "Content Design",
    "Logotype",
    "Identity Systems",
    "Brand Strategy",
    "Illustrations and 3D",
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
    <section
      className="p-[24px] -768:px-[18px] pb-[150px] relative z-[15] bg-white section"
      id="expertise"
    >
      {/* HEading */}
      <h1 className="mini-heading flex w-full items-center">
        <p>/</p>
        <p className="pl-[12.5vw]">Expertise</p>
      </h1>

      {/* Container for big paragraph */}
      <div className="big-para w-[90%] -600:w-full mt-[80px] ">
        <p className="heading-anim split pl-[13vw] -968:pl-0">
          We craft, scale, and transform
        </p>
        <p className="text-left heading-anim split">
          businesses by turning bold visions into powerful, emotion-driven
          experiences.
        </p>
      </div>

      {/* Container for list of services on the right and picture on the left */}
      <div className="mt-[128px] -968:mt-[64px] flex justify-between items-start w-full -1024:gap-[150px]">
        {/* container for pictures on the left */}
        <div className="flex flex-col min-w-[450px] max-w-[450px] -968:hidden">
          <ParallaxContainer
            imgSrc={branding_pic}
            className="max-w-[450px] w-full expertise_pic"
            imgClass="h-[623px] object-center object-cover"
            percent={-15}
          />
          <ParallaxContainer
            imgSrc={design}
            className="max-w-[450px] w-full expertise_pic"
            imgClass="h-[623px] object-center object-cover"
            percent={-15}
          />
          <ParallaxContainer
            imgSrc={prodDev}
            className="max-w-[450px] w-full expertise_pic"
            imgClass="h-[623px] object-center object-cover"
            percent={-15}
          />
        </div>

        {/* List on the right */}
        <div className="flex flex-col gap-[72px] -600:gap-[48px] w-full items-start text-[16px] -600:text-[16px]">
          {/* First line */}
          <hr className="border-[#0000001A] w-full" />

          {/* Branding */}
          <div className="flex justify-between w-full max-w-[48vw] -1024:max-w-full ml-auto -968:ml-0 gap-[9vw]  -968:mb-0 -1024:flex-col -1024:gap-[24px]">
            <h2 className=" font-medium  -1024:w-fit -600:mb-0 font-ibm uppercase text-[13px]">
              Branding
            </h2>

            <ul className="w-[353px] -600:w-full -600:max-w-[320px] flex flex-col gap-[12px] items-start">
              <h3 className="text-[36px] -600:text-[20px] font-medium leading-[120%] mb-[24px]">
                {" "}
                <span className="pl-[8vw] -1024:pl-0">We forge</span> <br /> unique,
                distinct, and brand identities
              </h3>
              {branding.map((item, idx) => {
                return (
                  <li key={idx} className="flex gap-[12px] items-center ">
                    <div className="border-[#00000066] border-[1px] rounded-full h-[8px] w-[8px]"></div>
                    <p>{item}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <hr className="border-[#0000001A] w-full mt-[15px]" />

          {/* Creative Design */}
          <div className="flex justify-between w-full max-w-[48vw] -1024:max-w-full ml-auto -968:ml-0 gap-[9vw]  -968:mb-0 -1024:flex-col -1024:gap-[24px]">
            <h2 className=" font-medium  -1024:w-fit -600:mb-0 font-ibm uppercase text-[13px]">
              Creative Design
            </h2>

            <ul className="w-[353px] -600:w-full -600:max-w-[320px] flex flex-col gap-[12px] items-start">
              <h3 className="text-[36px] -600:text-[20px] font-medium leading-[120%] mb-[24px]">
                {" "}
                <span className="pl-[8vw] -1024:pl-0">We design</span> <br /> remarkable
                interfaces and experiences
              </h3>
              {creativeDesign.map((item, idx) => {
                return (
                  <li key={idx} className="flex gap-[12px] items-center ">
                    <div className="border-[#00000066] border-[1px] rounded-full h-[8px] w-[8px]"></div>
                    <p>{item}</p>
                  </li>
                );
              })}
            </ul>
          </div>

          <hr className="border-[#0000001A] w-full mt-[15px] -968:mt-0" />

          {/* Product Development */}
          <div className="flex justify-between w-full max-w-[48vw] -1024:max-w-full ml-auto -968:ml-0  gap-[9vw]  -968:mb-0 -1024:flex-col -1024:gap-[24px]">
            <h2 className=" font-medium  -1024:w-fit -600:mb-0 font-ibm uppercase text-[13px]">
              Product Development
            </h2>

            <ul className="w-[353px] -600:w-full -600:max-w-[320px] flex flex-col gap-[12px] items-start">
              <h3 className="text-[36px] -600:text-[20px] font-medium leading-[120%] mb-[24px]">
                {" "}
                <span className="pl-[8vw] -1024:pl-0"> We develop </span> <br /> seamless
                web and mobile apps solutions
              </h3>
              {productDev.map((item, idx) => {
                return (
                  <li key={idx} className="flex gap-[12px] items-center ">
                    <div className="border-[#00000066] border-[1px] rounded-full h-[8px] w-[8px]"></div>
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
