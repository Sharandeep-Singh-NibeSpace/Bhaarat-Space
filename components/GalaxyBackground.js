"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

const PARAMS = {
  size: 0.012,
  radius: 5,
  branches: 4,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#ff6030",
  outsideColor: "#1b3984",
};

function GalaxyPoints({ count }) {
  const pointsRef = useRef();
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorInside = new THREE.Color(PARAMS.insideColor);
    const colorOutside = new THREE.Color(PARAMS.outsideColor);
    const { radius, branches, spin, randomness, randomnessPower } = PARAMS;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = Math.random() * radius;
      const spinAngle = r * spin;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const randomX =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;
      const randomY =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;
      const randomZ =
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      const mixed = colorInside.clone().lerp(colorOutside, r / radius);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }

    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={PARAMS.size}
        sizeAttenuation
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
        transparent
      />
    </points>
  );
}

const ZOOM_OUT = 18;
const ZOOM_IN = 4.05;

function CameraOrbit({ distance, scrollRef }) {
  const controlsRef = useRef();
  const { camera, gl } = useThree();
  const zoomT = useRef(0);

  useEffect(() => {
    const el = gl.domElement;
    el.style.cursor = "grab";
    const onDown = () => {
      el.style.cursor = "grabbing";
    };
    const onUp = () => {
      el.style.cursor = "grab";
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [gl]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    let dist = distance;
    if (scrollRef) {
      zoomT.current += (scrollRef.current - zoomT.current) * 0.06;
      dist = THREE.MathUtils.lerp(ZOOM_OUT, ZOOM_IN, zoomT.current);
    }
    controls.minDistance = dist;
    controls.maxDistance = dist;
    camera.position.setLength(dist);
    controls.target.set(0, 0, 0);
    controls.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={false}
      enableRotate
      enableDamping
      dampingFactor={0.05}
      autoRotate
      autoRotateSpeed={0.4}
      rotateSpeed={0.65}
      minPolarAngle={0.4}
      maxPolarAngle={1.35}
      makeDefault
    />
  );
}

function Scene({ isMobile, distance, scrollRef, transparent }) {
  const count = isMobile ? 25000 : 80000;
  const starCount = isMobile ? 2000 : 5000;

  return (
    <>
      {!transparent && <color attach="background" args={["#000000"]} />}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#ffffff" />
      {!transparent && (
        <Stars
          radius={300}
          depth={60}
          count={starCount}
          factor={7}
          saturation={0}
          fade
        />
      )}
      <GalaxyPoints count={count} />
      <CameraOrbit distance={distance} scrollRef={scrollRef} />
    </>
  );
}

export default function GalaxyBackground({
  distance = 6.4,
  scrollRef = null,
  transparent = false,
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    setReady(true);
    const onMq = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  const startPos = scrollRef
    ? isMobile
      ? [14, 7, 14]
      : [12, 6, 12]
    : isMobile
      ? [7, 3.5, 7]
      : [4.5, 2.2, 4.5];

  return (
    <div className={`absolute inset-0 ${transparent ? "" : "bg-black"}`}>
      {ready && (
        <Canvas
          camera={{
            position: startPos,
            fov: isMobile ? 72 : 75,
            near: 0.1,
            far: 1000,
          }}
          gl={{ antialias: true, alpha: transparent, premultipliedAlpha: true }}
          dpr={isMobile ? [1, 1] : [1, 2]}
          className="h-full w-full cursor-grab active:cursor-grabbing"
          style={{ background: "transparent" }}
        >
          <Scene
            isMobile={isMobile}
            distance={isMobile ? distance * 1.15 : distance}
            scrollRef={scrollRef}
            transparent={transparent}
          />
        </Canvas>
      )}
    </div>
  );
}
