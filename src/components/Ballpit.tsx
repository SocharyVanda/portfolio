import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  AmbientLight,
  Color,
  InstancedMesh,
  MathUtils,
  type MeshPhysicalMaterialParameters,
  MeshPhysicalMaterial,
  Object3D,
  OrthographicCamera,
  PMREMGenerator,
  PerspectiveCamera,
  Plane,
  PointLight,
  Raycaster,
  Scene,
  ShaderChunk,
  SphereGeometry,
  SRGBColorSpace,
  Timer,
  Vector2,
  Vector3,
  WebGLRenderer,
  type WebGLRendererParameters,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type Size = {
  width: number;
  height: number;
  wWidth: number;
  wHeight: number;
  ratio: number;
  pixelRatio: number;
};

type FrameData = { elapsed: number; delta: number };

type ThreeAppConfig = {
  canvas?: HTMLCanvasElement;
  id?: string;
  rendererOptions?: WebGLRendererParameters;
  size?: "parent" | { width: number; height: number };
};

type Postprocessing = {
  render: () => void;
  setSize?: (width: number, height: number) => void;
  dispose?: () => void;
};

class ThreeApp {
  #config: ThreeAppConfig;
  canvas!: HTMLCanvasElement;
  camera!: PerspectiveCamera | OrthographicCamera;
  cameraMinAspect?: number;
  cameraMaxAspect?: number;
  cameraFov?: number;
  maxPixelRatio?: number;
  minPixelRatio?: number;
  scene!: Scene;
  renderer!: WebGLRenderer;
  #postprocessing?: Postprocessing;
  size: Size = { width: 0, height: 0, wWidth: 0, wHeight: 0, ratio: 0, pixelRatio: 0 };
  render: () => void = () => this.#defaultRender();
  onBeforeRender: (data: FrameData) => void = () => {};
  onAfterRender: (data: FrameData) => void = () => {};
  onAfterResize: (size: Size) => void = () => {};
  #isVisible = false;
  #isAnimating = false;
  #boundResize = () => this.#scheduleResize();
  #boundVisibilityChange = () => this.#handleVisibilityChange();
  isDisposed = false;
  #intersectionObserver?: IntersectionObserver;
  #resizeObserver?: ResizeObserver;
  #resizeTimeout?: ReturnType<typeof setTimeout>;
  #timer = new Timer();
  #frameData: FrameData = { elapsed: 0, delta: 0 };
  #rafId?: number;

  constructor(config: ThreeAppConfig) {
    this.#config = { ...config };
    this.#initCamera();
    this.#initScene();
    this.#initRenderer();
    this.resize();
    this.#initObservers();
  }

