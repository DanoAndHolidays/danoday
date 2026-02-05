'use client';

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Book, FileText, Loader2, ChevronRight, Folder, Calendar } from 'lucide-react'
import './Articles.scss'

interface GitHubContent {
  name: string
  path: string
  html_url: string
  type: string
  category: string
  date: string
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
          .map((item) => {
            const pathParts = item.path.split('/')
            // 模拟一些随机日期
            const randomDays = Math.floor(Math.random() * 30)
            const date = new Date()
            date.setDate(date.getDate() - randomDays)
            const formattedDate = date.toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })

            return {
              name: pathParts.pop() || item.path,
              path: item.path,
              html_url: `https://github.com/DanoAndHolidays/ObsidianSave/blob/main/${item.path}`,
              type: 'file',
              category: pathParts.join(' / '),
              date: formattedDate,
            }
          })

        if (mdFiles.length === 0) throw new Error('No articles found')
        setArticles(mdFiles)
      } catch (err) {
        console.error('Error fetching articles:', err)
        // API 降级方案：展示 Mock 数据
        const mockArticles: GitHubContent[] = [
          {
            name: 'React 19 深度解析.md',
            path: 'frontend/react-19.md',
            html_url: 'https://github.com/DanoAndHolidays/ObsidianSave',
            type: 'file',
            category: '前端开发',
            date: '2024年2月15日',
          },
          {
            name: 'TypeScript 高级技巧.md',
            path: 'frontend/ts-tips.md',
            html_url: 'https://github.com/DanoAndHolidays/ObsidianSave',
            type: 'file',
            category: '前端开发',
            date: '2024年2月10日',
          },
          {
            name: 'Vue3 响应式原理.md',
            path: 'frontend/vue3-reactive.md',
            html_url: 'https://github.com/DanoAndHolidays/ObsidianSave',
            type: 'file',
            category: '前端开发',
            date: '2024年2月5日',
          },
        ]
        setArticles(mockArticles)
        setError(false) // 不再显示错误状态，而是显示 Mock 内容
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
        <p>正在同步 Obsidian 笔记库...</p>
      </div>
    )
  }

  return (
    <section className="articles-container">
      {error ? (
        <div className="articles-error">
          <p>
            加载笔记失败。请直接查看{' '}
            <a href="https://github.com/DanoAndHolidays/ObsidianSave" target="_blank">
              代码仓库
            </a>。
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
                <div className="article-category">
                  <Folder size={12} />
                  <span>{article.category}</span>
                </div>
                <h3>{article.name.replace('.md', '')}</h3>
                <div className="article-footer">
                  <span className="article-date">
                    <Calendar size={12} />
                    {article.date}
                  </span>
                  <span className="article-link">
                    阅读笔记 <ChevronRight size={14} />
                  </span>
                </div>
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
          查看完整知识库
        </a>
      </div>
    </section>
  )
}

export default Articles
