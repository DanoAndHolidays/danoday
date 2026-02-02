import React from 'react'
import HeroScene from './components/HeroScene/HeroScene'
import MatrixRain from './components/MatrixRain/MatrixRain'
import Articles from './components/Articles/Articles'
import Timeline from './components/Timeline/Timeline'
import Projects from './components/Projects/Projects'
import SocialLinks from './components/SocialLinks/SocialLinks'
import CyberTerminal from './components/CyberTerminal/CyberTerminal'
import GlitchText from './components/GlitchText/GlitchText'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import './App.scss'

const App: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // 当滚动进度在 0-0.2 之间时，3D 背景显示，代码雨逐渐消失
  // 当滚动进度 > 0.2 时，3D 背景消失，代码雨完全显示
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const matrixOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1])

  return (
    <div className="app-container">
      <motion.div style={{ opacity: matrixOpacity }}>
        <MatrixRain />
      </motion.div>

      <motion.div style={{ opacity: heroOpacity }}>
        <HeroScene />
      </motion.div>

      <motion.div className="progress-bar" style={{ scaleX }} />

      <header className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <GlitchText text="PROJECT_OVERDRIVE" />
          <p className="subtitle">CORE_STATION // FULL_STACK_ENGINEER</p>
        </motion.div>
      </header>

      <main>
        <section id="projects">
          <Projects />
        </section>

        <section id="articles">
          <Articles />
        </section>

        <section id="timeline">
          <Timeline />
        </section>
      </main>

      <footer>
        <SocialLinks />
      </footer>

      <CyberTerminal />
    </div>
  )
}

export default App
