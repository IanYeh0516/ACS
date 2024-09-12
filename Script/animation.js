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

export async function loadModel(src) {
  const loader = new THREE.GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(src, (gltf) => {
      model = gltf.scene;
      mixer = new THREE.AnimationMixer(model);
      // 儲存動畫到模型對象
      model.animations = gltf.animations;
      resolve({ model, mixer, animations: gltf.animations });
    }, undefined, (error) => {
      console.error('Error loading GLB:', error);
      reject(error);
    });
  });
}

export function PlayAnimationCycle(animation, duration = 1000) {
  // 如果model 是無效狀態
  if (!model || !mixer) {
    console.error('Model or mixer is not valid');
    return;
  }

  const clip = model.animations.find(clip => clip.name === animation);
  if (!clip) {
    // 沒有動畫狀態
    console.error(`Animation ${animation} not found`);
    return;
  }
  const action = mixer.clipAction(clip);
  action.reset().play();
  console.log(`Playing animation: ${animation}`);
  //  主要動態 
  // time out 
  setTimeout(() => {
    const idleClip = model.animations.find(clip => clip.name === ANIMATIONS.IDLE);
    if (idleClip) {
      mixer.clipAction(idleClip).reset().play();
      console.log('Switching to idle animation');
    } else {
      console.warn('Idle animation not found');
    }
  }, duration);
  if (!model.animations || model.animations.length === 0) {
    console.error('No animations found in the model');
    return;
  } 
  console.log('Available animations:', model.animations.map(a => a.name));
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