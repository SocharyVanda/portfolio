import About from "./components/About";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import GitHubStats from "./components/GitHubStats";
import Hero from "./components/Hero";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen">
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <div className="dotted-bg">
          <About />
          <Skills />
          <Projects />
          <Experience />
          <GitHubStats />
          <Achievements />
          <Contact />
        </div>
      </main>
      <MusicPlayer />
    </div>
  );
}