  #initCamera() {
    this.camera = new PerspectiveCamera();
    this.cameraFov = this.camera.fov;
  }

  #initScene() {
    this.scene = new Scene();
  }

  #initRenderer() {
    if (this.#config.canvas) {
      this.canvas = this.#config.canvas;
    } else if (this.#config.id) {
      this.canvas = document.getElementById(this.#config.id) as HTMLCanvasElement;
    } else {
      console.error("Three: Missing canvas or id parameter");
    }
    this.canvas.style.display = "block";
    const options: WebGLRendererParameters = {
      canvas: this.canvas,
      powerPreference: "high-performance",
      ...(this.#config.rendererOptions ?? {}),
    };
    this.renderer = new WebGLRenderer(options);
    this.renderer.outputColorSpace = SRGBColorSpace;
  }

  #initObservers() {
    if (!(this.#config.size instanceof Object)) {
      window.addEventListener("resize", this.#boundResize);
      if (this.#config.size === "parent" && this.canvas.parentNode) {
        this.#resizeObserver = new ResizeObserver(this.#boundResize);
        this.#resizeObserver.observe(this.canvas.parentNode as Element);
      }
    }
    this.#intersectionObserver = new IntersectionObserver(
      (entries) => this.#handleIntersection(entries),
      { root: null, rootMargin: "0px", threshold: 0 },
    );
    this.#intersectionObserver.observe(this.canvas);
    document.addEventListener("visibilitychange", this.#boundVisibilityChange);
  }

  #removeObservers() {
    window.removeEventListener("resize", this.#boundResize);
    this.#resizeObserver?.disconnect();
    this.#intersectionObserver?.disconnect();
    document.removeEventListener("visibilitychange", this.#boundVisibilityChange);
  }

  #handleIntersection(entries: IntersectionObserverEntry[]) {
    this.#isVisible = entries[0].isIntersecting;
    if (this.#isVisible) {
      this.#startAnimation();
    } else {
      this.#stopAnimation();
    }
  }

  #handleVisibilityChange() {
    if (this.#isVisible) {
      if (document.hidden) {
        this.#stopAnimation();
      } else {
        this.#startAnimation();
      }
    }
  }

  #scheduleResize() {
    if (this.#resizeTimeout) clearTimeout(this.#resizeTimeout);
    this.#resizeTimeout = setTimeout(() => this.resize(), 100);
  }

  resize() {
    let width: number;
    let height: number;
    if (this.#config.size instanceof Object) {
      width = this.#config.size.width;
      height = this.#config.size.height;
    } else if (this.#config.size === "parent" && this.canvas.parentNode) {
      width = (this.canvas.parentNode as HTMLElement).offsetWidth;
      height = (this.canvas.parentNode as HTMLElement).offsetHeight;
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
    }
    this.size.width = width;
    this.size.height = height;
    this.size.ratio = width / height;
    this.#updateCamera();
    this.#updateRendererSize();
    this.onAfterResize(this.size);
  }

  #updateCamera() {
    (this.camera as PerspectiveCamera).aspect = this.size.width / this.size.height;
    if ((this.camera as PerspectiveCamera).isPerspectiveCamera && this.cameraFov) {
      const cam = this.camera as PerspectiveCamera;
      if (this.cameraMinAspect && cam.aspect < this.cameraMinAspect) {
        this.#adjustFov(this.cameraMinAspect);
      } else if (this.cameraMaxAspect && cam.aspect > this.cameraMaxAspect) {
        this.#adjustFov(this.cameraMaxAspect);
      } else {
        cam.fov = this.cameraFov;
      }
    }
    this.camera.updateProjectionMatrix();
    this.updateWorldSize();
  }

  #adjustFov(aspect: number) {
    const cam = this.camera as PerspectiveCamera;
    const t = Math.tan(MathUtils.degToRad(this.cameraFov! / 2)) / (cam.aspect / aspect);
    cam.fov = 2 * MathUtils.radToDeg(Math.atan(t));
  }

  updateWorldSize() {
    const cam = this.camera;
    if ((cam as PerspectiveCamera).isPerspectiveCamera) {
      const pCam = cam as PerspectiveCamera;
      const vFov = (pCam.fov * Math.PI) / 180;
      this.size.wHeight = 2 * Math.tan(vFov / 2) * pCam.position.length();
      this.size.wWidth = this.size.wHeight * pCam.aspect;
    } else if ((cam as OrthographicCamera).isOrthographicCamera) {
      const oCam = cam as OrthographicCamera;
      this.size.wHeight = oCam.top - oCam.bottom;
      this.size.wWidth = oCam.right - oCam.left;
    }
  }

  #updateRendererSize() {
    this.renderer.setSize(this.size.width, this.size.height);
    this.#postprocessing?.setSize?.(this.size.width, this.size.height);
    let pixelRatio = window.devicePixelRatio;
    if (this.maxPixelRatio && pixelRatio > this.maxPixelRatio) {
      pixelRatio = this.maxPixelRatio;
    } else if (this.minPixelRatio && pixelRatio < this.minPixelRatio) {
      pixelRatio = this.minPixelRatio;
    }
    this.renderer.setPixelRatio(pixelRatio);
    this.size.pixelRatio = pixelRatio;
  }

  get postprocessing() {
    return this.#postprocessing;
  }

  set postprocessing(value: Postprocessing | undefined) {
    this.#postprocessing = value;
    if (value) this.render = () => value.render();
  }

  #startAnimation() {
    if (this.#isAnimating) return;
    const animate = () => {
      this.#rafId = requestAnimationFrame(animate);
      this.#timer.update();
      this.#frameData.delta = this.#timer.getDelta();
      this.#frameData.elapsed += this.#frameData.delta;
      this.onBeforeRender(this.#frameData);
      this.render();
      this.onAfterRender(this.#frameData);
    };
    this.#isAnimating = true;
    this.#timer.reset();
    animate();
  }

  #stopAnimation() {
    if (this.#isAnimating) {
      if (this.#rafId) cancelAnimationFrame(this.#rafId);
      this.#isAnimating = false;
    }
  }

  #defaultRender() {
    this.renderer.render(this.scene, this.camera);
  }

  clear() {
    this.scene.traverse((obj) => {
      const mesh = obj as unknown as { isMesh?: boolean; material?: Record<string, unknown>; geometry?: { dispose: () => void } };
      if (mesh.isMesh && typeof mesh.material === "object" && mesh.material !== null) {
        Object.keys(mesh.material).forEach((key) => {
          const value = mesh.material![key] as { dispose?: () => void } | null;
          if (value !== null && typeof value === "object" && typeof value.dispose === "function") {
            value.dispose();
          }
        });
        (mesh.material as unknown as { dispose: () => void }).dispose();
        mesh.geometry?.dispose();
      }
    });
    this.scene.clear();
  }

  dispose() {
    this.#removeObservers();
    this.#stopAnimation();
    this.#timer.dispose();
    this.clear();
    this.#postprocessing?.dispose?.();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    this.isDisposed = true;
  }
}

