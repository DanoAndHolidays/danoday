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
    year: '2025 - Present',
    title: 'Senior Frontend Architect',
    company: 'Future Tech',
    description:
      'Leading the development of next-gen cyber interfaces and immersive web experiences.',
  },
  {
    year: '2023 - 2025',
    title: 'Frontend Engineer',
    company: 'Neo Systems',
    description:
      'Developed scalable React applications with focus on performance and motion design.',
  },
  {
    year: '2021 - 2023',
    title: 'UI/UX Designer',
    company: 'Creative Labs',
    description: 'Focused on creating high-fidelity prototypes and dark-themed interface systems.',
  },
]

const Timeline: React.FC = () => {
  return (
    <div className="timeline-container">
      <h2 className="timeline-title">Experience</h2>
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
