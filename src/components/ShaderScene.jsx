import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

// 首屏 3D 渐变球体。体积较大（three.js），在 Home 中以 React.lazy 延迟加载，
// 加载期间由 CSS 兜底渐变（.shader-fallback）占位，避免阻塞首屏渲染。
export default function ShaderScene() {
  return (
    <ShaderGradientCanvas style={{ position: 'absolute', inset: 0 }} pixelDensity={1.5} fov={45}>
      <ShaderGradient
        animate="on" brightness={1.1} cAzimuthAngle={0} cDistance={7.1}
        cPolarAngle={140} cameraZoom={17.3}
        color1="#ffffff" color2="#ffbb00" color3="#0700ff"
        envPreset="city" grain="off" lightType="3d" reflection={0.1}
        shader="defaults" type="sphere"
        uAmplitude={1.4} uDensity={1.1} uFrequency={5.5}
        uSpeed={0.1} uStrength={1} uTime={0}
        wireframe={false} enableTransition={true}
      />
    </ShaderGradientCanvas>
  )
}