type InteractionItem = {
  domElement: Element;
  position: Vector2;
  nPosition: Vector2;
  hover: boolean;
  touching: boolean;
  onEnter: (item: InteractionItem) => void;
  onMove: (item: InteractionItem) => void;
  onClick: (item: InteractionItem) => void;
  onLeave: (item: InteractionItem) => void;
  dispose: () => void;
};

const interactionRegistry = new Map<Element, InteractionItem>();
const pointerPosition = new Vector2();
let hasGlobalListeners = false;

function registerInteraction(
  domElement: Element,
  overrides: Partial<Omit<InteractionItem, "domElement" | "position" | "nPosition" | "hover" | "touching" | "dispose">>,
): InteractionItem {
  const item: InteractionItem = {
    domElement,
    position: new Vector2(),
    nPosition: new Vector2(),
    hover: false,
    touching: false,
    onEnter: () => {},
    onMove: () => {},
    onClick: () => {},
    onLeave: () => {},
    dispose: () => {},
    ...overrides,
  };

  if (!interactionRegistry.has(domElement)) {
    interactionRegistry.set(domElement, item);
    if (!hasGlobalListeners) {
      document.body.addEventListener("pointermove", onPointerMove);
      document.body.addEventListener("pointerleave", onPointerLeaveDocument);
      document.body.addEventListener("click", onPointerClick);
      document.body.addEventListener("touchstart", onTouchStart, { passive: false });
      document.body.addEventListener("touchmove", onTouchMove, { passive: false });
      document.body.addEventListener("touchend", onTouchEnd, { passive: false });
      document.body.addEventListener("touchcancel", onTouchEnd, { passive: false });
      hasGlobalListeners = true;
    }
  }

  item.dispose = () => {
    interactionRegistry.delete(domElement);
    if (interactionRegistry.size === 0) {
      document.body.removeEventListener("pointermove", onPointerMove);
      document.body.removeEventListener("pointerleave", onPointerLeaveDocument);
      document.body.removeEventListener("click", onPointerClick);
      document.body.removeEventListener("touchstart", onTouchStart);
      document.body.removeEventListener("touchmove", onTouchMove);
      document.body.removeEventListener("touchend", onTouchEnd);
      document.body.removeEventListener("touchcancel", onTouchEnd);
      hasGlobalListeners = false;
    }
  };

  return item;
}

function onPointerMove(e: PointerEvent) {
  pointerPosition.x = e.clientX;
  pointerPosition.y = e.clientY;
  processInteraction();
}

function processInteraction() {
  for (const [elem, item] of interactionRegistry) {
    const rect = elem.getBoundingClientRect();
    if (isPointerInRect(rect)) {
      updatePointerPosition(item, rect);
      if (!item.hover) {
        item.hover = true;
        item.onEnter(item);
      }
      item.onMove(item);
    } else if (item.hover && !item.touching) {
      item.hover = false;
      item.onLeave(item);
    }
  }
}

