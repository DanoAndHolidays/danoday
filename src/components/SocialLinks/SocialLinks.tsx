import React from 'react'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import './SocialLinks.scss'

const SocialLinks: React.FC = () => {
  const links = [
    { icon: <Github size={24} />, url: 'https://github.com', label: 'Github' },
    { icon: <Twitter size={24} />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <Linkedin size={24} />, url: 'https://linkedin.com', label: 'Linkedin' },
    { icon: <Mail size={24} />, url: 'mailto:contact@danoday.com', label: 'Mail' },
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
