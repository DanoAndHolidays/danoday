import React from 'react'
import './GlitchText.scss'

interface GlitchTextProps {
  text: string
  className?: string
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = '' }) => {
  return (
    <div className={`glitch-wrapper ${className}`}>
      <h1 className="glitch" data-text={text}>
        {text}
      </h1>
    </div>
  )
}

export default GlitchText