function onPointerClick(e: MouseEvent) {
  pointerPosition.x = e.clientX;
  pointerPosition.y = e.clientY;
  for (const [elem, item] of interactionRegistry) {
    const rect = elem.getBoundingClientRect();
    updatePointerPosition(item, rect);
    if (isPointerInRect(rect)) item.onClick(item);
  }
}

function onPointerLeaveDocument() {
  for (const item of interactionRegistry.values()) {
    if (item.hover) {
      item.hover = false;
      item.onLeave(item);
    }
  }
}

function onTouchStart(e: TouchEvent) {
  if (e.touches.length > 0) {
    e.preventDefault();
    pointerPosition.x = e.touches[0].clientX;
    pointerPosition.y = e.touches[0].clientY;

    for (const [elem, item] of interactionRegistry) {
      const rect = elem.getBoundingClientRect();
      if (isPointerInRect(rect)) {
        item.touching = true;
        updatePointerPosition(item, rect);
        if (!item.hover) {
          item.hover = true;
          item.onEnter(item);
        }
        item.onMove(item);
      }
    }
  }
}

function onTouchMove(e: TouchEvent) {
  if (e.touches.length > 0) {
    e.preventDefault();
    pointerPosition.x = e.touches[0].clientX;
    pointerPosition.y = e.touches[0].clientY;

    for (const [elem, item] of interactionRegistry) {
      const rect = elem.getBoundingClientRect();
      updatePointerPosition(item, rect);

      if (isPointerInRect(rect)) {
        if (!item.hover) {
          item.hover = true;
          item.touching = true;
          item.onEnter(item);
        }
        item.onMove(item);
      } else if (item.hover && item.touching) {
        item.onMove(item);
      }
    }
  }
}

function onTouchEnd() {
  for (const item of interactionRegistry.values()) {
    if (item.touching) {
      item.touching = false;
      if (item.hover) {
        item.hover = false;
        item.onLeave(item);
      }
    }
  }
}

function updatePointerPosition(item: InteractionItem, rect: DOMRect) {
  const { position, nPosition } = item;
  position.x = pointerPosition.x - rect.left;
  position.y = pointerPosition.y - rect.top;
  nPosition.x = (position.x / rect.width) * 2 - 1;
  nPosition.y = (-position.y / rect.height) * 2 + 1;
}

function isPointerInRect(rect: DOMRect) {
  const { x, y } = pointerPosition;
  const { left, top, width, height } = rect;
  return x >= left && x <= left + width && y >= top && y <= top + height;
}

const { randFloat, randFloatSpread } = MathUtils;
const _vecA = new Vector3();
const _vecB = new Vector3();
const _vecC = new Vector3();
const _vecD = new Vector3();
const _vecE = new Vector3();
const _vecF = new Vector3();
const _vecG = new Vector3();
const _vecH = new Vector3();
const _vecI = new Vector3();
const _vecJ = new Vector3();

export type BallpitConfig = {
  count?: number;
  colors?: number[];
  ambientColor?: number;
  ambientIntensity?: number;
  lightIntensity?: number;
  materialParams?: MeshPhysicalMaterialParameters;
  minSize?: number;
  maxSize?: number;
  size0?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  maxVelocity?: number;
  maxX?: number;
  maxY?: number;
  maxZ?: number;
  controlSphere0?: boolean;
  followCursor?: boolean;
};

type ResolvedBallpitConfig = Required<
  Omit<BallpitConfig, "materialParams" | "colors">
> & {
  materialParams: MeshPhysicalMaterialParameters;
  colors: number[];
};

const DEFAULT_CONFIG: ResolvedBallpitConfig = {
  count: 200,
  colors: [0, 0, 0],
  ambientColor: 16777215,
  ambientIntensity: 1,
  lightIntensity: 200,
  materialParams: {
    metalness: 0.5,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.15,
  },
  minSize: 0.5,
  maxSize: 1,
  size0: 1,
  gravity: 0.5,
  friction: 0.9975,
  wallBounce: 0.95,
  maxVelocity: 0.15,
  maxX: 5,
  maxY: 5,
  maxZ: 2,
  controlSphere0: false,
  followCursor: true,
};

class BallPhysics {
  config: ResolvedBallpitConfig;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center = new Vector3();

