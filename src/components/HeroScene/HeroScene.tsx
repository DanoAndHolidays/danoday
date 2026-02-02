import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import PostProcessing from '../Effects/PostProcessing'

function ParticleField({ count = 2000, isVisible = true }) {
  const pointsRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])

  useFrame((state) => {
    if (!isVisible) return
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
      pointsRef.current.rotation.x += 0.0005

      // 让粒子根据鼠标产生轻微位移
      const { x, y } = state.mouse
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        x * 0.5,
        0.1,
      )
      pointsRef.current.position.y = THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        y * 0.5,
        0.1,
      )
    }
  })

  return (
    <Points ref={pointsRef} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ff8c00"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

function FloatingGeometry({ isVisible = true }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!isVisible) return
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      meshRef.current.rotation.x = Math.sin(time / 4)
      meshRef.current.rotation.y = Math.sin(time / 2)
      meshRef.current.position.y = Math.sin(time) * 0.2
    }
  })

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#ff8c00"
        wireframe
        transparent
        opacity={0.3}
        emissive="#ff8c00"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

const HeroScene: React.FC<{ isVisible?: boolean }> = ({ isVisible = true }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: -1,
        background: '#000000',
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ff8c00" />
        <ParticleField isVisible={isVisible} />
        <FloatingGeometry isVisible={isVisible} />
        {isVisible && <PostProcessing />}
      </Canvas>
    </div>
  )
}

export default HeroScene
