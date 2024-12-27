import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ArrowSvg from "./ArrowSvg";

export default function Button() {
  const tl = useRef<GSAPTimeline>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    tl.current = gsap
      .timeline({ paused: true })
      .to(".btn-right-arrow", {
        scale: 0,
        translateX: 10,
        ease: "power3.inOut",
      })
      .to(
        ".btn-pill",
        {
          translateX: 30,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        ".btn-left-arrow",
        {
          scale: 1,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        ".btn-right-arrow div",
        {
          translateX: 35,
          ease: "back.inOut(4)",
          // duration: 2,
        },
        0
      )
      .from(
        ".btn-left-arrow div",
        {
          translateX: 35,
          ease: "back.inOut(4)",
          // duration: 2,
        },
        0
      );
  });

  function enterAnim() {
    tl.current?.play();
  }

  function leaveAnim() {
    tl.current?.reverse();
  }

  function mouseMove(e: React.MouseEvent) {
    const { clientX, clientY } = e;
    if (btnRef.current) {
      const { height, width, left, top } =
        btnRef.current.getBoundingClientRect();
      const trueX = clientX - (left + width / 2);
      const trueY = clientY - (top + height / 2);

      gsap.to(btnRef.current, {
        x: trueX,
        y: trueY,
      });
    }
  }

  return (
    <div
      onMouseLeave={() => {
        leaveAnim();
        gsap.to(btnRef.current, { x: 0, y: 0, ease: "elastic.out(1.75,0.5)" });
      }}
      onMouseEnter={enterAnim}
      onMouseMove={mouseMove}
      className="flex items-center cursor-pointer"
      ref={btnRef}
    >
      <div className="h-[40px] w-[40px] rounded-full translate-x-[30px] flex justify-center items-center bg-white scale-0 btn-left-arrow  overflow-hidden">
        <div>
          <ArrowSvg />
        </div>
      </div>
      <button className="bg-white px-[24px] py-[13px] rounded-full text-black font-medium btn-pill">
        Get in touch
      </button>
      <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center bg-white btn-right-arrow overflow-hidden">
        <div>
          <ArrowSvg />
        </div>
      </div>
    </div>
  );
}
