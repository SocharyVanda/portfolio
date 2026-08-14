import About from "./components/About";
import Achievements from "./components/Achievements";
import AsciiHero from "./components/AsciiHero";
import Contact from "./components/Contact";
import CursorGrid from "./components/CursorGrid";
import DotGrid from "./components/DotGrid";
import Experience from "./components/Experience";
import GitHubStats from "./components/GitHubStats";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import TargetCursor from "./components/TargetCursor";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen">
      <TargetCursor
        targetSelector=".cursor-target"
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        cursorColorOnTarget="#7c5cff"
      />
      <div className="fixed inset-0 -z-10">
        {theme === "light" ? (
          <DotGrid
            dotSize={7}
            gap={26}
            baseColor="#e4e1f5"
            activeColor="#7c5cff"
            proximity={140}
            shockRadius={220}
            shockStrength={4}
            resistance={750}
            returnDuration={1.5}
          />
        ) : (
          <CursorGrid
            cellSize={64}
            color="#7c5cff"
            radius={160}
            falloff="smooth"
            holdTime={350}
            fadeDuration={700}
            lineWidth={1}
            maxOpacity={0.5}
            fillOpacity={0.05}
            gridOpacity={0.04}
            clickPulse={false}
          />
        )}
      </div>
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <AsciiHero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GitHubStats />
        <Achievements />
        <Contact />
      </main>
      <MusicPlayer />
    </div>
  );
}
