import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Works from "./components/Works";
import Expertise from "./components/Expertise";
import Footer from "./components/Footer";
import ParallaxContainer from "./components/reusables/ParallaxContainer";
import macbook from "./assets/images/macbook-pic.png";
import Playground from "./components/Playground";
import CustomCursor from "./components/CustomCursor";

export default function Home() {
  return (
    <main className="tracking-[-0.005em] font-grotesk">
      <CustomCursor />
      <Navbar />
      <Hero />
      <ParallaxContainer imgSrc={macbook} />
      <About />
      <Works />
      <Expertise />
      <Playground />
      <Footer />
    </main>
  );
}
