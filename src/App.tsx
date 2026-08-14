import About from "./components/About";
import Achievements from "./components/Achievements";
import AsciiHero from "./components/AsciiHero";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import GitHubStats from "./components/GitHubStats";
import MusicPlayer from "./components/MusicPlayer";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

export default function App() {
  return (
    <div className="min-h-screen">
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
