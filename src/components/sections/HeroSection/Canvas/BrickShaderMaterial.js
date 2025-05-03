import { shaderMaterial } from "@react-three/drei";
import { Vector3 } from "three";

const BrickShaderMaterial = shaderMaterial(
  {
    uBrickTexture: null,
    uNormalMap: null,
    uRoughnessMap: null,
    uDisplacementMap: null,
    uLightPos: new Vector3(10, 10, 10),
    uViewPos: new Vector3(0, 0, 10),
    uTintColor: new Vector3(0.66, 0.76, 0.88), // Rose tint
    uTextureScale: 4.0,
  },
  // Vertex Shader
  `
   varying vec2 vUv;
  uniform float uTextureScale;

  void main() {
    // Calculate the offset to keep the texture centered when scaling
    vec2 scaledUV = (uv - vec2(0.5)) * uTextureScale + vec2(0.5);

    // Pass the scaled and offset UV to the fragment shader
    vUv = scaledUV;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
 varying vec2 vUv;
uniform sampler2D uBrickTexture;
uniform sampler2D uNormalMap;
uniform sampler2D uRoughnessMap;
uniform sampler2D uDisplacementMap;
uniform vec3 uLightPos;
uniform vec3 uViewPos;
uniform vec3 uTintColor; // Add uniform for tint color

void main() {
  // Load the textures
  vec3 brickColor = texture2D(uBrickTexture, vUv).rgb;
  vec3 normal = texture2D(uNormalMap, vUv).rgb * 2.0 - 1.0; // Normal map adjustment
  float roughness = texture2D(uRoughnessMap, vUv).r;
  roughness = clamp(roughness, 0.1, 0.8); // Clamp the roughness for more control
  float displacement = texture2D(uDisplacementMap, vUv).r * 0.05; // Reduce displacement intensity

  // Modify the UV based on displacement for pseudo-geometry deformation
  vec2 displacedUv = vUv + normal.xy * displacement;

  // Apply tint color to the brick texture
  brickColor *= uTintColor;

  // Light calculations
  vec3 lightDir = normalize(uLightPos - vec3(vUv, 0.0));
  float diff = max(dot(normal, lightDir), 0.0);

  // Simulate roughness with lower specular for rougher surfaces
  vec3 ambient = 0.2 * brickColor;

  // View direction for specular highlights
  vec3 viewDir = normalize(uViewPos - vec3(vUv, 0.0));
  vec3 reflectDir = reflect(-lightDir, normal);
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0); // Specular exponent controls shininess

  // Specular color to simulate the reflection on smoother surfaces
  vec3 specular = mix(vec3(0.0), vec3(1.0), spec * (1.0 - roughness));

  // Combine lighting effects
  vec3 lighting = diff * brickColor + ambient + specular;

  gl_FragColor = vec4(lighting, 1.0);
}
  `
);
export default BrickShaderMaterial;