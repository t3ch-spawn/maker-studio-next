"use client";

import React, { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ArrowSvg from "./reusables/ArrowSvg";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import Image from "next/image";
import logo from "../assets/images/hero_logo.svg";
import giant_x from "../assets/images/giant_x.svg";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
export default function Navbar() {
  const navLinks = [
    { name: "About us", id: "about" },
    { name: "Works", id: "works" },
    { name: "Expertise", id: "expertise" },
    { name: "Contact", id: "contact" },
  ];

  const [date, setDate] = useState("0:00:00");
  const navDeskTimeline = useRef<GSAPTimeline>(null);
  const navMobTimeline = useRef<GSAPTimeline>(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });

    function formatDate(): string {
      const now: Date = new Date();

      // Options for formatting the time in the "Africa/Lagos" time zone
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, // Use 24-hour format
      };

      // Create a formatter for the specified time zone
      const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
        "en-US",
        options
      );
      return formatter.format(now);
    }

    const intervalId = setInterval(() => {
      setDate(formatDate());
    }, 1000);

    let mm = gsap.matchMedia();
    const allLinks = document.querySelectorAll<HTMLElement>(".nav-link");
    const allClicks = document.querySelectorAll<HTMLElement>(".nav-click");

    allLinks.forEach((link) => {
      link.addEventListener("click", () => {
        gsap.to(window, {
          duration: 2.4,
          scrollTo: `#${link.dataset.id}`,
          ease: "power3.inOut",
        });
      });
    });

    mm.add("(min-width: 768px)", () => {
      // adding logic for when to show arrow on section
      const allSections = document.querySelectorAll(".section");

      function checkSection(section: Element) {
        allLinks.forEach((link) => {
          const arrow = link.querySelector(".nav-arrow");
          link.classList.remove("active");
          arrow?.classList.remove("active");

          if (section.id === link.dataset.id) {
            arrow?.classList.add("active");
            link.classList.add("active");
          }
        });
      }

      allSections.forEach((section) => {
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 80%",
            onEnter: () => {
              checkSection(section);
            },
            onEnterBack: () => {
              checkSection(section);
            },

            onLeaveBack: () => {
              if (section.id === "about") {
                allLinks.forEach((link) => {
                  const arrow = link.querySelector(".nav-arrow");
                  link.classList.remove("active");
                  arrow?.classList.remove("active");
                });
              }
            },
          },
        });
      });

      // Animation for menu click on desktop
      navDeskTimeline.current = gsap
        .timeline({ paused: true })
        .to(".nav-link div", {
          y: 20,
          stagger: 0.1,
        })

        .to(
          ".nav-link-container",
          {
            y: 0,
          },
          0
        )
        .to(
          ".menu-btn-desk",
          {
            y: 0,
            opacity: 1,
            pointerEvents: "all",
          },
          0
        )
        .to(
          ".nav-link",
          {
            pointerEvents: "none",
          },
          0
        );

      const navLinkCont = document.querySelector(".nav-link-container");

      // Animation for when you scroll a bit to convert to menu
      gsap.to(".nav-trigger", {
        scrollTrigger: {
          trigger: ".nav-trigger",
          start: "top 50%",
          scrub: true,
          onEnter: () => {
            navDeskTimeline.current?.play();
            navLinkCont?.classList.add("passed-hero");
          },

          onEnterBack: () => {
            navDeskTimeline.current?.reverse();
            navLinkCont?.classList.remove("passed-hero");
          },
        },
      });

      // // Listen for the scroll event and return list back to menu
      lenis.on("scroll", (e) => {
        if (navLinkCont?.classList.contains("passed-hero")) {
          navDeskTimeline.current?.play();
        }
      });
    });

    // Animation for mobile
    mm.add("(max-width: 768px)", () => {
      navMobTimeline.current = gsap
        .timeline({ paused: true })
        .to(".nav-drawer-content", {
          y: 0,
          duration: 1,
          ease: "power3.inOut",
          onReverseComplete: () => {
            gsap.to(".nav-mob-link_text", {
              y: 40,
            });

            gsap.to(".nav-translate", {
              y: 40,
              delay: 0.4,
              opacity: 0,
            });
          },
        })
        .to(
          ".nav-drawer",
          {
            y: 0,
            duration: 1,
            visibility: "inherit",
            ease: "power3.inOut",
            pointerEvents: "all",
            onStart: () => {
              gsap.to(".nav-mob-link_text", {
                y: 0,
                delay: 0.3,
                stagger: 0.07,
                ease: "power1.Out",
                // duration: 0.,
              });

              gsap.to(".nav-translate", {
                y: 0,
                delay: 0.5,
                ease: "power1.Out",
                opacity: 1,
              });
            },
          },
          0
        );
    });

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  function closeNavDrawer() {
    navMobTimeline.current?.reverse();
  }

  return (
    <>
      <nav className="fixed w-full top-0 flex justify-between items-start py-[27px] px-[24px] -768:px-[18px] z-[100] bg-transparent text-white invert nav-desk">
        {/* 'Logo" */}
        <p className="text-[16px] font-medium invert">The Maker Studio</p>

        {/* Container for time and menu list for desktop */}
        <div className="flex justify-between w-full max-w-[44.6vw]">
          {/* TIme in the middle */}
          <p className="text-[13px] font-medium font-ibm invert -768:hidden ">
            LOS, {date}
          </p>

          {/* Container for Menu and list items for desktop view*/}
          <div className="flex flex-col items-end -768:hidden">
            <button
              onClick={() => {
                if (!navDeskTimeline.current) return;
                navDeskTimeline.current.reverse();
              }}
              className="flex font-medium font-ibm gap-[5px] items-center justify-center invert menu-btn-desk translate-y-[20px] opacity-0 pointer-events-none text-[13px]"
            >
              <div className="bg-white h-[5px] w-[5px] rounded-full"></div>
              <p>MENU</p>
            </button>

            {/* List on the right */}
            <ul className="flex flex-col gap-[5px] items-end font-medium text-[13px] font-ibm nav-link-container translate-y-[-20px]">
              {navLinks.map((link, idx) => {
                return (
                  <li
                    key={idx}
                    data-id={link.id}
                    className="relative nav-link nav-click ease-in-out duration-300 overflow-hidden pointer-events-all"
                  >
                    <div className="flex gap-[5px] items-center justify-center">
                      <ArrowSvg
                        className={`nav-arrow scale-75 opacity-0 translate-x-[10px] duration-300`}
                      />
                      <p className="uppercase invert cursor-pointer ">
                        {" "}
                        {link.name}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Trigger for nav mobile list */}
        <button
          onClick={() => {
            navMobTimeline.current?.play();
          }}
          className="mini-heading gap-[5px] items-center justify-center invert hidden -768:flex"
        >
          <div className="bg-white h-[5px] w-[5px] rounded-full"></div>
          <p>MENU</p>
        </button>
      </nav>

      {/* Container for nav mobile list */}
      <div className="fixed flex h-full w-full  text-white bg-black z-[100] translate-y-[-100%] nav-drawer overflow-hidden pointer-events-none invisible">
        {/* Container for cont */}
        <div className="fixed inset-0 w-full h-full flex flex-col justify-between items-start px-[18px] py-[20px] nav-drawer-content translate-y-[100%]">
          {/* Container for logo and close button */}
          <div className="flex justify-between items-center w-full">
            <Image src={logo} alt="logo" className="max-w-[36px]" />

            <button className="mini-heading" onClick={closeNavDrawer}>
              CLOSE
            </button>
          </div>

          {/* List for nav */}
          <ul className="flex flex-col">
            {navLinks.map((link, idx) => {
              return (
                <li
                  key={idx}
                  data-id={link.id}
                  className="nav-click overflow-hidden font-medium text-[36px] leading-[100%]"
                  onClick={(e: React.MouseEvent) => {
                    const target = e.target as HTMLElement;
                    gsap.to(window, {
                      duration: 2.4,
                      scrollTo: `#${target.dataset.id}`,
                      ease: "power3.inOut",
                    });

                    closeNavDrawer();
                  }}
                >
                  <p className="nav-mob-link_text translate-y-[40px] pointer-events-none">
                    {link.name}
                  </p>
                </li>
              );
            })}
          </ul>

          {/* Reach out section */}
          <div className="flex flex-col gap-[16px] w-full nav-translate translate-y-[40px] opacity-0">
            <p className="mini-heading">/ REACH OUT</p>
            <div className="w-full max-w-[357px] flex justify-between items-center nav-reachout relative">
              <p>info@makerstudio.space</p>
              <ArrowSvg className="w-[20px] h-[20px] " stroke="white" />
            </div>
          </div>

          {/* GIANT X */}
          <button onClick={closeNavDrawer}>
            <Image src={giant_x} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}
