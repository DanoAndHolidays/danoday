import React from 'react'
import {
  EffectComposer,
  Bloom,
  Noise,
  Scanline,
  ChromaticAberration,
  Vignette,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

const PostProcessing: React.FC = () => {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.SCREEN}
      />
      <Noise opacity={0.05} />
      <Scanline density={2} opacity={0.1} blendFunction={BlendFunction.OVERLAY} />
      <ChromaticAberration
        offset={new THREE.Vector2(0.002, 0.002)}
        blendFunction={BlendFunction.NORMAL}
      />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  )
}

// 注意：由于 ChromaticAberration 需要 THREE.Vector2，我们需要确保 THREE 在作用域内。
import * as THREE from 'three'

export default PostProcessing
