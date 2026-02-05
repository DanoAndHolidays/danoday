'use client';

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Github, Coffee, Bug, Timer, Users, GitBranch } from 'lucide-react'
import './Stats.scss'

interface GithubStats {
  repos: number
  followers: number
  gists: number
}

const Stats: React.FC = () => {
  const [githubData, setGithubData] = useState<GithubStats>({ repos: 0, followers: 0, gists: 0 })
  const [uptime, setUptime] = useState('00:00:00')

  useEffect(() => {
    // 模拟获取 GitHub 数据 (实际应用中可以替换为真实的 API 调用)
    const fetchGithubStats = async () => {
      try {
        const response = await fetch('https://api.github.com/users/DanoAndHolidays')
        if (response.ok) {
          const data = await response.json()
          setGithubData({
            repos: data.public_repos,
            followers: data.followers,
            gists: data.public_gists,
          })
        }
      } catch (err) {
        console.error('Failed to fetch GitHub stats', err)
      }
    }

    fetchGithubStats()

    // 运行时间计数器
    const startTime = Date.now()
    const timer = setInterval(() => {
      const diff = Date.now() - startTime
      const h = Math.floor(diff / 3600000)
        .toString()
        .padStart(2, '0')
      const m = Math.floor((diff % 3600000) / 60000)
        .toString()
        .padStart(2, '0')
      const s = Math.floor((diff % 60000) / 1000)
        .toString()
        .padStart(2, '0')
      setUptime(`${h}:${m}:${s}`)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const systemMetrics = [
    { label: '咖啡消耗量', value: '1,240 L', icon: <Coffee size={20} /> },
    { label: '已修复缺陷', value: '4,892', icon: <Bug size={20} /> },
    { label: '系统运行时间', value: uptime, icon: <Timer size={20} /> },
  ]

  const githubMetrics = [
    { label: '代码仓库', value: githubData.repos, icon: <GitBranch size={20} /> },
    { label: '关注者', value: githubData.followers, icon: <Users size={20} /> },
    { label: '公开 Gists', value: githubData.gists, icon: <Github size={20} /> },
  ]

  return (
    <section className="stats-container">
      <div className="stats-grid">
        <motion.div
          className="stats-panel github-panel"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="panel-title">GitHub 实时数据</div>
          <div className="metrics-list">
            {githubMetrics.map((m, i) => (
              <div key={i} className="metric-item">
                <div className="metric-icon">{m.icon}</div>
                <div className="metric-content">
                  <span className="metric-label">{m.label}</span>
                  <span className="metric-value">{m.value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="stats-panel system-panel"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="panel-title">累计统计</div>
          <div className="metrics-list">
            {systemMetrics.map((m, i) => (
              <div key={i} className="metric-item">
                <div className="metric-icon">{m.icon}</div>
                <div className="metric-content">
                  <span className="metric-label">{m.label}</span>
                  <span className="metric-value">{m.value}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pulse-line"></div>
        </motion.div>
      </div>

      <div className="status-footer">
        <div className="status-indicator">
          <span className="dot pulse"></span>
          <span className="text">所有系统运行正常</span>
        </div>
        <div className="timestamp">数据刷新时间: {new Date().toLocaleTimeString()}</div>
      </div>
    </section>
  )
}

export default Stats
