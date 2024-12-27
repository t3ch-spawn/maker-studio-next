"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import Image, { StaticImageData } from "next/image";

interface PropsTypes {
  imgSrc: StaticImageData;
  className?: string;
  percent?: number;
  imgClass?: string;
}

gsap.registerPlugin(ScrollTrigger);

export default function ParallaxContainer({
  imgSrc,
  className,
  percent = -15,
  imgClass,
}: PropsTypes) {
  const contRef = useRef(null);
  const picRef = useRef<HTMLImageElement>(null);
  const [height, setHeight] = useState(0);

  useGSAP(() => {
    gsap.to(picRef.current, {
      yPercent: percent,
      scrollTrigger: {
        scrub: 1,
        trigger: picRef.current,
        // markers: true,
      },
    });

    // setTimeout(() => {
    //   ScrollTrigger.refresh();
    // }, 1000);

    window.addEventListener("resize", () => {
      setContainerHeight();
      // ScrollTrigger.refresh();
    });
  });

  function setContainerHeight() {
    if (picRef.current && contRef.current) {
      const picHeight = picRef.current.getBoundingClientRect().height;
      //   contRef.current.style.height = `${picHeight * 0.85}px`;
      setHeight(picHeight * 0.85);
      // ScrollTrigger.refresh();
    }
  }

  return (
    <div
      style={{ height: `${height}px` }}
      ref={contRef}
      className={`overflow-hidden ${className}`}
    >
      <Image
        onLoad={setContainerHeight}
        src={imgSrc}
        alt="image"
        className={`w-full will-anim parallax-image ${imgClass}`}
        ref={picRef}
      />
    </div>
  );
}