  constructor(config: ResolvedBallpitConfig) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.#initPositions();
    this.setSizes();
  }

  #initPositions() {
    const { config, positionData } = this;
    this.center.toArray(positionData, 0);
    for (let i = 1; i < config.count; i++) {
      const base = 3 * i;
      positionData[base] = randFloatSpread(2 * config.maxX);
      positionData[base + 1] = randFloatSpread(2 * config.maxY);
      positionData[base + 2] = randFloatSpread(2 * config.maxZ);
    }
  }

  setSizes() {
    const { config, sizeData } = this;
    sizeData[0] = config.size0;
    for (let i = 1; i < config.count; i++) {
      sizeData[i] = randFloat(config.minSize, config.maxSize);
    }
  }

  update(frame: FrameData) {
    const { config, center, positionData, sizeData, velocityData } = this;
    let start = 0;
    if (config.controlSphere0) {
      start = 1;
      _vecA.fromArray(positionData, 0);
      _vecA.lerp(center, 0.1).toArray(positionData, 0);
      _vecD.set(0, 0, 0).toArray(velocityData, 0);
    }
    for (let idx = start; idx < config.count; idx++) {
      const base = 3 * idx;
      _vecB.fromArray(positionData, base);
      _vecE.fromArray(velocityData, base);
      _vecE.y -= frame.delta * config.gravity * sizeData[idx];
      _vecE.multiplyScalar(config.friction);
      _vecE.clampLength(0, config.maxVelocity);
      _vecB.add(_vecE);
      _vecB.toArray(positionData, base);
      _vecE.toArray(velocityData, base);
    }
    for (let idx = start; idx < config.count; idx++) {
      const base = 3 * idx;
      _vecB.fromArray(positionData, base);
      _vecE.fromArray(velocityData, base);
      const radius = sizeData[idx];
      for (let jdx = idx + 1; jdx < config.count; jdx++) {
        const otherBase = 3 * jdx;
        _vecC.fromArray(positionData, otherBase);
        _vecF.fromArray(velocityData, otherBase);
        const otherRadius = sizeData[jdx];
        _vecG.copy(_vecC).sub(_vecB);
        const dist = _vecG.length();
        const sumRadius = radius + otherRadius;
        if (dist < sumRadius) {
          const overlap = sumRadius - dist;
          _vecH.copy(_vecG)
            .normalize()
            .multiplyScalar(0.5 * overlap);
          _vecI.copy(_vecH).multiplyScalar(Math.max(_vecE.length(), 1));
          _vecJ.copy(_vecH).multiplyScalar(Math.max(_vecF.length(), 1));
          _vecB.sub(_vecH);
          _vecE.sub(_vecI);
          _vecB.toArray(positionData, base);
          _vecE.toArray(velocityData, base);
          _vecC.add(_vecH);
          _vecF.add(_vecJ);
          _vecC.toArray(positionData, otherBase);
          _vecF.toArray(velocityData, otherBase);
        }
      }
      if (config.controlSphere0) {
        _vecG.copy(_vecA).sub(_vecB);
        const dist = _vecG.length();
        const sumRadius0 = radius + sizeData[0];
        if (dist < sumRadius0) {
          const diff = sumRadius0 - dist;
          _vecH.copy(_vecG.normalize()).multiplyScalar(diff);
          _vecI.copy(_vecH).multiplyScalar(Math.max(_vecE.length(), 2));
          _vecB.sub(_vecH);
          _vecE.sub(_vecI);
        }
      }
      if (Math.abs(_vecB.x) + radius > config.maxX) {
        _vecB.x = Math.sign(_vecB.x) * (config.maxX - radius);
        _vecE.x = -_vecE.x * config.wallBounce;
      }
      if (config.gravity === 0) {
        if (Math.abs(_vecB.y) + radius > config.maxY) {
          _vecB.y = Math.sign(_vecB.y) * (config.maxY - radius);
          _vecE.y = -_vecE.y * config.wallBounce;
        }
      } else if (_vecB.y - radius < -config.maxY) {
        _vecB.y = -config.maxY + radius;
        _vecE.y = -_vecE.y * config.wallBounce;
      }
      const maxBoundary = Math.max(config.maxZ, config.maxSize);
      if (Math.abs(_vecB.z) + radius > maxBoundary) {
        _vecB.z = Math.sign(_vecB.z) * (config.maxZ - radius);
        _vecE.z = -_vecE.z * config.wallBounce;
      }
      _vecB.toArray(positionData, base);
      _vecE.toArray(velocityData, base);
    }
  }
}

