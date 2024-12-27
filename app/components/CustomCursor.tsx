"use client";

import React, { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".custom-cursor");
    const cursorDot = document.querySelector<HTMLElement>(".cursor-dot");
    document.addEventListener("mousemove", (e) => {
      if (!cursorDot || !cursor) return;
      if (cursorDot.classList.contains("should-move")) {
        cursorDot.style.top = e.clientY + "px";
        cursorDot.style.left = e.clientX + "px";

        cursor.animate(
          {
            left: e.clientX + "px",
            top: e.clientY + "px",
          },
          {
            duration: 700,
            fill: "forwards",
          }
        );
      }
    });
  }, []);

  return (
    <>
      <div className="custom-cursor invert fixed bg-transparent border-[1px] border-black rounded-full h-[30px] w-[30px] translate-x-[-50%] translate-y-[-50%]  z-[210] pointer-events-none -1024:hidden"></div>

      <div className="cursor-dot should-move invert h-[5px] w-[5px] fixed bg-black rounded-[50%] pointer-events-none z-[215] translate-x-[-50%] translate-y-[-50%] -1024:hidden"></div>
    </>
  );
}
