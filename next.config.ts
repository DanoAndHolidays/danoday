import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 暂时注释掉 basePath 以便于本地开发直接访问 localhost:3000
  // basePath: '/danoday',
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 由于项目使用了大量 Three.js 和 Framer Motion，
  // 某些第三方库可能需要转译
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei', 'postprocessing'],
}

export default nextConfig