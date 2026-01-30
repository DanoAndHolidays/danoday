import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Book, FileText, Loader2, ChevronRight } from 'lucide-react'
import './Articles.scss'

interface GitHubContent {
  name: string
  path: string
  html_url: string
  type: string
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<GitHubContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // 抓取 GitHub 仓库根目录内容
        const response = await fetch(
          'https://api.github.com/repos/DanoAndHolidays/ObsidianSave/contents/',
        )
        if (!response.ok) throw new Error('Failed to fetch')

        const data: GitHubContent[] = await response.json()

        // 过滤出 .md 文件，且排除隐藏文件
        const mdFiles = data
          .filter(
            (item) =>
              item.type === 'file' && item.name.endsWith('.md') && !item.name.startsWith('.'),
          )
          .slice(0, 6) // 最多展示 6 篇

        setArticles(mdFiles)
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="articles-loading">
        <Loader2 className="spinner" size={40} />
        <p>Synchronizing with Obsidian Vault...</p>
      </div>
    )
  }

  return (
    <section className="articles-container">
      <div className="section-header">
        <Book className="header-icon" />
        <h2>Latest Notes</h2>
      </div>

      {error ? (
        <div className="articles-error">
          <p>
            Failed to load notes. Please check the{' '}
            <a href="https://github.com/DanoAndHolidays/ObsidianSave" target="_blank">
              repository
            </a>{' '}
            directly.
          </p>
        </div>
      ) : (
        <div className="articles-grid">
          {articles.map((article, index) => (
            <motion.a
              href={article.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="article-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="article-icon">
                <FileText size={24} />
              </div>
              <div className="article-info">
                <h3>{article.name.replace('.md', '')}</h3>
                <span className="article-link">
                  Read Note <ChevronRight size={14} />
                </span>
              </div>
              <div className="card-border"></div>
            </motion.a>
          ))}
        </div>
      )}

      <div className="view-all">
        <a
          href="https://github.com/DanoAndHolidays/ObsidianSave"
          target="_blank"
          rel="noopener noreferrer"
        >
          View All Knowledge Base
        </a>
      </div>
    </section>
  )
}

export default Articles
