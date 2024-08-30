const THREE = AFRAME.THREE;

export const ANIMATIONS = {
  SKILL01: 'skill01',
  SKILL02: 'skill02',
  SKILL03: 'skill03',
  SKILL04: 'skill04',
  IDLE: 'idle'
  // 可以在這裡添加更多動畫軌道變數
};

let mixer = null;
let model = null;

export function loadModel(src) {
  const loader = new THREE.GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(src, (gltf) => {
      model = gltf.scene;
      mixer = new THREE.AnimationMixer(model);
      resolve({ model, mixer, animations: gltf.animations });
    }, undefined, (error) => {
      console.error('Error loading GLB:', error);
      reject(error);
    });
  });
}

export function PlayAnimationCycle(animation, duration = 1000) {
  if (model && mixer) {
    const clip = THREE.AnimationClip.findByName(model.animations, animation);
    if (clip) {
      const action = mixer.clipAction(clip);
      action.reset().play();
      console.log(`Playing animation: ${animation}`);
      setTimeout(() => {
        const idleClip = THREE.AnimationClip.findByName(model.animations, ANIMATIONS.IDLE);
        if (idleClip) {
          mixer.clipAction(idleClip).reset().play();
          console.log('Switching to idle animation');
        }
      }, duration);
    } else {
      console.error(`Animation ${animation} not found`);
    }
  } else {
    console.error('Model or mixer is not valid');
  }
}

export function getAnimationClipLength(animations) {
  const trackInfoArray = [];
  try {
    if (!animations || animations.length === 0) {
      throw new Error('Animations property is undefined or null.');
    }

    animations.forEach((clip) => {
      const clipName = clip.name;
      const clipLength = clip.duration;
      trackInfoArray.push({ name: clipName, length: clipLength });
    });

    return trackInfoArray;

  } catch (error) {
    console.error('Error in getAnimationClipLength:', error.message);
    return [];
  }
}

export function getMixer() {
  return mixer;
}

export function getModel() {
  return model;
}