import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

export default function GradientBackground() {
  return (
    <div className="gradient-bg">
      <ShaderGradientCanvas
        style={{ position: 'absolute', inset: 0 }}
        pixelDensity={1}
        fov={45}
      >
        <ShaderGradient
          animate="on"
          brightness={1.2}
          cAzimuthAngle={0}
          cDistance={8.0}
          cPolarAngle={140}
          cameraZoom={15.0}
          color1="#ffffff"
          color2="#fafafa"
          color3="#eaeaea"
          envPreset="city"
          grain="on"
          lightType="3d"
          reflection={0.1}
          shader="defaults"
          type="sphere"
          uAmplitude={1.0}
          uDensity={0.8}
          uFrequency={4.0}
          uSpeed={0.05}
          uStrength={0.8}
          uTime={0}
          wireframe={false}
          enableTransition={true}
        />
      </ShaderGradientCanvas>
    </div>
  )
}
