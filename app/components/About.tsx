import React from "react";
import about_pic from "../assets/images/about_pic.png";
import ParallaxContainer from "./reusables/ParallaxContainer";

export default function About() {
  return (
    <section
      className="p-[24px] -768:py-[20px] -768:px-[18px] pb-[150px] bg-white section"
      id="about"
    >
      {/* Container for mini heading */}
      <div className="w-full  font-medium flex items-center">
        <p>/</p>
        <h2 className="mini-heading pl-[12.5vw]">ABOUT US</h2>
      </div>

      {/*Container for big paragraph */}
      <div className="flex flex-col  mt-[80px] -768:mt-[56px] justify-center w-full big-para ">
        <p className="heading-anim split pl-[12.5vw] -968:pl-0">
          We deliver exceptional product execution
        </p>
        <p className="heading-anim split w-[90%] -600:w-full text-left">
          that transforms founders’ ambitions into reality, guiding companies
          from concept to launch.
        </p>
      </div>

      {/* Line for demcaction */}
      <hr className="h-[0.5px]  border-[#0000001A] w-full mt-[72px] -768:mt-[64px]" />

      {/* Container for picture and typography */}
      <div className="flex items-end justify-between mt-[96px] -1024:flex-col-reverse -1024:justify-center -1024:items-start -768:mt-[48px]">
        {/* Picture on the left */}
        <ParallaxContainer
          imgSrc={about_pic}
          className="max-w-[333px] -1024:mt-[72px] -1024:self-center"
          imgClass="h-[440px] object-right object-cover "
        />

        {/* Typography on the right */}
        <div className="flex flex-col gap-[96px] -1024:gap-[48px] w-full max-w-[686px] -1200:max-w-[580px] -1024:max-w-full text-[20px] -768:text-[16px] leading-[140%]">
          <div className="flex gap-[50px] w-full justify-between items-start -1024:flex-col -1024:gap-[20px]">
            <p className=" font-medium para-anim split">Legacy of Innovation</p>
            <p className="max-w-[333px] -1024:max-w-[600px] text-[#00000099] para-anim scrub split">
              We are a product studio dedicated to partnering with ambitious
              founders and teams to craft software that creates lasting impact.
              Drawing on decades of collective experience from building and
              scaling products for industry leaders like 54Gene, Nomba, Brass,
              and NEAR Protocol, we bring unparalleled expertise to every
              project. Our solutions have touched the lives of million users
              globally, empowering our clients and community to achieve
              remarkable scale and success.
            </p>
          </div>

          <div className="flex gap-[50px] w-full justify-between items-start -1024:flex-col -1024:gap-[20px]">
            <p className="font-medium para-anim">Founded in 2023</p>
            <p className="max-w-[333px] -1024:max-w-[600px] text-[#00000099] para-anim scrub split">
              Our team specializes in partnering with mid-sized companies and
              venture-backed startups across AI, SaaS, Fintech, and Health-tech,
              focusing on ideas with unique approaches to solving real-world
              challenges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
