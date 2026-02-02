import React from 'react'
import { motion } from 'framer-motion'
import { Cpu, Code2, ShieldCheck, Zap } from 'lucide-react'
import './Skills.scss'

interface SkillItem {
  name: string
  level: number // 0-100
}

interface SkillCategory {
  title: string
  icon: React.ReactNode
  items: SkillItem[]
}

const skillCategories: SkillCategory[] = [
  {
    title: '框架与核心',
    icon: <Code2 size={24} />,
    items: [
      { name: 'Vue 3', level: 95 },
      { name: 'TypeScript', level: 92 },
      { name: 'ES6+', level: 90 },
      { name: 'Pinia', level: 88 },
    ],
  },
  {
    title: '工程化与 UI',
    icon: <Cpu size={24} />,
    items: [
      { name: 'Vite', level: 90 },
      { name: 'TailwindCSS', level: 92 },
      { name: 'Sass / CSS3', level: 95 },
      { name: 'Element Plus', level: 85 },
    ],
  },
  {
    title: '可视化与动画',
    icon: <Zap size={24} />,
    items: [
      { name: 'Echarts', level: 88 },
      { name: 'GSAP', level: 85 },
      { name: 'HTML5 Canvas', level: 82 },
      { name: 'Motion Logic', level: 90 },
    ],
  },
]

const Skills: React.FC = () => {
  return (
    <section className="skills-container">
      <div className="section-header">
        <Zap className="header-icon" />
        <h2>核心技能</h2>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            className="skill-category-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="category-header">
              {category.icon}
              <h3>{category.title}</h3>
            </div>
            <div className="skill-items">
              {category.items.map((skill, skillIndex) => (
                <div key={skillIndex} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-container">
                    <motion.div
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.05 + 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Skills
