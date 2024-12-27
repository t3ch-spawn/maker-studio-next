import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";

const timeline = useRef(null);

useGSAP(() => {
  timeline.current = gsap.timeline({ paused: true }).to(".custom-cursor", {
    backgroundColor: "blue",
    duration: 0.3,
  });
});
function BtnHover(e, state) {
  const btn = e.currentTarget;
  const cursorDot = document.querySelector(".cursor-dot");
  const cursor = document.querySelector(".custom-cursor");
  const btnBounds = btn.getBoundingClientRect();
  const cursorDotBounds = cursorDot.getBoundingClientRect();
  const cursorBounds = cursor.getBoundingClientRect();
  if (state === "enter") {
    timeline.current.play();

    cursorDot.classList.remove("should-move");
    const widthLeft = btnBounds.left + btnBounds.width;
    const heightTop = btnBounds.top + btnBounds.height / 2;
    timeline.current
      .to(
        ".custom-cursor",
        {
          x: widthLeft - (cursorDotBounds.left + cursorBounds.width / 2),
          y: heightTop - cursorDotBounds.top,
          duration: 0.3,
          scale: 1.7,
        },
        0
      )
      .to(
        ".cursor-dot",
        {
          x: widthLeft - (cursorDotBounds.left + cursorBounds.width / 2),
          y: heightTop - cursorDotBounds.top,
          opacity: 0,
          duration: 0.2,
        },
        0
      );
  }

  if (state === "leave") {
    timeline.current.reverse();
    cursorDot.classList.add("should-move");
  }
}

export default function Unusef() {
  return <div>Unusef</div>;
}
