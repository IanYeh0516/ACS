// animation.js

const THREE = AFRAME.THREE;

export const ANIMATIONS = {
  SKILL01: 'skill01',
  SKILL02: 'skill02',
  SKILL03: 'skill03',
  SKILL04: 'skill04',
  IDLE: 'idle'
  // 可以在這裡添加更多動畫軌道變數
};

let model = null;

export function loadModel(src) {
  const loader = new THREE.GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(src, (gltf) => {
      model = gltf.scene;
      resolve({ model, animations: gltf.animations });
    }, undefined, (error) => {
      console.error('Error loading GLB:', error);
      reject(error);
    });
  });
}

export function createAnimationMap(animations) {
  const animationMap = {};
  animations.forEach(animation => {
    animationMap[animation.name] = {
      name: animation.name,
      duration: animation.duration
    };
  });
  return animationMap;
}

export function playAnimation(model, animationName, duration) {
  model.setAttribute('animation-mixer', `clip: ${animationName}; duration: ${duration}`);
}

export function getModel() {
  return model;
}