import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import './Projects.scss'

interface Project {
  title: string
  description: string
  tech: string[]
  github: string
  demo?: string
}

const projects: Project[] = [
  {
    title: '一刻短剧 (Yike)',
    description:
      '一个高仿抖音的短剧SPA应用。复刻核心交互，在性能优化、数据架构、工程化层面进行了深度实践。采用播一预一机制，实现丝滑流畅的滑动体验。',
    tech: ['Vue 3', 'Vite', 'Pinia', 'Sass', 'Express'],
    github: 'https://github.com/DanoAndHolidays/yike',
    demo: 'https://danoandholidays.github.io/yike/',
  },
  {
    title: 'PLAYLET-APP',
    description: '早期的短剧应用原型开发，专注于移动端竖屏播放体验的二次开发探索。',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/DanoAndHolidays/PLAYLET-APP',
    demo: 'https://danoandholidays.github.io/PLAYLET-APP/',
  },
]

const Projects: React.FC = () => {
  return (
    <div className="projects-container">
      <h2 className="projects-title">精选项目</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            className="project-card"
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.tech.map((t, i) => (
                  <span key={i} className="tech-tag">
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-icon"
                >
                  <Github size={20} />
                  <span>代码</span>
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-icon"
                  >
                    <ExternalLink size={20} />
                    <span>在线演示</span>
                  </a>
                )}
              </div>
            </div>
            <div className="card-glow"></div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Projects
