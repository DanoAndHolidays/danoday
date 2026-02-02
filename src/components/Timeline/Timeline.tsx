import React from 'react'
import { motion } from 'framer-motion'
import './Timeline.scss'

interface Experience {
  year: string
  title: string
  company: string
  description: string
}

const experiences: Experience[] = [
  {
    year: '2025 - 至今',
    title: '高级前端架构师',
    company: '未来科技',
    description:
      '主导下一代赛博界面和沉浸式 Web 体验的开发。',
  },
  {
    year: '2023 - 2025',
    title: '前端工程师',
    company: 'Neo 系统',
    description:
      '开发高性能、注重动画设计的可扩展 React 应用程序。',
  },
  {
    year: '2021 - 2023',
    title: 'UI/UX 设计师',
    company: '创意实验室',
    description: '专注于创建高保真原型和深色主题界面系统。',
  },
]

const Timeline: React.FC = () => {
  return (
    <div className="timeline-container">
      <h2 className="timeline-title">项目经历</h2>
      <div className="timeline">
        {experiences.map((exp, index) => (
          <motion.div
            className="timeline-item"
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="timeline-dot" />
            <div className="timeline-content">
              <span className="year">{exp.year}</span>
              <h3>{exp.title}</h3>
              <h4>{exp.company}</h4>
              <p>{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
