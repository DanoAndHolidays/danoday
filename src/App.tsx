import React, { useState, useEffect } from 'react'
import HeroScene from './components/HeroScene/HeroScene'
import MatrixRain from './components/MatrixRain/MatrixRain'
import Articles from './components/Articles/Articles'
import Timeline from './components/Timeline/Timeline'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import Stats from './components/Stats/Stats'
import SocialLinks from './components/SocialLinks/SocialLinks'
import CyberTerminal from './components/CyberTerminal/CyberTerminal'
import GlitchText from './components/GlitchText/GlitchText'
import PlayGround from './components/PlayGround'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import './App.scss'

const App: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const [isNearTop, setIsNearTop] = useState(true)

  // 监听滚动位置，用于彻底卸载不必要的组件
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setIsNearTop(latest < 0.25)
    })
  }, [scrollYProgress])

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // 当滚动进度在 0-0.2 之间时，3D 背景显示，代码雨逐渐消失
  // 当滚动进度 > 0.2 时，3D 背景消失，代码雨完全显示
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const matrixOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 0.5])

  return (
    <div className="app-container">
      {/* 采用休眠模式：通过 prop 传递可见性，让组件内部决定是否停止渲染循环 */}
      <motion.div
        style={{
          opacity: matrixOpacity,
          pointerEvents: isNearTop ? 'none' : 'auto',
        }}
      >
        <MatrixRain />
      </motion.div>

      <motion.div
        style={{
          opacity: heroOpacity,
          pointerEvents: isNearTop ? 'auto' : 'none',
        }}
      >
        <HeroScene isVisible={isNearTop} />
      </motion.div>

      <motion.div className="progress-bar" style={{ scaleX }} />

      <header className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <GlitchText text="DANO_DAY" />
          <p className="subtitle">CORE_STATION // FE工程师</p>
        </motion.div>
      </header>

      <main>
        <section id="projects">
          <Projects />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="articles">
          <Articles />
        </section>

        <section id="stats">
          <Stats />
        </section>

        <section id="timeline">
          <Timeline />
        </section>

        <section id="playground">
          <PlayGround />
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
