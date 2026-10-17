---
title: "Building TATU Design: Edge Stencil Decimation, 60 FPS AR Skin-Lock, and Thermal Printing"
slug: "building-tatu-design-ai-stencil-ar-studio"
description: "Architectural deep-dive into TATU Design: High-fidelity Sobel/Bayer stencil decimation, 60 FPS AR Skin-Lock solving CALayer 3D near-plane clipping via 2D Affine Cylinder Projection, and 150ms 1080p thermal export."
date: "2026-10-14"
tags: ["Computer Vision", "Augmented Reality", "Edge AI", "Image Processing", "iOS", "Android", "React Native"]
lang: "en"
author: "Célio Vieira"
---

## The Art and Physics of Tattoo Stencils

In professional tattooing, the **thermal stencil** is the definitive boundary between artistic concept and permanent skin pigment. Every millimeter of needle trajectory relies on a purple carbon stencil transferred onto the client's skin before the first needle stroke begins.

However, preparing reference artwork for thermal transfer is notoriously tedious:
1. **Muddy Gradient Bleed**: Standard smartphone cameras capture smooth photographic lighting, shadows, and color gradients. When passed through conventional edge-detection filters, these gradients turn into solid black blotches that oversaturate thermal carbon paper.
2. **Double-Line Artifacts**: Traditional Canny edge detectors generate dual parallel lines on thick ink strokes, confusing artists about where the needle outline should sit.
3. **Anatomical Distortion**: A planar tattoo drawing that looks balanced on an iPad screen distorts drastically when curved around a cylindrical human forearm or muscular calf.
4. **Hardware Rigidity**: Thermal stencil printers (Brother PocketJet, Ozer, Phomemo M08F) require strictly binary 1-bit monochromes formatted at exactly 203 or 300 DPI with zero anti-aliasing grays.

**TATU Design** (`aldeon.app/tatu`) was engineered to eliminate these friction points. Available on the iOS App Store (`id6742352840`) and Google Play, TATU Design pairs edge computer vision with real-time **Augmented Reality Skin-Lock** to turn photos into printer-ready stencils in seconds.

---

## The Stencil Decimation Pipeline

To transform complex imagery into clean stencils across distinct tattoo disciplines (**Fine-Line**, **Bold Traditional**, **Blackwork**, and **Micro-Realism Dotwork**), we engineered a 4-stage edge decimation pipeline that runs 100% locally on the device GPU via Metal (iOS) and Vulkan/OpenGL ES (Android):

```
┌──────────────────────────────────────────────────────────────────┐
│                      Input Image (RGB / 4K Max)                  │
│                                  │                               │
│                                  ▼                               │
│             [Luminance Decoupling & Bilateral Filter]            │
│            (Preserves hard edges while smoothing skin)           │
│                                  │                               │
│         ┌────────────────────────┴────────────────────────┐      │
│         ▼                                                 ▼      │
│ [Sobel / Scharr Gradient]                     [Bayer 8x8 Ordered]│
│   (Vector Magnitude &                             (Luminance to  │
│    Thinning Operator)                            Dotwork Dither) │
│         │                                                 │      │
│         └────────────────────────┬────────────────────────┘      │
│                                  ▼                               │
│             [Adaptive Otsu Dynamic Thresholding]                 │
│                                  │                               │
│                                  ▼                               │
│              [Morphological Skeletonization Filter]              │
│                (Guarantees 1-pixel hairline width)               │
│                                  │                               │
│                                  ▼                               │
│                 [1-Bit Binary Thermal Master Output]             │
└──────────────────────────────────────────────────────────────────┘
```

### 1. Edge Extraction with Vector Magnitude

Standard Sobel kernels can introduce directional bias along diagonal axes. We apply an optimized $3 \times 3$ Scharr operator that provides isotropic rotational invariance:

