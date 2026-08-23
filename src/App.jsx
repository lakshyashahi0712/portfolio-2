import { AnimatePresence } from "motion/react";
import About from "./components/About";
import Activity from "./components/Activity";
import BootGate from "./components/BootGate";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Milestones from "./components/Milestones";
import Nav from "./components/Nav";
import Stack from "./components/Stack";
import Work from "./components/Work";
import useBootGate from "./hooks/useBootGate";

export default function App() {
  const { booted, enter } = useBootGate();

  return (
    <>
      <AnimatePresence>
        {!booted && <BootGate key="boot" onEnter={enter} />}
      </AnimatePresence>

      <Nav />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Experience />
        <Stack />
        <Work />
        <Milestones />
        <Activity />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
