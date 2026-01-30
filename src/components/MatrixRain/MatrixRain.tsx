import React, { useEffect, useRef } from 'react'
import './MatrixRain.scss'

const MatrixRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*'
    const fontSize = 16
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))

        // 获取垂直位置
        const yPos = drops[i] * fontSize

        // 计算边缘淡出效果 (顶部和底部)
        let opacity = 1.0
        const margin = 150 // 边缘淡出区域大小

        if (yPos < margin) {
          opacity = yPos / margin
        } else if (yPos > canvas.height - margin) {
          opacity = (canvas.height - yPos) / margin
        }

        // 随机波动透明度增加“闪烁”感
        opacity *= Math.random() * 0.4 + 0.6

        ctx.fillStyle = `rgba(255, 140, 0, ${Math.max(0, opacity)})`
        ctx.fillText(text, i * fontSize, yPos)

        if (yPos > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-rain" />
}

export default MatrixRain