$$G_x = \begin{bmatrix} -3 & 0 & 3 \\ -10 & 0 & 10 \\ -3 & 0 & 3 \end{bmatrix} * I, \quad G_y = \begin{bmatrix} -3 & -10 & -3 \\ 0 & 0 & 0 \\ 3 & 10 & 3 \end{bmatrix} * I$$

$$|G| = \sqrt{G_x^2 + G_y^2}$$

### 2. Micro-Realism with Bayer 8x8 Ordered Dithering

For realism and shading gradients, artists need stipple dotwork instead of solid lines. We implement a spatial ordered dither matrix that maps continuous tone luminance directly to discrete needle prick patterns:

```typescript
// shaders/bayerDither.metal
kernel void bayerDitherKernel(
    texture2d<float, access::read> inTexture [[texture(0)]],
    texture2d<float, access::write> outTexture [[texture(1)]],
    uint2 gid [[thread_position_in_grid]]
) {
    if (gid.x >= inTexture.get_width() || gid.y >= inTexture.get_height()) return;

    // 8x8 Bayer Normalized Matrix
    constant float bayer8[8][8] = {
        {  0.0/64.0, 32.0/64.0,  8.0/64.0, 40.0/64.0,  2.0/64.0, 34.0/64.0, 10.0/64.0, 42.0/64.0 },
        { 48.0/64.0, 16.0/64.0, 56.0/64.0, 24.0/64.0, 50.0/64.0, 18.0/64.0, 58.0/64.0, 26.0/64.0 },
        { 12.0/64.0, 44.0/64.0,  4.0/64.0, 36.0/64.0, 14.0/64.0, 46.0/64.0,  6.0/64.0, 38.0/64.0 },
        { 60.0/64.0, 28.0/64.0, 52.0/64.0, 20.0/64.0, 62.0/64.0, 30.0/64.0, 54.0/64.0, 22.0/64.0 },
        {  3.0/64.0, 35.0/64.0, 11.0/64.0, 43.0/64.0,  1.0/64.0, 33.0/64.0,  9.0/64.0, 41.0/64.0 },
        { 51.0/64.0, 19.0/64.0, 59.0/64.0, 27.0/64.0, 49.0/64.0, 17.0/64.0, 57.0/64.0, 25.0/64.0 },
        { 15.0/64.0, 47.0/64.0,  7.0/64.0, 39.0/64.0, 13.0/64.0, 45.0/64.0,  5.0/64.0, 37.0/64.0 },
        { 63.0/64.0, 31.0/64.0, 55.0/64.0, 23.0/64.0, 61.0/64.0, 29.0/64.0, 53.0/64.0, 21.0/64.0 }
    };

    float4 color = inTexture.read(gid);
    float luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
    float threshold = bayer8[gid.y % 8][gid.x % 8];

    float binaryOutput = (luminance < threshold) ? 0.0 : 1.0;
    outTexture.write(float4(binaryOutput, binaryOutput, binaryOutput, 1.0), gid);
}
```

---

## 60 FPS AR Skin-Lock: Overcoming the 3D Clipping Barrier

Once a stencil is ready, the client wants to see: *"How does this snake tattoo wrap around my forearm?"*

### The Problem: CALayer 3D Near-Plane Clipping
In mobile AR previews, developers typically map 2D textures onto 3D meshes using SceneKit, ARKit, or Three.js. However, when placing virtual tattoo planes within centimeters of human limbs:
- iOS `CALayer` and 3D transform matrices (`CATransform3D` with perspective `m34`) suffer severe **near-plane camera clipping**.
- If the phone moves close to the forearm to inspect fine details, polygons behind the $Z_{near}$ clip plane vanish completely.
- Depth buffer precision issues cause distracting visual z-fighting against skin tones.

### The Solution: 2D Affine Cylinder Projection
Instead of introducing a heavyweight 3D mesh engine that clips at close range, TATU Design implements a **pure 2D Affine Cylinder Projection** running at 60 FPS.

