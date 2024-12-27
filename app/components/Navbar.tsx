"use client";

import React, { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ArrowSvg from "./reusables/ArrowSvg";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import Lenis from "lenis";

export default function Navbar() {
  const navLinks = [
    { name: "About us", id: "about" },
    { name: "Works", id: "works" },
    { name: "Expertise", id: "expertise" },
    { name: "Contact", id: "contact" },
  ];

  const [date, setDate] = useState("0:00:00");
  const navDeskTimeline = useRef<GSAPTimeline>(null);

  useEffect(() => {
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

    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    // adding logic for when to show arrow on section
    const allSections = document.querySelectorAll(".section");
    const allLinks = document.querySelectorAll<HTMLElement>(".nav-link");

    allLinks.forEach((link) => {
      link.addEventListener("click", () => {
        gsap.to(window, {
          duration: 2.4,
          scrollTo: `#${link.dataset.id}`,
          ease: "power3.inOut",
        });
      });
    });

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

    const lenis = new Lenis({
      autoRaf: true,
    });

    // // Listen for the scroll event and return list back to menu
    lenis.on("scroll", (e) => {
      if (navLinkCont?.classList.contains("passed-hero")) {
        navDeskTimeline.current?.play();
      }
    });

    // Cleanup function to clear the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="fixed w-full top-0 flex justify-between items-start py-[27px] px-[24px] z-[100] bg-transparent text-white invert nav-desk">
      {/* 'Logo" */}
      <p className="text-[16px] font-medium invert">The Maker Studio</p>

      {/* TIme in the middle */}
      <p className="text-[13px] font-medium font-ibm invert -768:hidden">
        LOS, {date}
      </p>

      {/* Container for Menu and list items */}
      <div className="flex flex-col items-end">
        <div
          onClick={() => {
            if (!navDeskTimeline.current) return;
            navDeskTimeline.current.reverse();
          }}
          className="flex font-medium font-ibm gap-[5px] items-center justify-center invert cursor-pointer menu-btn-desk translate-y-[20px] opacity-0 pointer-events-none"
        >
          <div className="bg-white h-[5px] w-[5px] rounded-full"></div>
          <p>MENU</p>
        </div>

        {/* List on the right */}
        <ul className="flex flex-col gap-[5px] items-end font-medium text-[13px] font-ibm nav-link-container translate-y-[-20px]">
          {navLinks.map((link, idx) => {
            return (
              <li
                key={idx}
                data-id={link.id}
                className="relative nav-link ease-in-out duration-300 overflow-hidden pointer-events-all"
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
    </nav>
  );
}

function NavText(props: { children: React.ReactNode }) {
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);

  const [isHovering, setIsHovering] = useState(false);

  useGSAP(() => {
    if (text1Ref.current && text2Ref.current) {
      const text1 = new SplitType(text1Ref.current, {
        types: "words,chars",
      });
      const text2 = new SplitType(text2Ref.current, { types: "words,chars" });

      if (isHovering) {
        gsap.to(text1.chars, {
          y: -20,
          stagger: 0.025,
          ease: "back.out(2)",
        });
        gsap.to(text2.chars, {
          y: -20,
          stagger: 0.025,
          ease: "back.out(2)",
        });
      } else {
        gsap.from(text2.chars, {
          y: -20,
          stagger: 0.025,
          ease: "back.out(2)",
        });
        gsap.from(text1.chars, {
          y: -20,
          stagger: 0.025,
          ease: "back.out(2)",
        });
      }
    }
  }, [isHovering]);

  function toggleHover() {
    setIsHovering(!isHovering);
  }

  return (
    <>
      {/* Actual container for the texts */}
      <div
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        className="relative flex justify-center cursor-pointer items-center overflow-hidden "
      >
        <div className=" pointer-events-none" ref={text1Ref}>
          {props.children}
        </div>
        <div
          className="absolute translate-y-[20px] pointer-events-none z-[100]"
          ref={text2Ref}
        >
          {props.children}
        </div>
      </div>
    </>
  );
}
