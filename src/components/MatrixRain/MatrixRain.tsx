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
      // 这里的 alpha 值决定了拖尾的长度
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length))

        // 获取垂直位置
        const yPos = drops[i] * fontSize

        // 减少边缘淡出，确保中间区域有足够密度的粒子
        let opacity = 1.0
        const margin = 50 // 减小淡出边缘

        if (yPos < margin) {
          opacity = yPos / margin
        } else if (yPos > canvas.height - margin) {
          opacity = (canvas.height - yPos) / margin
        }

        // 基础亮度
        const baseOpacity = Math.random() * 0.5 + 0.5

        ctx.fillStyle = `rgba(255, 140, 0, ${opacity * baseOpacity})`
        ctx.fillText(text, i * fontSize, yPos)

        // 增加重置概率，让粒子分布更均匀
        if (yPos > canvas.height && Math.random() > 0.95) {
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
