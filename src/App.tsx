import MatrixRain from './components/MatrixRain/MatrixRain'
import GlitchText from './components/GlitchText/GlitchText'
import Timeline from './components/Timeline/Timeline'
import SocialLinks from './components/SocialLinks/SocialLinks'
import Projects from './components/Projects/Projects'
import Articles from './components/Articles/Articles'
import './App.scss'

function App() {
  return (
    <div className="app-container">
      <MatrixRain />

      <main className="content-wrapper">
        <section className="hero">
          <GlitchText text="DanoDay" />
          <p className="subtitle">Digital Alchemist & Frontend Visionary</p>
          <div className="hero-description">
            <p>Crafting high-performance, immersive digital experiences where code meets art.</p>
          </div>
          <SocialLinks />
        </section>
        <Articles />
        <Projects />
        <Timeline />

        <footer className="app-footer">
          <p>&copy; 2026 DanoDay. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}

export default App
