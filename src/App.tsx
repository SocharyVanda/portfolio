import About from "./components/About";
import Achievements from "./components/Achievements";
import AsciiHero from "./components/AsciiHero";
import Contact from "./components/Contact";
import CursorGrid from "./components/CursorGrid";
import Experience from "./components/Experience";
import GitHubStats from "./components/GitHubStats";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 -z-10">
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
      </div>
      <Navbar />
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
