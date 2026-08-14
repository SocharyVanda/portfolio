interface MeshLineIntrinsicElements {
  meshLineGeometry: Record<string, unknown>;
  meshLineMaterial: Record<string, unknown>;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements extends MeshLineIntrinsicElements {}
  }
}
declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements extends MeshLineIntrinsicElements {}
  }
}
declare module "react/jsx-dev-runtime" {
  namespace JSX {
    interface IntrinsicElements extends MeshLineIntrinsicElements {}
  }
}

export {};
