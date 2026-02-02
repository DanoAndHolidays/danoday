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
        // 递归获取所有文件以查找文件夹中的内容
        const response = await fetch(
          'https://api.github.com/repos/DanoAndHolidays/ObsidianSave/git/trees/main?recursive=1',
        )
        if (!response.ok) throw new Error('Failed to fetch')

        const result = await response.json()
        const tree: any[] = result.tree || []

        // 过滤出文件夹中的 .md 文件（排除根目录）
        const mdFiles = tree
          .filter(
            (item) =>
              item.type === 'blob' && // git tree API 中 'blob' 代表文件
              item.path.includes('/') && // 必须在文件夹中（包含 '/'）
              item.path.endsWith('.md') &&
              !item.path.split('/').pop()?.startsWith('.'), // 排除隐藏文件
          )
          .slice(0, 6)
          // 映射为组件需要的 GitHubContent 格式
          .map((item) => ({
            name: item.path.split('/').pop() || item.path,
            path: item.path,
            html_url: `https://github.com/DanoAndHolidays/ObsidianSave/blob/main/${item.path}`,
            type: 'file',
          }))

        setArticles(mdFiles)
      } catch (err) {
        console.error('Error fetching articles:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()

    // 依赖为[]，这里只会在组件挂载时运行一次
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
