import React, { useEffect, useState, useRef } from 'react'
import './index.scss'

interface Point {
    x: number
    y: number
    originalX: number
    originalY: number
}

const PlayGround: React.FC = () => {
    //   const [count, setCount] = useState(0)

    //   const handleClick = () => {
    //     setCount(count + 1)
    //   }

    //   useEffect(() => {
    //     console.log(`Count: ${count}`)
    //   }, [count])

    const mouse = useRef({
        x: -1000,
        y: -1000,
    })

    const points = useRef<Point[]>([])

    const canvasRef = useRef<HTMLCanvasElement>(null)


    useEffect(
        () => {
            const canvas = canvasRef.current
            if (!canvas) return

            const ctx = canvas.getContext('2d')
            if (!ctx) return

            const initCanvas = () => {
                const rect = canvas.getBoundingClientRect();
                canvas.width = rect.width;
                canvas.height = rect.height;

                const gap = 30;
                const newPoints: Point[] = [];

                for (let x = gap / 2; x < canvas.width; x += gap) {
                    for (let y = gap / 2; y < canvas.height; y += gap) {
                        newPoints.push({
                            x,
                            y,
                            originalX: x,
                            originalY: y,
                        });
                    }
                }

                points.current = newPoints;
            };

            const render = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const threshold = 120;

                points.current.forEach((point) => {
                    const dx = mouse.current.x - point.originalX;
                    const dy = mouse.current.y - point.originalY;
                    const dist = Math.hypot(dx, dy);

                    let displayX = point.originalX;
                    let displayY = point.originalY;
                    let opacity = 0.3; // 增强基础可见度
                    let size = 1.5;    // 稍微大一点

                    if (dist < threshold) {
                        const force = (threshold - dist) / threshold;
                        displayX += dx * force * 0.4;
                        displayY += dy * force * 0.4;
                        opacity = 0.4 + (force * 0.6);
                        size = 1.5 + (force * 3);

                        ctx.shadowBlur = 20 * force;
                        ctx.shadowColor = '#00f3ff';
                    } else {
                        ctx.shadowBlur = 0;
                    }

                    // 改用纯白色或非常亮的青色进行测试
                    ctx.fillStyle = dist < threshold ? `rgba(0, 243, 255, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;
                    ctx.beginPath();
                    ctx.arc(displayX, displayY, size, 0, Math.PI * 2);
                    ctx.fill();
                });

                requestAnimationFrame(render);
            };

            const handleMouseMove = (e: MouseEvent) => {
                const rect = canvas.getBoundingClientRect()
                mouse.current.x = e.clientX - rect.left
                mouse.current.y = e.clientY - rect.top
            }

            const handleMouseLeave = () => {
                mouse.current.x = -1000;
                mouse.current.y = -1000;
            };

            window.addEventListener('resize', initCanvas);
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseleave', handleMouseLeave);

            // 延迟初始化，确保容器尺寸已稳定
            const timer = setTimeout(() => {
                initCanvas();
                console.log('Canvas initialized, points count:', points.current.length);
            }, 100);

            const animId = requestAnimationFrame(render);

            return () => {
                clearTimeout(timer);
                window.removeEventListener('resize', initCanvas);
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseleave', handleMouseLeave);
                cancelAnimationFrame(animId);
            };
        },
        [],
    )

    return (
        <div className="playground-container">
            <canvas ref={canvasRef} className="grid-canvas" />
            <div className="ui-overlay">
                <h2>交互实验</h2>
                <p>可视化网格交互演示 v1.0</p>
            </div>
        </div>
    )
}

export default PlayGround
