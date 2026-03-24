'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, GitCommit, GitPullRequest, Users, GitBranch, Star } from 'lucide-react'
import './Stats.scss'

interface GithubStats {
  repos: number
  followers: number
  gists: number
  totalStars: number
  totalForks: number
  totalIssues: number
}

interface ApiError {
  type: 'none' | 'rate_limit' | 'not_found' | 'network' | 'unknown'
  message: string
}

// Mock 数据
const MOCK_GITHUB_DATA: GithubStats = {
  repos: 42,
  followers: 128,
  gists: 12,
  totalStars: 89,
  totalForks: 23,
  totalIssues: 45,
}

const Stats: React.FC = () => {
  const [githubData, setGithubData] = useState<GithubStats>(MOCK_GITHUB_DATA)
  const [isMockData, setIsMockData] = useState(true)
  const [apiError, setApiError] = useState<ApiError>({ type: 'none', message: '' })

  useEffect(() => {
    const fetchGithubStats = async () => {
      try {
        // 获取用户基本信息
        const userResponse = await fetch('https://api.github.com/users/DanoAndHolidays')
        if (!userResponse.ok) {
          if (userResponse.status === 403) {
            setGithubData(MOCK_GITHUB_DATA)
            setIsMockData(true)
            setApiError({ type: 'rate_limit', message: 'API 速率限制，请稍后重试' })
            console.error('GitHub API rate limit exceeded')
          } else if (userResponse.status === 404) {
            setGithubData(MOCK_GITHUB_DATA)
            setIsMockData(true)
            setApiError({ type: 'not_found', message: 'GitHub 用户不存在' })
            console.error('GitHub user not found')
          } else {
            setGithubData(MOCK_GITHUB_DATA)
            setIsMockData(true)
            setApiError({ type: 'unknown', message: `API 错误 (${userResponse.status})` })
            console.error('GitHub API error:', userResponse.status)
          }
          return
        }

        const userData = await userResponse.json()

        // 获取所有仓库信息（用于统计 stars、forks、issues）
        let allRepos: any[] = []
        let page = 1
        let hasMore = true

        while (hasMore && page <= 10) {
          // 最多获取 10 页，防止无限循环
          const reposResponse = await fetch(
            `https://api.github.com/users/DanoAndHolidays/repos?per_page=100&page=${page}`,
          )
          if (!reposResponse.ok) break

          const repos = await reposResponse.json()
          if (repos.length === 0) {
            hasMore = false
          } else {
            allRepos = allRepos.concat(repos)
            page++
          }
        }

        // 计算统计数据
        const totalStars = allRepos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
        const totalForks = allRepos.reduce((sum, repo) => sum + (repo.forks_count || 0), 0)
        const totalIssues = allRepos.reduce((sum, repo) => sum + (repo.open_issues_count || 0), 0)

        setGithubData({
          repos: userData.public_repos || MOCK_GITHUB_DATA.repos,
          followers: userData.followers || MOCK_GITHUB_DATA.followers,
          gists: userData.public_gists || MOCK_GITHUB_DATA.gists,
          totalStars: totalStars || MOCK_GITHUB_DATA.totalStars,
          totalForks: totalForks || MOCK_GITHUB_DATA.totalForks,
          totalIssues: totalIssues || MOCK_GITHUB_DATA.totalIssues,
        })
        setIsMockData(false)
        setApiError({ type: 'none', message: '' })
      } catch (err) {
        setGithubData(MOCK_GITHUB_DATA)
        setIsMockData(true)
        setApiError({ type: 'network', message: '网络连接失败' })
        console.error('Network error, using mock data', err)
      }
    }

    fetchGithubStats()
  }, [])

  const githubOverviewMetrics = [
    { label: '代码仓库', value: githubData.repos, icon: <GitBranch size={20} /> },
    { label: '关注者', value: githubData.followers, icon: <Users size={20} /> },
    { label: '公开 Gists', value: githubData.gists, icon: <Github size={20} /> },
  ]

  const githubActivityMetrics = [
    { label: '获得 Star', value: githubData.totalStars.toLocaleString(), icon: <Star size={20} /> },
    {
      label: '被 Fork 次数',
      value: githubData.totalForks.toLocaleString(),
      icon: <GitBranch size={20} />,
    },
    {
      label: '开放 Issues',
      value: githubData.totalIssues.toLocaleString(),
      icon: <GitPullRequest size={20} />,
    },
  ]

  const getStatusText = () => {
    if (isMockData) {
      return apiError.message ? `使用模拟数据（${apiError.message}）` : '使用模拟数据'
    }
    return '所有系统运行正常'
  }

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
          <div className="panel-title">
            GitHub 实时数据
            {isMockData && <span className="mock-badge">Mock</span>}
          </div>
          <div className="metrics-list">
            {githubOverviewMetrics.map((m, i) => (
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
          <div className="panel-title">仓库统计</div>
          <div className="metrics-list">
            {githubActivityMetrics.map((m, i) => (
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
          <span className={`dot ${isMockData ? 'warning' : 'pulse'}`}></span>
          <span className="text">{getStatusText()}</span>
        </div>
        <div className="timestamp">数据刷新时间: {new Date().toLocaleTimeString()}</div>
      </div>
    </section>
  )
}

export default Stats
