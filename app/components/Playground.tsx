'use client'

import React, { useRef } from "react";
import grid from "../assets/images/playground_grid.png";
import ai from "../assets/images/play_ai.png";
import balloon from "../assets/images/play_balloon.png";
import Draggable from "gsap/Draggable";
// import InertiaPlugin from "gsap/InertiaPlugin";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image, { StaticImageData } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

gsap.registerPlugin(Draggable);

export default function Playground() {
  return (
    <section className="bg-[#F2F2F2] pt-[150px] relative z-[15] pb-[30px] -968:hidden">
      {/* Container for heading */}
      <div className="mx-auto flex gap-[16px] items-start w-fit mb-[155px]">
        <h1 className="mini-heading mt-[7px]">/ LAB</h1>
        <h1 className="big-para heading-anim split">PLAYGROUND</h1>
      </div>

      {/* Container for playground */}
      <div className="relative min-h-[1010px] w-full playground-container">
        {/* Background grid for playground */}
        <Image
          src={grid}
          className="absolute top-0 left-0 w-full h-full"
          alt=""
        />

        <PlaySquare
          imgSrc={ai}
          imgClass="h-[400px] w-[450px]"
          descrip={"station asset"}
          className="translate-x-[200%] translate-y-[10%]"
        />
        <PlaySquare
          imgSrc={balloon}
          imgClass="h-[400px] w-[450px]"
          descrip={"station asset"}
          className="translate-x-[10%] translate-y-[10%]"
        />
        <PlaySquare
          imgSrc={ai}
          imgClass="h-[259px] w-[333px]"
          descrip={"station asset"}
          className="translate-x-[170%] translate-y-[170%]"
        />
        <PlaySquare
          imgSrc={balloon}
          imgClass="h-[259px] w-[333px]"
          descrip={"station asset"}
          className="translate-x-[70%] translate-y-[120%]"
        />
      </div>
    </section>
  );
}

interface SquareTypes {
  descrip: string;
  imgClass: string;
  imgSrc: string | StaticImageData | StaticImport;
  className: string;
}

function PlaySquare({ descrip, imgClass, imgSrc, className }: SquareTypes) {

  const squareRef = useRef<HTMLDivElement>(null);
  const velocity = useRef({ x: 0, y: 0 }); // Store velocity for inertia
  const lastPos = useRef({ x: 0, y: 0 }); // Store last position
  const isDragging = useRef(false); // Track dragging state

  useGSAP(() => {
    const square = squareRef.current;

    // Check bounds using GSAP's ticker
    const updateBounds = () => {
      if (!isDragging.current && square) {
        const rect = square.getBoundingClientRect();
        const container = document.querySelector<HTMLElement>(
          ".playground-container"
        );
        if (!container) return;
        const containerBounds = container.getBoundingClientRect();
        // Clamp position within bounds
        if (rect.left < containerBounds.left) {
          gsap.set(square, { x: containerBounds.left - containerBounds.x });
          velocity.current.x = 0; // Reset velocity
        }
        if (rect.right > containerBounds.right) {
          gsap.set(square, {
            x: containerBounds.right - rect.width - containerBounds.x,
          });
          velocity.current.x = 0;
        }
        if (rect.top < containerBounds.top) {
          gsap.set(square, { y: containerBounds.top - containerBounds.y });
          velocity.current.y = 0;
        }
        if (rect.bottom > containerBounds.bottom) {
          gsap.set(square, {
            y: containerBounds.bottom - rect.height - containerBounds.y,
          });
          velocity.current.y = 0;
        }
      }
    };

    // Add ticker to continuously check bounds
    gsap.ticker.add(() => {
      //   console.log("blaa");
      updateBounds();
    });

    // Create GSAP Draggable
    Draggable.create(square, {
      bounds: ".playground-container",

      onDragStart: () => {
        isDragging.current = true;
      },
      onDrag: function () {
        // Calculate velocity during drag
        velocity.current.x = this.x - lastPos.current.x;
        velocity.current.y = this.y - lastPos.current.y;
        lastPos.current = { x: this.x, y: this.y };
      },
      onDragEnd: function () {
        isDragging.current = false;

        // Apply inertia when dragging ends
        gsap.to(square, {
          x: `+=${velocity.current.x * 10}`,
          y: `+=${velocity.current.y * 10}`,
          duration: 1,
          ease: "power2.out",
        });
      },
    });

    return () => {
      Draggable.get(square)?.kill();
      gsap.ticker.remove(updateBounds); // Remove the ticker on unmount
    };
  });

  return (
    <div
      ref={squareRef}
      className={`flex flex-col items-start cursor-grab absolute play-square ${className}`}
    >
      {/* Image for the square */}
      <Image className={`${imgClass}`} src={imgSrc} alt="" />

      {/* Description of square */}
      <div className="font-ibm text-[8px] px-[8px] py-[6px] bg-white uppercase font-medium">
        {descrip}
      </div>
    </div>
  );
}
