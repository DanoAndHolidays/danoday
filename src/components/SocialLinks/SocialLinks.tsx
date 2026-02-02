import React from 'react'
import { Github, Mail, Tv } from 'lucide-react'
import './SocialLinks.scss'

const SocialLinks: React.FC = () => {
  const links = [
    { icon: <Github size={24} />, url: 'https://github.com/DanoAndHolidays', label: 'Github' },
    { icon: <Tv size={24} />, url: 'https://space.bilibili.com/111616585', label: 'Bilibili' },
    { icon: <Mail size={24} />, url: 'mailto:Danoday@Foxmail.com', label: 'Mail' },
  ]

  return (
    <div className="footer-content">
      <div className="social-links-container">
        {links.map((link, index) => (
          <a
            href={link.url}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label={link.label}
          >
            {link.icon}
            <span className="glow-effect"></span>
          </a>
        ))}
      </div>

      <div className="footer-links">
        <div className="link-group">
          <h4>友情链接</h4>
          <div className="links">
            <a href="https://github.com/DanoAndHolidays" target="_blank" rel="noopener noreferrer">DanoAndHolidays</a>
            <a href="https://space.bilibili.com/111616585" target="_blank" rel="noopener noreferrer">Bilibili 频道</a>
          </div>
        </div>
        <div className="link-group">
          <h4>技术支持</h4>
          <div className="links">
            <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">React</a>
            <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">Vite</a>
            <a href="https://threejs.org/" target="_blank" rel="noopener noreferrer">Three.js</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} DANO_DAY. 基于 React & Three.js 构建</p>
      </div>
    </div>
  )
}

export default SocialLinks
