'use client';

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
    year: '2025.10 - 至今',
    title: '前端开发实习生',
    company: '字节跳动 (Bytedance)',
    description: '参与 Vite DevTools 维护与开发，负责测试构建产物，发现并修复 Bug。',
  },
  {
    year: '2023 - 2027',
    title: '本科 · 计算机科学与技术',
    company: '中国矿业大学',
    description: '双一流 211 本科。曾获 2025 年度中国青年科技创新“揭榜挂帅”擂台赛（国一）、数学建模等奖项。',
  },
]

const Timeline: React.FC = () => {
  return (
    <div className="timeline-container">
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
