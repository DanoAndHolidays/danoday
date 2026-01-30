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
  )
}

export default SocialLinks