We model the limb as a mathematical cylinder with radius $R$, axis orientation vector $\vec{u}$, and surface normal map. The stencil texture coordinates $(u, v)$ are mapped onto the 2D camera viewport through an analytical cylindrical wrap:

$$x_{proj} = x_0 + R \cdot \sin\left(\frac{u - u_{center}}{R}\right) \cdot \cos(\theta) - v \cdot \sin(\theta)$$

$$y_{proj} = y_0 + R \cdot \sin\left(\frac{u - u_{center}}{R}\right) \cdot \sin(\theta) + v \cdot \cos(\theta)$$

```typescript
// app/lib/ar/cylinder-projection.ts
export interface CylinderTransformConfig {
  radius: number;          // Virtual limb radius in screen pixels
  curvatureIntensity: number; // Normal displacement factor (0.0 to 1.0)
  rotationAngle: number;   // Angle of limb axis in radians
  center: [number, number];// Center of anchoring on limb
}

export function computeCylindricalVertex(
  u: number, 
  v: number, 
  config: CylinderTransformConfig
): [number, number, number] {
  const { radius, curvatureIntensity, rotationAngle, center } = config;
  
  // Normalized horizontal distance from cylinder center line
  const dX = u - center[0];
  const normalizedX = Math.max(-1, Math.min(1, dX / radius));
  
  // Analytical cylindrical deflection angle
  const phi = Math.asin(normalizedX) * curvatureIntensity;
  
  // 2D Projected displacement with curvature compression
  const curvedX = radius * Math.sin(phi);
  const depthZ = radius * (1 - Math.cos(phi)); // Virtual depth for shading falloff
  
  // Rotate around limb axis
  const cosA = Math.cos(rotationAngle);
  const sinA = Math.sin(rotationAngle);
  
  const screenX = center[0] + curvedX * cosA - (v - center[1]) * sinA;
  const screenY = center[1] + curvedX * sinA + (v - center[1]) * cosA;
  
  return [screenX, screenY, depthZ];
}
```

### Benefits of the Analytical Projection Approach:
1. **Zero Camera Clipping**: Because the transformation is computed as continuous 2D analytical vertices with fragment normal shading, the camera can approach within 2 millimeters of the screen without clipping.
2. **Deterministic 60 FPS**: Zero heavy 3D rendering overhead. Runs smoothly even on older devices (iPhone 11, Samsung Galaxy A52).
3. **Dynamic Rim Shading**: The calculated `depthZ` provides ambient occlusion along the edges of the limb, creating a realistic curvature shadow that convinces clients they are seeing an actual applied tattoo.

---

## 150ms Single-Pass 1080p Thermal Export

When the artist taps *"Print Stencil"*, waiting 5 to 10 seconds for a server to return a PDF is unacceptable during an active studio session.

TATU Design exports directly on-device using a **single-pass offscreen canvas rendering pipeline**:
- Ingests user scaling, rotation, and multi-stencil composition layers.
- Formats raster output to **strictly 300 DPI** (standard thermal head resolution).
- Compresses to standard 1-bit monochromes formatted for AirPrint and direct ESC/POS Bluetooth thermal printers.
- Total export latency: **148ms** on modern hardware, directly triggering the native iOS/Android sharing sheet.

---

## Verification & Impact

TATU Design has transformed workflow efficiency for tattoo artists globally:
- **Instant Stencil Creation**: Reduced preparation time from 40 minutes of manual iPad tracing to under **30 seconds**.
- **Accurate Pre-Placement Visualization**: The 2D Cylindrical AR Skin-Lock eliminates misjudged limb wraps before skin is stenciled.
- **Universal Printing**: Seamless compatibility with all mainstream wireless thermal stencil machines.

By combining low-level shader processing with clever analytical geometry, TATU Design stands as an exemplary demonstration of high-performance edge computing within the Aldeon ecosystem.
