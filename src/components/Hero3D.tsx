import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowDown, Sparkles, Sliders, RotateCw, Eye } from 'lucide-react';
import { HERO_EDITORIAL_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';

export const Hero3D: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();
  const canvasMountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const [activeMood, setActiveMood] = useState<'neon' | 'cyber' | 'noir' | 'champagne'>('neon');
  const [showControls, setShowControls] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const activeMoodRef = useRef(activeMood);
  activeMoodRef.current = activeMood;
  const isRotatingRef = useRef(isRotating);
  isRotatingRef.current = isRotating;

  useEffect(() => {
    const mount = canvasMountRef.current;
    if (!mount) return;

    // Detect WebGL capability safely
    let isSoftwareGl = false;
    try {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : (gl as any).RENDERER;
      const gpu = String(gl.getParameter(param) || '');
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      isSoftwareGl = false;
    }

    // Three.js Scene Setup
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b12, 0.045);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      mount.appendChild(renderer.domElement);
    } catch (e) {
      console.warn('WebGL init failed:', e);
      setWebGlSupported(false);
      return;
    }

    // Lighting Rig (3-point high-contrast fashion studio lighting)
    const ambientLight = new THREE.AmbientLight(0x1a1a2e, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x8b5cf6, 0x111c3a, 1.5);
    scene.add(hemiLight);

    // Dynamic Mood Lights
    const blueRimLight = new THREE.DirectionalLight(0x315cff, 3.5);
    blueRimLight.position.set(-5, 4, 3);
    scene.add(blueRimLight);

    const purpleKeyLight = new THREE.DirectionalLight(0x8b5cf6, 4.0);
    purpleKeyLight.position.set(5, -2, 4);
    scene.add(purpleKeyLight);

    const backRimLight = new THREE.PointLight(0x00f0ff, 2.5, 20);
    backRimLight.position.set(0, 5, -3);
    scene.add(backRimLight);

    // Fashion 3D Sculpture Group
    const fashionSculptureGroup = new THREE.Group();
    scene.add(fashionSculptureGroup);

    // 1. Primary Fabric Ribbon / Mobius Draped Form (TorusKnotGeometry)
    const ribbonGeo = new THREE.TorusKnotGeometry(1.6, 0.38, 128, 32, 2, 3);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x8b5cf6,
      emissive: 0x110e2e,
      roughness: 0.18,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeo, ribbonMat);
    fashionSculptureGroup.add(ribbonMesh);

    // 2. Secondary Kinetic Orbit Ring (Beveled Torus)
    const ringGeo1 = new THREE.TorusGeometry(2.4, 0.045, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x315cff,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: false
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    fashionSculptureGroup.add(ringMesh1);

    // 3. Floating Accent Spheres & Minimal Disc Sculptures
    const ringGeo2 = new THREE.TorusGeometry(2.7, 0.025, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.2
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    fashionSculptureGroup.add(ringMesh2);

    // Floating fashion accent orbs
    const orbGroup = new THREE.Group();
    const orbGeo = new THREE.SphereGeometry(0.12, 24, 24);
    const orbMat = new THREE.MeshPhysicalMaterial({
      color: 0x315cff,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1
    });

    const orbPositions = [
      [-2.1, 1.4, 0.8],
      [2.3, -1.2, 0.5],
      [-1.4, -2.0, -0.6],
      [1.8, 2.2, -0.7]
    ];
    orbPositions.forEach(([x, y, z]) => {
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(x, y, z);
      orbGroup.add(orb);
    });
    fashionSculptureGroup.add(orbGroup);

    // 4. Ambient Stardust / Particle Field (Instanced Particles)
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 8;
      scales[i / 3] = Math.random() * 0.05 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Movement Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x * 0.6;
      mouseY = y * 0.4;
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const render = () => {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX = THREE.MathUtils.damp(targetX, mouseX, 3.5, delta);
      targetY = THREE.MathUtils.damp(targetY, mouseY, 3.5, delta);

      // Auto-rotation & kinetic breathing
      if (isRotatingRef.current) {
        fashionSculptureGroup.rotation.y += delta * 0.45;
        fashionSculptureGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.15;
      }

      fashionSculptureGroup.position.x = targetX * 1.5;
      fashionSculptureGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.18 + targetY * 1.0;

      ringMesh1.rotation.z += delta * 0.3;
      ringMesh2.rotation.x += delta * 0.25;
      orbGroup.rotation.y -= delta * 0.4;

      // Update mood colors smoothly
      const current = activeMoodRef.current;
      if (current === 'cyber') {
        ribbonMat.color.lerp(new THREE.Color(0x315cff), delta * 4);
        purpleKeyLight.color.lerp(new THREE.Color(0x00f0ff), delta * 4);
      } else if (current === 'noir') {
        ribbonMat.color.lerp(new THREE.Color(0x27272a), delta * 4);
        purpleKeyLight.color.lerp(new THREE.Color(0xffffff), delta * 4);
      } else if (current === 'champagne') {
        ribbonMat.color.lerp(new THREE.Color(0xd4af37), delta * 4);
        purpleKeyLight.color.lerp(new THREE.Color(0xffe8b3), delta * 4);
      } else {
        // 'neon'
        ribbonMat.color.lerp(new THREE.Color(0x8b5cf6), delta * 4);
        purpleKeyLight.color.lerp(new THREE.Color(0x8b5cf6), delta * 4);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      ribbonGeo.dispose();
      ribbonMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      orbGeo.dispose();
      orbMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  const scrollToTrending = () => {
    const el = document.getElementById('trending-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExplore = () => {
    setCurrentView('shop');
    setSelectedCategory('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewArrivals = () => {
    setCurrentView('shop');
    setSelectedCategory('Streetwear');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full min-h-[92vh] lg:min-h-screen bg-gradient-to-b from-[#0B0B12] via-[#0D1022] to-[#111C3A] text-white overflow-hidden flex flex-col justify-between pt-24 pb-12">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#315CFF]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-[#8B5CF6]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-[#315CFF]/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Pattern Overlay for subtle futuristic depth */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      {/* 3D WebGL Canvas Layer */}
      <div
        ref={canvasMountRef}
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'pan-y' }}
      />

      {/* Static Fallback if WebGL is unavailable */}
      {!webGlSupported && (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
          <img
            src={HERO_EDITORIAL_IMAGE}
            alt="Trendy Collection Fallback"
            className="w-full h-full object-cover filter brightness-75 contrast-125"
          />
        </div>
      )}

      {/* Main Content Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 space-y-6 pt-4 lg:pt-0">
            {/* Promotional pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111C3A]/80 border border-[#315CFF]/40 backdrop-blur-md text-xs font-semibold tracking-wider text-[#A5B4FC]">
              <Sparkles className="w-3.5 h-3.5 text-[#315CFF]" />
              <span>THE NEW SEASON / 2026 DROP</span>
              <span className="text-white/40">|</span>
              <span className="text-white font-mono">EDITION 04</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95] text-white">
                WEAR YOUR <br />
                <span className="bg-gradient-to-r from-[#FFFFFF] via-[#A5B4FC] to-[#8B5CF6] bg-clip-text text-transparent">
                  FUTURE.
                </span>
              </h1>
            </div>

            {/* Supporting Headline */}
            <p className="text-base sm:text-xl text-[#F1EDFF]/85 max-w-xl font-normal leading-relaxed">
              Discover the next generation of everyday fashion. Bold essentials. Fresh silhouettes. 
              Your own identity. Tailored in high-density textiles with architectural precision.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleExplore}
                className="px-8 py-4 rounded-xl bg-[#315CFF] hover:bg-[#2548DB] text-white font-bold tracking-wide transition-all duration-300 shadow-lg shadow-[#315CFF]/30 hover:shadow-[#315CFF]/50 active:scale-95 cursor-pointer text-sm sm:text-base flex items-center gap-2"
              >
                EXPLORE COLLECTION
              </button>
              <button
                onClick={handleNewArrivals}
                className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold tracking-wide border border-white/20 backdrop-blur-md transition-all duration-300 hover:border-white/40 active:scale-95 cursor-pointer text-sm sm:text-base"
              >
                SHOP NEW ARRIVALS
              </button>
            </div>

            {/* Key stats row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">32+</p>
                <p className="text-xs uppercase tracking-wider text-[#A5B4FC]">Curated Drops</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">100%</p>
                <p className="text-xs uppercase tracking-wider text-[#A5B4FC]">Authentic Cottons</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">4.9/5</p>
                <p className="text-xs uppercase tracking-wider text-[#A5B4FC]">Customer Love</p>
              </div>
            </div>
          </div>

          {/* Right Column: Real Fashion Model Editorial Card Complemented by the 3D Experience */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group max-w-xs sm:max-w-sm w-full">
              {/* Decorative Accent Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#315CFF] to-[#8B5CF6] opacity-40 blur-lg group-hover:opacity-60 transition duration-500" />
              
              {/* Editorial Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-[#0B0B12]/80 backdrop-blur-sm shadow-2xl">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={HERO_EDITORIAL_IMAGE}
                    alt="Trendy Collection Signature Look"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12] via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-semibold text-white tracking-widest uppercase">
                    Editorial Look 01
                  </div>

                  {/* 3D Canvas Notice */}
                  <div className="absolute top-4 right-4 bg-[#315CFF]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white tracking-wider flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>3D KINETIC</span>
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <p className="text-xs text-[#A5B4FC] font-mono uppercase tracking-widest">Metropolis Edition</p>
                    <p className="text-base font-bold text-white">Tailored Vest & Sculpted Trouser</p>
                    <div className="flex items-center justify-between mt-1 text-sm">
                      <span className="font-extrabold text-white">৳ 7,400</span>
                      <button 
                        onClick={handleExplore}
                        className="text-xs text-[#315CFF] font-semibold hover:text-white transition-colors"
                      >
                        View Style &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parallax Floating Badge */}
              <div className="absolute -bottom-5 -left-5 bg-[#111C3A] border border-white/20 rounded-xl px-4 py-2.5 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#8B5CF6]/30 border border-[#8B5CF6] flex items-center justify-center text-[#8B5CF6] font-bold text-xs">
                  TC
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">Interaction</p>
                  <p className="text-xs font-bold text-white">Drag or Move Mouse to Tilt 3D Scene</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Area: Collapsible 3D Control Dock + Scroll Down Indicator */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full flex flex-col items-center justify-center pt-8">
        
        {/* Toggleable Bottom Dock */}
        <div className="w-full max-w-xl flex flex-col items-center">
          <button
            onClick={() => setShowControls(!showControls)}
            className="mb-2 text-xs font-semibold text-[#A5B4FC] hover:text-white flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showControls ? 'Hide 3D Studio Dock' : 'Customize 3D Sculpture & Mood'}</span>
          </button>

          {showControls && (
            <div className="w-full bg-[#111C3A]/90 border border-white/15 rounded-2xl p-3 backdrop-blur-xl shadow-2xl flex flex-wrap items-center justify-between gap-3 text-xs animate-in fade-in duration-300">
              <div className="flex items-center gap-1.5">
                <span className="text-gray-400 uppercase tracking-wider font-mono mr-1">Mood:</span>
                {(['neon', 'cyber', 'noir', 'champagne'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setActiveMood(m)}
                    className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all ${
                      activeMood === m
                        ? 'bg-[#315CFF] text-white shadow-md'
                        : 'bg-white/5 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg font-medium transition-colors ${
                    isRotating ? 'bg-[#8B5CF6]/30 text-[#C4B5FD] border border-[#8B5CF6]/50' : 'bg-white/5 text-gray-400'
                  }`}
                >
                  <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                  <span>{isRotating ? 'Auto-Orbit On' : 'Paused'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center mt-4">
          <button
            onClick={scrollToTrending}
            className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-[11px] uppercase tracking-widest font-mono text-[#A5B4FC]">Explore Drops</span>
            <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#315CFF] group-hover:bg-[#315CFF]/20 transition-all">
              <ArrowDown className="w-3.5 h-3.5 text-white/80 group-hover:text-white group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>

      </div>
    </div>
  );
};