class SubsurfaceScatteringMaterial extends MeshPhysicalMaterial {
  uniforms: {
    thicknessDistortion: { value: number };
    thicknessAmbient: { value: number };
    thicknessAttenuation: { value: number };
    thicknessPower: { value: number };
    thicknessScale: { value: number };
  };

  constructor(params: MeshPhysicalMaterialParameters) {
    super(params);
    this.uniforms = {
      thicknessDistortion: { value: 0.1 },
      thicknessAmbient: { value: 0 },
      thicknessAttenuation: { value: 0.1 },
      thicknessPower: { value: 2 },
      thicknessScale: { value: 10 },
    };
    this.defines = { ...this.defines, USE_UV: "" };
    this.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, this.uniforms);
      shader.fragmentShader =
        `
        uniform float thicknessPower;
        uniform float thicknessScale;
        uniform float thicknessDistortion;
        uniform float thicknessAmbient;
        uniform float thicknessAttenuation;
      ` + shader.fragmentShader;
      shader.fragmentShader = shader.fragmentShader.replace(
        "void main() {",
        `
        void RE_Direct_Scattering(const in IncidentLight directLight, const in vec2 uv, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, inout ReflectedLight reflectedLight) {
          vec3 scatteringHalf = normalize(directLight.direction + (geometryNormal * thicknessDistortion));
          float scatteringDot = pow(saturate(dot(geometryViewDir, -scatteringHalf)), thicknessPower) * thicknessScale;
          #ifdef USE_COLOR
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * vColor;
          #else
            vec3 scatteringIllu = (scatteringDot + thicknessAmbient) * diffuse;
          #endif
          reflectedLight.directDiffuse += scatteringIllu * thicknessAttenuation * directLight.color;
        }

        void main() {
      `,
      );
      const lightsChunk = ShaderChunk.lights_fragment_begin.replaceAll(
        "RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );",
        `
          RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
          RE_Direct_Scattering(directLight, vUv, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, reflectedLight);
        `,
      );
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <lights_fragment_begin>",
        lightsChunk,
      );
    };
  }
}

const _dummy = new Object3D();

class Spheres extends InstancedMesh {
  config: ResolvedBallpitConfig;
  physics: BallPhysics;
  ambientLight!: AmbientLight;
  light!: PointLight;

  constructor(renderer: WebGLRenderer, config: Partial<BallpitConfig> = {}) {
    const resolved: ResolvedBallpitConfig = {
      ...DEFAULT_CONFIG,
      ...config,
      materialParams: { ...DEFAULT_CONFIG.materialParams, ...config.materialParams },
      colors: config.colors ?? DEFAULT_CONFIG.colors,
    };
    const environment = new RoomEnvironment();
    const envTexture = new PMREMGenerator(renderer).fromScene(environment, 0.04).texture;
    const geometry = new SphereGeometry();
    const material = new SubsurfaceScatteringMaterial({ envMap: envTexture, ...resolved.materialParams });
    material.envMapRotation.x = -Math.PI / 2;
    super(geometry, material, resolved.count);
    this.config = resolved;
    this.physics = new BallPhysics(resolved);
    this.#initLights();
    this.setColors(resolved.colors);
  }

