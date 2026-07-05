"use client"

import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import {
  OrbitControls,
  ContactShadows,
  useGLTF,
  Environment,
  Lightformer,
} from "@react-three/drei"
import { Suspense, useMemo } from "react"

function Model() {
  const { scene } = useGLTF("/models/climaire.glb")

  const { root, displayY, rz, dispTex } = useMemo(() => {
    const root = scene.clone(true)

    const box = new THREE.Box3().setFromObject(root)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const scale = 3.0 / (size.y || 1)
    root.scale.setScalar(scale)
    root.position.set(-center.x * scale, -center.y * scale, -center.z * scale)

    const finalH = size.y * scale
    const minY = -finalH / 2
    const bandMin = minY + 0.13 * finalH
    const bandMax = minY + 0.37 * finalH
    const rz = (size.z * scale) / 2
    const displayY = minY + 0.07 * finalH

    const mat = new THREE.MeshStandardMaterial({
      color: "#eef0f2",
      metalness: 0.5,
      roughness: 0.42,
      envMapIntensity: 0.8,
    })
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uBandMin = { value: bandMin }
      shader.uniforms.uBandMax = { value: bandMax }
      shader.vertexShader =
        "varying vec3 vWPos;\n" +
        shader.vertexShader.replace(
          "#include <begin_vertex>",
          "#include <begin_vertex>\n vWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;"
        )
      shader.fragmentShader =
        "varying vec3 vWPos;\nuniform float uBandMin;\nuniform float uBandMax;\n" +
        shader.fragmentShader.replace(
          "#include <color_fragment>",
          `#include <color_fragment>
           if (vWPos.y > uBandMin && vWPos.y < uBandMax) {
             float ang = atan(vWPos.x, vWPos.z);
             vec2 g = vec2(fract(ang / 6.2831853 * 150.0),
                           fract((vWPos.y - uBandMin) * 46.0));
             float hole = 1.0 - smoothstep(0.18, 0.34, length(g - 0.5));
             vec3 metal = vec3(0.72, 0.74, 0.78);
             vec3 holeC = vec3(0.34, 0.36, 0.40);
             diffuseColor.rgb = mix(metal, holeC, hole);
           } else {
             diffuseColor.rgb = vec3(0.93, 0.94, 0.955);
           }`
        )
    }

    root.traverse((o) => {
      const m = o as THREE.Mesh
      if (!(m as any).isMesh) return
      m.material = mat
      m.castShadow = false
    })

    // Petit écran "08" — net, fond plein
    const c = document.createElement("canvas")
    c.width = 200
    c.height = 110
    const ctx = c.getContext("2d")!
    ctx.fillStyle = "#0b0f15"
    ctx.fillRect(0, 0, 200, 110)
    ctx.fillStyle = "#7fd4f0"
    ctx.font = "bold 60px monospace"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText("08", 100, 60)
    const dispTex = new THREE.CanvasTexture(c)

    return { root, displayY, rz, dispTex }
  }, [scene])

  return (
    <group>
      <primitive object={root} />
      {/* écran 08, posé à l'avant du corps */}
      <mesh position={[0, displayY, rz * 1.0]}>
        <planeGeometry args={[0.22, 0.12]} />
        <meshStandardMaterial
          map={dispTex}
          emissive="#0b0f15"
          emissiveIntensity={0.45}
          roughness={0.5}
        />
      </mesh>
    </group>
  )
}

const Fan3D = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 7, 6]} intensity={1.0} />

      <Suspense fallback={null}>
        <Model />
        {/* Studio procédural, reflets adoucis */}
        <Environment resolution={256}>
          <Lightformer
            form="rect"
            intensity={2}
            position={[0, 4, -6]}
            scale={[14, 10, 1]}
            color="#ffffff"
          />
          <Lightformer
            form="rect"
            intensity={1.3}
            position={[-6, 2, 2]}
            scale={[8, 8, 1]}
            rotation={[0, Math.PI / 4, 0]}
            color="#e8eeff"
          />
          <Lightformer
            form="rect"
            intensity={1.1}
            position={[6, 1, 3]}
            scale={[8, 8, 1]}
            rotation={[0, -Math.PI / 4, 0]}
            color="#ffffff"
          />
        </Environment>
        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.32}
          scale={6}
          blur={2.8}
          far={3}
          color="#000000"
        />
      </Suspense>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.9}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.85}
      />
    </Canvas>
  )
}

useGLTF.preload("/models/climaire.glb")

export default Fan3D
