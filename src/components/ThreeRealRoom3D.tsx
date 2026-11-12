import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeRealRoom3DProps {
  height?: number | string;
  activeService?: 'bedroom' | 'kitchen' | 'living' | 'office';
  onServiceSelect?: (service: 'bedroom' | 'kitchen' | 'living' | 'office') => void;
  showControls?: boolean;
}

// Module-scope reusable math vectors (Three.js zero-GC directive)
const _camTarget = new THREE.Vector3(0, 0.4, 0);
const _mouseTarget = new THREE.Vector2(0, 0);

// Helper to create procedural wood texture
function createWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#C89A58';
  ctx.fillRect(0, 0, 512, 512);

  // Planks
  const plankH = 32;
  for (let y = 0; y < 512; y += plankH) {
    ctx.strokeStyle = '#8B5A2B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();

    // Wood grain lines
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = i % 2 === 0 ? 'rgba(120, 70, 20, 0.15)' : 'rgba(230, 180, 110, 0.15)';
      ctx.fillRect(0, y + (i * plankH) / 4, 512, plankH / 4);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Helper to create marble texture
function createMarbleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#F4F4F2';
  ctx.fillRect(0, 0, 512, 512);

  // Marble veining
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 8; i++) {
    ctx.strokeStyle = i % 2 === 0 ? 'rgba(180, 140, 80, 0.35)' : 'rgba(130, 130, 135, 0.3)';
    ctx.beginPath();
    let x = (i * 70) % 512;
    let y = 0;
    ctx.moveTo(x, y);
    while (y < 512) {
      x += (Math.random() - 0.48) * 45;
      y += 35 + Math.random() * 20;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.5, 1.5);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Helper to create raw concrete texture
function createConcreteTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#A8A8A4';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 400; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const s = Math.random() * 2.5;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(70, 70, 70, 0.15)' : 'rgba(210, 210, 210, 0.18)';
    ctx.fillRect(x, y, s, s);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const ThreeRealRoom3D: React.FC<ThreeRealRoom3DProps> = ({
  height = 240,
  activeService = 'bedroom',
  onServiceSelect,
  showControls = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [currentService, setCurrentService] = useState<'bedroom' | 'kitchen' | 'living' | 'office'>(activeService);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.6); // Fast brisk motion
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [transformState, setTransformState] = useState<'empty' | 'transitioning' | 'luxury'>('luxury');
  const [morphValue, setMorphValue] = useState<number>(1.0);

  // Sync prop changes
  useEffect(() => {
    if (activeService) {
      setCurrentService(activeService);
    }
  }, [activeService]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 400;
    const h = container.clientHeight || (typeof height === 'number' ? height : 240);

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF1F3F5);

    const camera = new THREE.PerspectiveCamera(42, width / h, 0.1, 50);
    camera.position.set(0, 1.8, 4.4);
    camera.lookAt(_camTarget);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setSize(width, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // --- Studio Lighting Rig ---
    const ambientLight = new THREE.AmbientLight(0xfff7ee, 1.05);
    scene.add(ambientLight);

    const keySunlight = new THREE.DirectionalLight(0xffedd5, 1.8);
    keySunlight.position.set(3.5, 4.5, 3.0);
    keySunlight.castShadow = true;
    keySunlight.shadow.mapSize.width = 1024;
    keySunlight.shadow.mapSize.height = 1024;
    keySunlight.shadow.bias = -0.0005;
    scene.add(keySunlight);

    // Warm architectural recessed ceiling spots
    const warmCeilingSpot = new THREE.PointLight(0xffb84d, 1.5, 9, 1.2);
    warmCeilingSpot.position.set(0, 2.4, 0.5);
    scene.add(warmCeilingSpot);

    // --- Procedural Textures ---
    const woodTex = createWoodTexture();
    const marbleTex = createMarbleTexture();
    const concreteTex = createConcreteTexture();

    // --- Room Shell Meshes ---
    const roomWidth = 7.0;
    const roomHeight = 3.6;
    const roomDepth = 6.2;

    // Floor Mesh
    const floorGeo = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const floorMat = new THREE.MeshStandardMaterial({
      roughness: 0.25,
      metalness: 0.05,
      map: woodTex
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.01;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Ceiling Mesh
    const ceilingGeo = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0xFAF8F5,
      roughness: 0.95
    });
    const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.y = roomHeight;
    scene.add(ceilingMesh);

    // Back Wall
    const backWallGeo = new THREE.PlaneGeometry(roomWidth, roomHeight);
    const backWallMat = new THREE.MeshStandardMaterial({
      color: 0xFDFBF7,
      roughness: 0.85
    });
    const backWall = new THREE.Mesh(backWallGeo, backWallMat);
    backWall.position.set(0, roomHeight / 2, -roomDepth / 2);
    backWall.receiveShadow = true;
    scene.add(backWall);

    // Fluted Wood / Marble Accent Wall Feature in Center Back
    const accentGeo = new THREE.BoxGeometry(3.6, roomHeight * 0.9, 0.08);
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x8C5627,
      roughness: 0.4,
      metalness: 0.1
    });
    const accentWall = new THREE.Mesh(accentGeo, accentMat);
    accentWall.position.set(0, roomHeight * 0.45, -roomDepth / 2 + 0.05);
    accentWall.receiveShadow = true;
    scene.add(accentWall);

    // Left Wall
    const sideWallGeo = new THREE.PlaneGeometry(roomDepth, roomHeight);
    const sideWallMat = new THREE.MeshStandardMaterial({
      color: 0xF5F2EB,
      roughness: 0.9
    });
    const leftWall = new THREE.Mesh(sideWallGeo, sideWallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-roomWidth / 2, roomHeight / 2, 0);
    leftWall.receiveShadow = true;
    scene.add(leftWall);

    // Right Wall with Architectural Window Cutout / Glass Frame
    const rightWall = new THREE.Mesh(sideWallGeo, sideWallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(roomWidth / 2, roomHeight / 2, 0);
    rightWall.receiveShadow = true;
    scene.add(rightWall);


    // Window Frame on Right Wall
    const winGroup = new THREE.Group();
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.3 });
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xCDE5F8,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.45
    });
    const winFrame = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.0, 2.6), frameMat);
    const winGlass = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.9, 2.5), glassMat);
    winGroup.add(winFrame, winGlass);
    winGroup.position.set(roomWidth / 2 - 0.03, 1.6, 0.2);
    scene.add(winGroup);

    // Baseboards along back wall
    const baseboardMat = new THREE.MeshStandardMaterial({ color: 0x4A2E16, roughness: 0.5 });
    const baseboard = new THREE.Mesh(new THREE.BoxGeometry(roomWidth, 0.14, 0.04), baseboardMat);
    baseboard.position.set(0, 0.07, -roomDepth / 2 + 0.02);
    scene.add(baseboard);

    // --- SERVICE FURNITURE GROUPS ---
    // 1. Bedroom Group
    const bedroomGroup = new THREE.Group();
    // Bed Base Platform
    const bedBaseMat = new THREE.MeshStandardMaterial({ color: 0x5C381E, roughness: 0.4 });
    const bedBase = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.35, 2.3), bedBaseMat);
    bedBase.position.set(0, 0.175, -0.6);
    bedBase.castShadow = true;
    bedBase.receiveShadow = true;

    // Mattress
    const mattressMat = new THREE.MeshStandardMaterial({ color: 0xF7F5F0, roughness: 0.85 });
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.32, 2.15), mattressMat);
    mattress.position.set(0, 0.45, -0.6);
    mattress.castShadow = true;

    // Headboard
    const headboardMat = new THREE.MeshStandardMaterial({ color: 0xD8C3A5, roughness: 0.65 });
    const headboard = new THREE.Mesh(new THREE.BoxGeometry(2.3, 1.1, 0.18), headboardMat);
    headboard.position.set(0, 0.8, -1.7);
    headboard.castShadow = true;

    // Duvet / Quilt
    const duvetMat = new THREE.MeshStandardMaterial({ color: 0xEAE4D8, roughness: 0.8 });
    const duvet = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.18, 1.4), duvetMat);
    duvet.position.set(0, 0.55, -0.2);

    // Pillows
    const pillowMat = new THREE.MeshStandardMaterial({ color: 0xC49A45, roughness: 0.7 });
    const pillowL = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.15, 0.45), pillowMat);
    pillowL.position.set(-0.5, 0.65, -1.25);
    pillowL.rotation.x = -0.2;
    const pillowR = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.15, 0.45), pillowMat);
    pillowR.position.set(0.5, 0.65, -1.25);
    pillowR.rotation.x = -0.2;

    // Nightstands & Glowing Orb Lamps
    const standMat = new THREE.MeshStandardMaterial({ color: 0x3E2714, roughness: 0.4 });
    const lampMat = new THREE.MeshStandardMaterial({
      color: 0xFFF0D0,
      emissive: 0xFFA020,
      emissiveIntensity: 0.75,
      roughness: 0.2
    });

    const standL = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.45, 0.45), standMat);
    standL.position.set(-1.45, 0.225, -1.4);
    standL.castShadow = true;
    const lampL = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), lampMat);
    lampL.position.set(-1.45, 0.6, -1.4);

    const standR = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.45, 0.45), standMat);
    standR.position.set(1.45, 0.225, -1.4);
    standR.castShadow = true;
    const lampR = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 16), lampMat);
    lampR.position.set(1.45, 0.6, -1.4);

    bedroomGroup.add(bedBase, mattress, headboard, duvet, pillowL, pillowR, standL, lampL, standR, lampR);
    scene.add(bedroomGroup);

    // 2. Kitchen Group
    const kitchenGroup = new THREE.Group();
    // Central Quartz Island
    const islandCounterMat = new THREE.MeshStandardMaterial({
      color: 0xFAFAFA,
      roughness: 0.18,
      metalness: 0.1,
      map: marbleTex
    });
    const island = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 1.2), islandCounterMat);
    island.position.set(0, 0.45, -0.2);
    island.castShadow = true;
    island.receiveShadow = true;

    // Overhead Modern Cabinets along Back Wall
    const cabinetMat = new THREE.MeshStandardMaterial({ color: 0x2A2D34, roughness: 0.35 });
    const upperCabinets = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.75, 0.45), cabinetMat);
    upperCabinets.position.set(0, 2.2, -roomDepth / 2 + 0.25);
    upperCabinets.castShadow = true;

    // Back Counter & Sink
    const backCounter = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.9, 0.65), cabinetMat);
    backCounter.position.set(0, 0.45, -roomDepth / 2 + 0.35);
    backCounter.castShadow = true;

    // Brass Island Stools
    const stoolMat = new THREE.MeshStandardMaterial({ color: 0xC49A45, metalness: 0.8, roughness: 0.2 });
    const stoolSeatMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.6 });
    const stool1 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.6, 16), stoolSeatMat);
    stool1.position.set(-0.6, 0.3, 0.7);
    const stool2 = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.6, 16), stoolSeatMat);
    stool2.position.set(0.6, 0.3, 0.7);

    // Chimney Hood
    const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.5), stoolMat);
    chimney.position.set(0, 2.1, -roomDepth / 2 + 0.4);

    kitchenGroup.add(island, upperCabinets, backCounter, stool1, stool2, chimney);
    kitchenGroup.visible = false;
    scene.add(kitchenGroup);

    // 3. Living Room Group
    const livingGroup = new THREE.Group();
    // Curved Boucle Sectional Sofa
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0xEBE6DD, roughness: 0.85 });
    const sofaBase = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.45, 1.1), sofaMat);
    sofaBase.position.set(0, 0.225, -0.6);
    sofaBase.castShadow = true;

    const sofaBack = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.55, 0.35), sofaMat);
    sofaBack.position.set(0, 0.65, -1.0);
    sofaBack.castShadow = true;

    // Coffee Tables (Marble & Gold)
    const tableTopMat = new THREE.MeshStandardMaterial({ color: 0xFDFDFD, roughness: 0.15, map: marbleTex });
    const table1 = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.35, 24), tableTopMat);
    table1.position.set(-0.35, 0.175, 0.45);
    table1.castShadow = true;

    const table2 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.28, 24), stoolMat);
    table2.position.set(0.35, 0.14, 0.6);
    table2.castShadow = true;

    // Modern Arched Floor Lamp
    const lampStem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.8, 12), stoolMat);
    lampStem.position.set(-1.6, 0.9, -0.7);
    const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.3, 16), lampMat);
    lampShade.position.set(-1.4, 1.7, -0.5);

    livingGroup.add(sofaBase, sofaBack, table1, table2, lampStem, lampShade);
    livingGroup.visible = false;
    scene.add(livingGroup);

    // 4. Commercial Office Group
    const officeGroup = new THREE.Group();
    // Executive Veneer Desk
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x422B18, roughness: 0.3 });
    const desk = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.75, 1.1), deskMat);
    desk.position.set(0, 0.375, -0.5);
    desk.castShadow = true;

    // Executive Chair
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x1A1A1A, roughness: 0.45 });
    const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.8, 0.15), chairMat);
    chairBack.position.set(0, 0.8, -1.25);
    const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.12, 0.6), chairMat);
    chairSeat.position.set(0, 0.45, -1.05);

    // Dual Monitors on Desk
    const monMat = new THREE.MeshStandardMaterial({ color: 0x0A0A0A, roughness: 0.1 });
    const monScreenMat = new THREE.MeshStandardMaterial({
      color: 0x3B82F6,
      emissive: 0x1E40AF,
      emissiveIntensity: 0.45
    });
    const mon1 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.03), monScreenMat);
    mon1.position.set(-0.35, 0.95, -0.4);
    const mon2 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.03), monScreenMat);
    mon2.position.set(0.35, 0.95, -0.4);

    officeGroup.add(desk, chairBack, chairSeat, mon1, mon2);
    officeGroup.visible = false;
    scene.add(officeGroup);

    // Interactive pointer parallax
    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const rect = container.getBoundingClientRect();
      _mouseTarget.x = ((clientX - rect.left) / rect.width - 0.5) * 2;
      _mouseTarget.y = ((clientY - rect.top) / rect.height - 0.5) * 2;
    };

    container.addEventListener('mousemove', onPointerMove);
    container.addEventListener('touchmove', onPointerMove, { passive: true });

    // --- ANIMATION & 3D SMOOTH TRANSITION LOOP ---
    let frameId = 0;
    const startTime = performance.now();
    let lastTime = performance.now();

    // Transition variables
    let currentProgress = 1.0;
    let targetProgress = 1.0;
    let autoCycleTime = 0;
    const servicesList: ('bedroom' | 'kitchen' | 'living' | 'office')[] = ['bedroom', 'kitchen', 'living', 'office'];
    let serviceIdx = servicesList.indexOf(currentService);
    if (serviceIdx === -1) serviceIdx = 0;

    const renderLoop = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const elapsed = (now - startTime) / 1000;


      // Smooth camera gentle pan + pointer parallax
      const targetCamX = Math.sin(elapsed * 0.35) * 0.45 + _mouseTarget.x * 0.3;
      const targetCamY = 1.7 + Math.cos(elapsed * 0.25) * 0.15 - _mouseTarget.y * 0.2;
      const targetCamZ = 4.3 + Math.sin(elapsed * 0.2) * 0.25;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 4.0, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 4.0, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 4.0, delta);
      camera.lookAt(_camTarget);

      // Auto-running brisk transformation cycle
      if (!isPaused) {
        autoCycleTime += delta * speedMultiplier;
        // Cycle every 3.8 seconds:
        // 0.0 to 1.8s: Finished Luxury Suite
        // 1.8 to 2.8s: Smooth 3D Transition down to Empty Raw Room
        // 2.8 to 3.8s: Smooth 3D Build Transition up into next Luxury Service!
        const cyclePeriod = 3.6;
        const cycleTime = autoCycleTime % cyclePeriod;

        if (cycleTime < 1.8) {
          // Luxury State
          targetProgress = 1.0;
        } else if (cycleTime < 2.5) {
          // Transitioning down to Empty Room
          const t = (cycleTime - 1.8) / 0.7;
          targetProgress = 1.0 - t;
        } else {
          // Transitioning up to next finished room
          const t = (cycleTime - 2.5) / 1.1;
          targetProgress = t;
        }

        // Detect wrap-around to switch service
        const currentPeriodIdx = Math.floor(autoCycleTime / cyclePeriod);
        const newServiceIdx = currentPeriodIdx % servicesList.length;
        if (newServiceIdx !== serviceIdx) {
          serviceIdx = newServiceIdx;
          const nextService = servicesList[serviceIdx];
          setCurrentService(nextService);
        }
      }

      // Smooth exponential damping on 3D transformation progress
      currentProgress = THREE.MathUtils.damp(currentProgress, targetProgress, 7.0, delta);
      setMorphValue(currentProgress);

      if (currentProgress < 0.2) {
        setTransformState('empty');
      } else if (currentProgress > 0.85) {
        setTransformState('luxury');
      } else {
        setTransformState('transitioning');
      }

      // 3D Physical Object Transformation:
      // When progress is 0: Empty Room (furniture lowers through floor or scales to zero, floor becomes raw concrete)
      // When progress is 1: Finished Luxury Room (furniture rises with bounce, warm lighting glows, floor is luxury wood/marble)
      const currentGroup =
        currentService === 'bedroom'
          ? bedroomGroup
          : currentService === 'kitchen'
          ? kitchenGroup
          : currentService === 'living'
          ? livingGroup
          : officeGroup;

      bedroomGroup.visible = currentService === 'bedroom';
      kitchenGroup.visible = currentService === 'kitchen';
      livingGroup.visible = currentService === 'living';
      officeGroup.visible = currentService === 'office';

      // 3D furniture vertical morph
      currentGroup.position.y = (currentProgress - 1.0) * 1.5;
      currentGroup.scale.set(
        Math.max(0.01, currentProgress),
        Math.max(0.01, currentProgress),
        Math.max(0.01, currentProgress)
      );

      // Floor material morph (interp between raw concrete and luxury finish)
      if (currentService === 'kitchen' || currentService === 'living') {
        floorMat.map = currentProgress > 0.4 ? marbleTex : concreteTex;
        floorMat.color.setHex(currentProgress > 0.4 ? 0xFFFFFF : 0xAAAAAA);
      } else {
        floorMat.map = currentProgress > 0.4 ? woodTex : concreteTex;
        floorMat.color.setHex(currentProgress > 0.4 ? 0xFFFFFF : 0xAAAAAA);
      }
      floorMat.needsUpdate = true;

      // Accent wall illumination
      accentWall.scale.y = Math.max(0.05, currentProgress);
      warmCeilingSpot.intensity = 0.3 + currentProgress * 1.3;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderLoop);
    };

    frameId = requestAnimationFrame(renderLoop);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 400;
      const newH = container.clientHeight || (typeof height === 'number' ? height : 240);
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH, false);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', onPointerMove);
      container.removeEventListener('touchmove', onPointerMove);
      cancelAnimationFrame(frameId);

      // Resource cleanup
      floorGeo.dispose();
      floorMat.dispose();
      ceilingGeo.dispose();
      ceilingMat.dispose();
      backWallGeo.dispose();
      backWallMat.dispose();
      accentGeo.dispose();
      accentMat.dispose();
      sideWallGeo.dispose();
      sideWallMat.dispose();
      woodTex.dispose();
      marbleTex.dispose();
      concreteTex.dispose();
      renderer.dispose();

    };
  }, [currentService, height, isPaused, speedMultiplier]);

  const handleSelectService = (s: 'bedroom' | 'kitchen' | 'living' | 'office') => {
    setCurrentService(s);
    if (onServiceSelect) onServiceSelect(s);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-slate-900 select-none group"
      style={{ height: typeof height === 'number' ? `${height}px` : height }}
    >
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />

      {/* Top 3D Status Overlay */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/65 backdrop-blur-md border border-white/15 text-white">
          <div
            className={`w-2 h-2 rounded-full ${
              transformState === 'luxury'
                ? 'bg-amber-400 ring-2 ring-amber-400/40'
                : transformState === 'empty'
                ? 'bg-slate-400 ring-2 ring-slate-400/40'
                : 'bg-emerald-400 ring-2 ring-emerald-400/40'
            }`}
          />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">
            {transformState === 'luxury'
              ? '3D Luxury Architectural Finish'
              : transformState === 'empty'
              ? '3D Raw Bare Space'
              : 'Smooth 3D Transforming...'}
          </span>
        </div>

        <div className="flex items-center gap-1 pointer-events-auto">
          <button
            type="button"
            onClick={() => setSpeedMultiplier((prev) => (prev >= 2.2 ? 1.0 : prev + 0.6))}
            className="px-2 py-0.5 rounded bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-bold text-amber-300"
            title="Toggle 3D transition speed"
          >
            {speedMultiplier > 2.0 ? '2.2x Fast' : speedMultiplier > 1.4 ? '1.6x Brisk' : '1.0x Normal'}
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            className="px-2 py-0.5 rounded bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white"
          >
            {isPaused ? '▶ Play' : '⏸ Pause'}
          </button>
        </div>
      </div>

      {/* Bottom Transformation Scrubber & Service Switcher */}
      {showControls && (
        <div className="absolute bottom-3 left-3 right-3 z-10 space-y-1.5 pointer-events-auto">
          {/* Progress Indicator Bar */}
          <div className="w-full h-1 bg-black/50 backdrop-blur-md rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-75"
              style={{ width: `${Math.round(morphValue * 100)}%` }}
            />
          </div>

          {/* Service Selector Tabs */}
          <div className="flex items-center justify-between gap-1 p-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/15">
            {(
              [
                { id: 'bedroom', label: '🛏️ Bedroom' },
                { id: 'kitchen', label: '🍳 Kitchen' },
                { id: 'living', label: '🛋️ Living' },
                { id: 'office', label: '🏢 Office' }
              ] as const
            ).map((s) => {
              const isActive = currentService === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectService(s.id)}
                  className={`flex-1 py-1 px-1.5 rounded-lg text-[10px] font-bold transition-all text-center ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