  #initLights() {
    this.ambientLight = new AmbientLight(this.config.ambientColor, this.config.ambientIntensity);
    this.add(this.ambientLight);
    this.light = new PointLight(this.config.colors[0], this.config.lightIntensity);
    this.add(this.light);
  }

  setColors(colors: number[]) {
    if (Array.isArray(colors) && colors.length > 1) {
      const palette = colors.map((c) => new Color(c));
      const getColorAt = (ratio: number, out = new Color()) => {
        const scaled = Math.max(0, Math.min(1, ratio)) * (palette.length - 1);
        const idx = Math.floor(scaled);
        const start = palette[idx];
        if (idx >= palette.length - 1) return start.clone();
        const alpha = scaled - idx;
        const end = palette[idx + 1];
        out.r = start.r + alpha * (end.r - start.r);
        out.g = start.g + alpha * (end.g - start.g);
        out.b = start.b + alpha * (end.b - start.b);
        return out;
      };
      for (let idx = 0; idx < this.count; idx++) {
        this.setColorAt(idx, getColorAt(idx / this.count));
        if (idx === 0) {
          this.light.color.copy(getColorAt(idx / this.count));
        }
      }
      if (this.instanceColor) this.instanceColor.needsUpdate = true;
    }
  }

  update(frame: FrameData) {
    this.physics.update(frame);
    for (let idx = 0; idx < this.count; idx++) {
      _dummy.position.fromArray(this.physics.positionData, 3 * idx);
      if (idx === 0 && this.config.followCursor === false) {
        _dummy.scale.setScalar(0);
      } else {
        _dummy.scale.setScalar(this.physics.sizeData[idx]);
      }
      _dummy.updateMatrix();
      this.setMatrixAt(idx, _dummy.matrix);
      if (idx === 0) this.light.position.copy(_dummy.position);
    }
    this.instanceMatrix.needsUpdate = true;
  }
}

function createBallpit(canvas: HTMLCanvasElement, config: Partial<BallpitConfig> = {}) {
  const app = new ThreeApp({
    canvas,
    size: "parent",
    rendererOptions: { antialias: true, alpha: true },
  });
  let spheres: Spheres;
  app.renderer.toneMapping = ACESFilmicToneMapping;
  app.camera.position.set(0, 0, 20);
  app.camera.lookAt(0, 0, 0);
  app.cameraMaxAspect = 1.5;
  app.resize();

  const raycaster = new Raycaster();
  const plane = new Plane(new Vector3(0, 0, 1), 0);
  const intersection = new Vector3();
  let isPaused = false;

  canvas.style.touchAction = "none";
  canvas.style.userSelect = "none";
  (canvas.style as unknown as { webkitUserSelect: string }).webkitUserSelect = "none";

  const interaction = registerInteraction(canvas, {
    onMove(item) {
      raycaster.setFromCamera(item.nPosition, app.camera);
      app.camera.getWorldDirection(plane.normal);
      raycaster.ray.intersectPlane(plane, intersection);
      spheres.physics.center.copy(intersection);
      spheres.config.controlSphere0 = true;
    },
    onLeave() {
      spheres.config.controlSphere0 = false;
    },
  });

  function initialize(cfg: Partial<BallpitConfig>) {
    if (spheres) {
      app.clear();
      app.scene.remove(spheres);
    }
    spheres = new Spheres(app.renderer, cfg);
    app.scene.add(spheres);
  }
  initialize(config);

  app.onBeforeRender = (frame) => {
    if (!isPaused) spheres.update(frame);
  };
  app.onAfterResize = (size) => {
    spheres.config.maxX = size.wWidth / 2;
    spheres.config.maxY = size.wHeight / 2;
  };

  return {
    three: app,
    get spheres() {
      return spheres;
    },
    setCount(count: number) {
      initialize({ ...spheres.config, count });
    },
    updateConfig(newProps: Partial<BallpitConfig>) {
      if (newProps.count !== undefined && newProps.count !== spheres.config.count) {
        initialize({ ...spheres.config, ...newProps });
      } else {
        Object.assign(spheres.config, newProps);
        if (newProps.colors) {
          spheres.setColors(spheres.config.colors);
        }
        if (
          newProps.minSize !== undefined ||
          newProps.maxSize !== undefined ||
          newProps.size0 !== undefined
        ) {
          spheres.physics.setSizes();
        }
      }
    },
    togglePause() {
      isPaused = !isPaused;
    },
    dispose() {
      interaction.dispose();
      app.dispose();
    },
  };
}

export default function Ballpit({
  className = "",
  followCursor = true,
  ...props
}: BallpitConfig & { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<ReturnType<typeof createBallpit> | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      instanceRef.current = createBallpit(canvas, { followCursor, ...props });
    } catch (error) {
      // WebGL can fail to initialize (context limit, no GPU, etc.) — this is
      // a decorative background, so skip it rather than crash the page.
      console.warn("Ballpit: WebGL unavailable, skipping.", error);
      return;
    }

    return () => {
      instanceRef.current?.dispose();
      instanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    instanceRef.current?.updateConfig({ followCursor, ...props });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, followCursor]);

  return (
    <canvas
      className={className}
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
